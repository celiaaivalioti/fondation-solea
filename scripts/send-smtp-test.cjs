// Manual diagnostic only: requires explicit authorization to send real emails.
const nodemailer = require("nodemailer");
async function main() {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mail.infomaniak.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    requireTLS: true,
    auth: { user: process.env.SMTP_USER || "samy.zayani@fondation-solea.ch", pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
    logger: false, debug: false,
  });
  try {
    for (const sender of ["contact@fondation-solea.ch", "samy.zayani@fondation-solea.ch"]) {
      try {
        const result = await transport.sendMail({
          from: { name: "Fondation Solea", address: sender },
          to: "contact@fondation-solea.ch",
          replyTo: "contact@fondation-solea.ch",
          subject: `[TEST TECHNIQUE] Vérification de l’expéditeur ${sender}`,
          text: "Test technique demandé pour diagnostiquer l’envoi des confirmations du site Solea. Aucune demande réelle, inscription ou donation. Aucune action requise.",
        });
        console.log(JSON.stringify({ sender, accepted: result.accepted, rejected: result.rejected, response: result.response }));
      } catch (error) {
        console.log(JSON.stringify({ sender, code: error.code, command: error.command, responseCode: error.responseCode, response: error.response }));
      }
    }
  } finally { transport.close(); }
}
main().catch(() => { process.exitCode = 1; });
