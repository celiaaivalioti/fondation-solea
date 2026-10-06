import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";
import { proxy } from "../proxy";

const require = createRequire(import.meta.url);
const { deploymentSettings } = require("../scripts/check-deployment.cjs");
const { loadRuntimeEnvironment } = require("../scripts/runtime-environment.cjs");
const preview = {
  DEPLOY_TARGET: "preview", STRIPE_SECRET_KEY: "sk_test_dummy",
  STRIPE_WEBHOOK_SECRET: "whsec_dummy", STRIPE_SITE_URL: "https://preview.fondation-solea.ch",
};
const production = {
  ...preview, DEPLOY_TARGET: "production", STRIPE_SECRET_KEY: "sk_live_dummy",
  STRIPE_SITE_URL: "https://fondation-solea.ch", PRODUCTION_SITE_PATH: "/srv/customer/sites/fondation-solea.ch",
};

test("deployment rejects mixed modes, missing live URL and unconfirmed or shared production folders", () => {
  assert.equal(deploymentSettings(preview).DEPLOY_DONATION_STORE_PATH, "/srv/customer/solea-donations");
  assert.equal(deploymentSettings(production).DEPLOY_DONATION_STORE_PATH, "/srv/customer/solea-donations-production");
  for (const environment of [
    { ...preview, STRIPE_SECRET_KEY: "sk_live_dummy" },
    { ...production, STRIPE_SECRET_KEY: "sk_test_dummy" },
    { ...production, STRIPE_SITE_URL: "" },
    { ...production, GITHUB_REF: "refs/heads/feature" },
    { ...production, PRODUCTION_SITE_PATH: "" },
    { ...production, PRODUCTION_SITE_PATH: "/srv/customer/sites/preview.fondation-solea.ch" },
    { ...production, PRODUCTION_SITE_PATH: "/srv/customer/sites/../sites" },
  ]) assert.throws(() => deploymentSettings(environment));
});

test("a single converted app accepts production in its existing folder and rejects Sandbox overwrites", () => {
  const settings = deploymentSettings({ ...production, HOSTING_LAYOUT: "single", PRODUCTION_SITE_PATH: "/srv/customer/sites/preview.fondation-solea.ch" });
  assert.equal(settings.DEPLOY_SITE_PATH, "/srv/customer/sites/preview.fondation-solea.ch");
  assert.throws(() => deploymentSettings({ ...preview, HOSTING_LAYOUT: "single" }));
  assert.throws(() => deploymentSettings({ ...production, HOSTING_LAYOUT: "invalid" }));
});

test("production aliases redirect to the fixed live origin; preview mode keeps its own pages", () => {
  const previous = process.env.SOLEA_PRIMARY_SITE_ORIGIN;
  try {
    process.env.SOLEA_PRIMARY_SITE_ORIGIN = "https://fondation-solea.ch";
    for (const host of ["preview.fondation-solea.ch", "www.fondation-solea.ch"]) {
      const response = proxy(new NextRequest(`https://${host}/en/nous-soutenir/?example=1`));
      assert.equal(response.status, 307);
      assert.equal(response.headers.get("location"), "https://fondation-solea.ch/en/nous-soutenir/?example=1");
    }
    assert.equal(proxy(new NextRequest("https://fondation-solea.ch/contact/")).headers.get("location"), null);
    assert.equal(proxy(new NextRequest("https://unrelated.example/contact/")).headers.get("location"), null);
    process.env.SOLEA_PRIMARY_SITE_ORIGIN = "";
    assert.equal(proxy(new NextRequest("https://preview.fondation-solea.ch/contact/")).headers.get("location"), null);
  } finally {
    if (previous === undefined) delete process.env.SOLEA_PRIMARY_SITE_ORIGIN;
    else process.env.SOLEA_PRIMARY_SITE_ORIGIN = previous;
  }
});

test("runtime loads each site's own Stripe credentials and fails instead of using a shared legacy file", () => {
  const root = mkdtempSync(path.join(tmpdir(), "solea-runtime-"));
  try {
    writeFileSync(path.join(root, "solea-runtime.env"), "SMTP_PASSWORD=dummy-mail-password\n");
    writeFileSync(path.join(root, "solea-stripe.env"), "STRIPE_SECRET_KEY=sk_live_legacy\n");
    for (const [target, config] of [["preview", preview], ["production", production]] as const) {
      const site = path.join(root, "sites", target);
      mkdirSync(site, { recursive: true });
      writeFileSync(path.join(site, ".solea-deployment.json"), JSON.stringify({ target }));
      const settings = deploymentSettings(config);
      const envFile = path.join(root, `solea-stripe-${target}.env`);
      writeFileSync(envFile, Object.entries({
        STRIPE_SECRET_KEY: config.STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET: config.STRIPE_WEBHOOK_SECRET,
        STRIPE_SITE_URL: config.STRIPE_SITE_URL, STRIPE_DONATION_STORE_PATH: settings.DEPLOY_DONATION_STORE_PATH,
      }).map(([key, value]) => `${key}=${value}`).join("\n"));
      const loaded = loadRuntimeEnvironment(site, { STRIPE_SECRET_KEY: "sk_live_inherited" });
      assert.equal(loaded.STRIPE_SECRET_KEY, config.STRIPE_SECRET_KEY);
      assert.equal(loaded.SOLEA_PRIMARY_SITE_ORIGIN, target === "production" ? "https://fondation-solea.ch" : "");
      assert.equal(loaded.SMTP_PASSWORD, "dummy-mail-password");
      rmSync(envFile);
      assert.throws(() => loadRuntimeEnvironment(site, config));
    }
    const previewSite = path.join(root, "sites", "preview");
    writeFileSync(path.join(root, "solea-stripe-preview.env"), "STRIPE_SECRET_KEY=sk_live_wrong\n");
    assert.throws(() => loadRuntimeEnvironment(previewSite, preview));
    assert.deepEqual(loadRuntimeEnvironment(path.join(root, "local"), { PORT: "3000" }), { PORT: "3000" });
  } finally { rmSync(root, { recursive: true, force: true }); }
});
