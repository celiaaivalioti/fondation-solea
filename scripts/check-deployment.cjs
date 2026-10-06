const fs = require("node:fs");

function deploymentSettings(environment) {
  const target = environment.DEPLOY_TARGET;
  if (target !== "preview" && target !== "production") throw new Error("Invalid deployment target");
  const production = target === "production";
  const layout = environment.HOSTING_LAYOUT || "separate";
  if (layout !== "single" && layout !== "separate") throw new Error("Invalid hosting layout");
  if (layout === "single" && !production) throw new Error("Sandbox deployment is disabled on the converted live app");
  if (production && environment.GITHUB_REF && environment.GITHUB_REF !== "refs/heads/main") {
    throw new Error("Production must be deployed from main");
  }
  const origin = production ? "https://fondation-solea.ch" : "https://preview.fondation-solea.ch";
  const sitePath = production ? environment.PRODUCTION_SITE_PATH : "/srv/customer/sites/preview.fondation-solea.ch";
  if (!/^\/srv\/customer\/sites\/[a-zA-Z0-9][a-zA-Z0-9.-]*$/.test(sitePath || "") ||
      (production && layout !== "single" && sitePath === "/srv/customer/sites/preview.fondation-solea.ch")) {
    throw new Error("Set production INFOMANIAK_SITE_PATH to the confirmed Node.js site folder");
  }
  const keyPattern = production ? /^(sk|rk)_live_/ : /^(sk|rk)_test_/;
  if (!keyPattern.test(environment.STRIPE_SECRET_KEY || "") || !/^whsec_/.test(environment.STRIPE_WEBHOOK_SECRET || "")) {
    throw new Error("Stripe credentials do not match the deployment target");
  }
  if ((environment.STRIPE_SITE_URL || (production ? "" : origin)) !== origin) {
    throw new Error("Stripe site URL does not match the deployment target");
  }
  return {
    DEPLOY_SITE_PATH: sitePath,
    DEPLOY_SITE_URL: origin,
    // Keep preview's existing markers to avoid resending historical test emails.
    DEPLOY_DONATION_STORE_PATH: production ? "/srv/customer/solea-donations-production" : "/srv/customer/solea-donations",
  };
}

if (require.main === module) {
  try {
    const settings = deploymentSettings(process.env);
    fs.appendFileSync(process.env.GITHUB_ENV, Object.entries(settings).map(([key, value]) => `${key}=${value}\n`).join(""));
    console.log(`Validated ${process.env.DEPLOY_TARGET} deployment configuration.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
module.exports = { deploymentSettings };
