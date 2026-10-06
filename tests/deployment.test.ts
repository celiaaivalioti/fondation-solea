import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

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
