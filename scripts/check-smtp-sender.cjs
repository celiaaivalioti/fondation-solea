// Check authentication and sender authorization without submitting message DATA.
const SMTPConnection = require("nodemailer/lib/smtp-connection");
const connection = new SMTPConnection({
  host: process.env.SMTP_HOST || "mail.infomaniak.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  requireTLS: true,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  logger: false,
  debug: false,
});
connection.on("error", error => {
  console.error(JSON.stringify({ code: error.code, command: error.command, responseCode: error.responseCode }));
  connection.close();
  process.exitCode = 1;
});
function command(value) {
  return new Promise(resolve => {
    connection._responseActions.push(resolve);
    connection._sendCommand(value);
  });
}
connection.connect(() => {
  connection.login({ user: process.env.SMTP_USER || "samy.zayani@fondation-solea.ch", pass: process.env.SMTP_PASSWORD }, async error => {
    if (error) {
      console.error(JSON.stringify({ stage: "authentication", code: error.code, responseCode: error.responseCode }));
      connection.close();
      process.exitCode = 1;
      return;
    }
    console.log("SMTP authentication successful");
    try {
      for (const sender of ["contact@fondation-solea.ch", "samy.zayani@fondation-solea.ch"]) {
        await command("RSET");
        const mail = await command(`MAIL FROM:<${sender}>`);
        const recipient = /^2/.test(mail) ? await command("RCPT TO:<contact@fondation-solea.ch>") : "Not attempted";
        console.log(JSON.stringify({ sender, mail, recipient }));
      }
      await command("RSET");
      connection.quit();
    } catch {
      connection.close();
      process.exitCode = 1;
    }
  });
});
