const fs = require("node:fs");
const path = require("node:path");

function readEnvironment(filename, required = false) {
  try {
    const values = {};
    for (const line of fs.readFileSync(filename, "utf8").split("\n")) {
      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (match) values[match[1]] = match[2];
    }
    return values;
  } catch (error) {
    if (!required && error.code === "ENOENT") return {};
    throw new Error("Runtime configuration could not be loaded");
  }
}

function loadRuntimeEnvironment(siteDirectory, inherited = process.env) {
  const configPath = path.join(siteDirectory, ".solea-deployment.json");
  // A local standalone run uses its own process environment.
  if (!fs.existsSync(configPath)) return { ...inherited };
  const { target } = JSON.parse(fs.readFileSync(configPath, "utf8"));
  if (target !== "preview" && target !== "production") throw new Error("Invalid deployment target");
  const privateDirectory = path.resolve(siteDirectory, "..", "..");
  const environment = {
    ...inherited,
    ...readEnvironment(path.join(privateDirectory, "solea-runtime.env")),
    ...readEnvironment(path.join(privateDirectory, `solea-stripe-${target}.env`), true),
  };
  const origin = target === "production" ? "https://fondation-solea.ch" : "https://preview.fondation-solea.ch";
  const keyPattern = target === "production" ? /^(sk|rk)_live_/ : /^(sk|rk)_test_/;
  if (!keyPattern.test(environment.STRIPE_SECRET_KEY || "") ||
      !/^whsec_/.test(environment.STRIPE_WEBHOOK_SECRET || "") ||
      environment.STRIPE_SITE_URL !== origin ||
      !path.isAbsolute(environment.STRIPE_DONATION_STORE_PATH || "")) {
    throw new Error("Stripe configuration does not match the deployment target");
  }
  environment.SOLEA_PRIMARY_SITE_ORIGIN = target === "production" ? origin : "";
  return environment;
}

module.exports = { loadRuntimeEnvironment };
