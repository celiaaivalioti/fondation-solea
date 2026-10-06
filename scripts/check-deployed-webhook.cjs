const { createHmac, randomUUID } = require("node:crypto");

// An unknown event verifies the endpoint's signing secret without recording a
// donation, creating a payment or sending an email.
async function check() {
  // Allow the existing wrapper's ten-second build watcher to restart the server.
  await new Promise(resolve => setTimeout(resolve, 12_000));
  for (let attempt = 0; attempt < 10; attempt++) {
    const timestamp = Math.floor(Date.now() / 1000);
    const payload = JSON.stringify({ id: `evt_configuration_${randomUUID().replaceAll("-", "")}`, object: "event", created: timestamp, livemode: process.env.DEPLOY_TARGET === "production", type: "solea.configuration_check", data: { object: {} } });
    const digest = createHmac("sha256", process.env.STRIPE_WEBHOOK_SECRET).update(`${timestamp}.${payload}`).digest("hex");
    try {
      const response = await fetch(`${process.env.DEPLOY_SITE_URL}/api/stripe/webhook/`, {
        method: "POST", redirect: "error", signal: AbortSignal.timeout(5000),
        headers: { "Content-Type": "application/json", "Stripe-Signature": `t=${timestamp},v1=${digest}` }, body: payload,
      });
      const result = await response.json();
      if (response.status === 200 && result.received === true) {
        console.log("Deployed webhook accepts the configured signing secret.");
        return;
      }
    } catch { /* The supervisor may still be restarting the app. */ }
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  throw new Error("Deployed webhook verification failed. Check domain routing and restart the Node.js app in Infomaniak Manager.");
}
check().catch(error => { console.error(error.message); process.exitCode = 1; });
