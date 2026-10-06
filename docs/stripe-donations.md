# Stripe donations

Solea uses Stripe-hosted Checkout for one-time and monthly CHF donations. No
publishable key is needed. Card details are entered on Stripe, never on this site.
Checkout accepts card payments and eligible card wallets. CHF amounts are
validated on the server (CHF 1–100,000, at most two decimal places). The optional
2.7% contribution appears as a separate line item and recurs for monthly gifts.
It is a contribution towards costs, not a guarantee that it covers every fee.

## Configure the preview

1. Add `STRIPE_SECRET_KEY` to GitHub Actions repository secrets with the Stripe
   account's sandbox/test server-side key. Do not commit credentials.
2. In that same Stripe sandbox, create a **snapshot event webhook destination**
   for the foundation's account (not connected accounts), using:

   `https://preview.fondation-solea.ch/api/stripe/webhook/`

   The trailing slash matters: Next.js redirects non-trailing-slash URLs, and
   Stripe should receive the endpoint's response directly.
3. Select **2026-08-26.dahlia** (the foundation Sandbox's current version) for
   snapshot events and subscribe to:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
4. Copy that destination's signing secret (`whsec_…`) into the GitHub Actions
   repository secret `STRIPE_WEBHOOK_SECRET`.
5. Deploy the updated code. Checkout returns an unavailable error until both
   secrets are configured. GitHub forwards them to a private runtime file outside
   the site directory. Secrets are used at runtime and never put into the browser.
6. Ensure the Donations page and its donation section are visible in Sanity. The
   existing public-page visibility settings are respected.
7. In Stripe, enable card payments, configure the foundation's logo and branding,
   and enable successful-payment receipts/customer subscription notifications
   as appropriate. Stripe receipts are separate from the foundation's PDF donation
   attestation, which this application sends through its existing Infomaniak SMTP
   configuration after a confirmed payment.
8. Sandbox and live attestations are sent to the donor email collected in
   Checkout. For tests, enter a mailbox you control. Sandbox emails have a
   **[TEST]** subject and the PDF clearly states it has no fiscal value.
   The former `STRIPE_DONATION_TEST_EMAIL` setting is no longer used.

The SDK's outgoing API requests remain pinned in `lib/stripe.ts`; the webhook's
snapshot version determines the received payload independently. Verify the
one-time and monthly flows again before changing that snapshot version.

For a different hostname, set the GitHub Actions **repository variable**
`STRIPE_SITE_URL` to its HTTPS origin. The default is the preview hostname above.
Return URLs and same-origin request validation use this trusted configuration.

## Verify in the sandbox

Use `4242 4242 4242 4242`, any future expiry date and any three-digit CVC; enter
test donor details. Confirm one-time and monthly gifts, a custom decimal amount,
company name collection and the optional fee contribution. Try a declined test
card (`4000 0000 0000 9995`), authentication (`4000 0025 0000 3155`), and leaving
Checkout before payment. Confirm the French and English return pages.

Check Stripe's event delivery log for HTTP 200. Resend a paid event and verify
that it does not create an additional payment record. Use a Stripe subscription
test clock to check a monthly renewal and failure, then cancel the subscription
from Stripe and confirm the cancellation event is recorded. Monthly donors are
directed to contact Solea to change or stop their donation; staff manage this
from Stripe. There is no self-service customer portal in this implementation.

Check that the email entered in Checkout receives one email with a readable,
personalized PDF marked **TEST - AUCUNE VALEUR FISCALE**.
Resend the event: no second email should arrive. Check the first monthly payment
and a renewal: each invoice should produce one certificate. Failed, pending and
zero-value payments produce no certificate. An accepted SMTP message still needs
an inbox check: server acceptance is not proof of inbox delivery.

The return page retrieves the Checkout session from Stripe. A query string alone
cannot mark a gift as paid. Pending, cancelled, unverifiable and test payments have
separate messages. The return page contains no donor name, address or email, and
does not load analytics with the private Checkout session identifier in its URL.

## Webhook records

The webhook verifies the Stripe signature over the raw, size-limited request
body. It acknowledges relevant events only after saving their normalized records
and completing the required attestation delivery. It returns HTTP 500 on
processing failure so Stripe can retry.

Production records live at `/srv/customer/solea-donations`, outside the rsynced
site directory. They contain Stripe identifiers, timestamps, test/live mode,
status, currency and total centimes; no names, email addresses or card details.
Files are private (0600) and the directory is created with 0700 permissions.
Atomic file publication deduplicates both concurrent retries and distinct event
IDs referring to the same paid Checkout session or invoice.

Monthly payments come from `invoice.paid`, including the initial payment. Their
Checkout completion is not also recorded as a payment. Paid, failed and cancelled
records are distinct; do not sum failed events as donations. Refunds/disputes are
managed and reconciled in Stripe: this journal is a confirmation log, not a full
accounting ledger. Stripe remains the source for donor details and balances.
Back up the record directory as part of the server's normal backup process.

## Donation attestations by email

Every confirmed one-time donation and every paid monthly invoice triggers a PDF
attachment, using the foundation's supplied **Attestation de dons - v3.docx** text
and logo. The certificate remains in French; the accompanying message follows the
Checkout language. It uses the collected individual or company name, billing
address, actual amount received in CHF **including the optional fee contribution**,
and payment date in the Europe/Zurich time zone. No annual aggregation is produced.
The foundation's legal wording is reproduced as supplied. The generated greeting
uses “Bonjour” rather than inferring a donor's gender.

The existing `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` and optional
`SMTP_FROM` configuration is reused. No new email provider or API secret is needed.
The sender name is Fondation Solea and replies go to `contact@fondation-solea.ch`.
Both live and sandbox events email the donor. Sandbox emails and PDFs are
clearly marked as tests and do not certify a real donation.
Neither the PDF nor donor name/address/email is saved to disk or logged by the app.
They are processed in memory and transmitted to the email provider. Persistent
delivery markers under `attestations/` contain a reference, amount, message ID,
template version and timestamps only, with private file/directory permissions.

An atomic `.sending.json` claim prevents concurrent senders. A `.sent.json` marker
prevents later replays from sending again. SMTP rejection or failure before sending
releases the claim and returns 500; Stripe replay can retry delivery even though
the payment record already exists. Translations or characters outside the bundled
font coverage and incomplete donor details fail before sending rather than issue
an inaccurate certificate; correct/reconcile these manually from Stripe.

SMTP cannot guarantee exactly-once delivery after a lost acceptance response or a
server crash. In an uncertain outcome, the sending claim remains and automatic
replays return 500 to prevent blind duplicate emails. Check failed webhook
deliveries in Stripe and the server log; reconcile stale claims with the mailbox
sent log using the stable `Message-ID` (`<solea-…@fondation-solea.ch>`). If sent,
an operator should publish the corresponding `.sent.json` marker; if demonstrably
not sent, remove only that payment's `.sending.json` claim and replay its original
Stripe event. Never delete all markers or a claim while a send is still running.
Do not assume expired retries will self-recover: replay manually after resolving
configuration, storage or ambiguous delivery issues.

The bundled Noto Sans fonts are licensed under the SIL Open Font License, included
in `assets/donations/OFL.txt`; Next's standalone tracing includes the PDF assets.

## Local development and checks

Set test `STRIPE_SECRET_KEY`, `STRIPE_SITE_URL=http://localhost:3000` and the Stripe
CLI listener's signing secret as `STRIPE_WEBHOOK_SECRET` in `.env.local`:

```sh
stripe listen --forward-to localhost:3000/api/stripe/webhook/
npm run dev
```

Local records default to the ignored `.data/stripe-donations` directory. To change
the store, set `STRIPE_DONATION_STORE_PATH` to an absolute path. Production requires
an explicit persistent path; the deploy workflow configures it automatically.

```sh
npm run test:donations
npx tsc --noEmit
npm run lint
npm run build -- --webpack
```

Automated tests use dummy credentials and mock Stripe's network methods; they
check validation, recurring fees, idempotency, genuine signature verification,
duplicate deliveries, storage recovery, rate limiting, confirmation states, PDF
generation, donor delivery with PDF attachments in both modes, email retries
and uncertain SMTP outcomes.
They do not replace an end-to-end sandbox payment with the foundation's account.

## Activate live donations

After sandbox verification, use the activated foundation account's live key and
create a separate **live** webhook destination with the same URL, API version and
events. Replace both GitHub secrets with the live credentials and redeploy. Set
`STRIPE_SITE_URL` and the live webhook URL to the production hostname if it differs.
Never mix sandbox keys, live keys and destination signing secrets.

References: [Stripe Checkout](https://docs.stripe.com/checkout/quickstart),
[webhooks](https://docs.stripe.com/webhooks), and
[test payments](https://docs.stripe.com/testing).
