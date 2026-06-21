# Deploy Garg Plywood Palace on Render

This guide covers deploying the Next.js site as a **Render Web Service** from [github.com/ViditOG2006/garg-plywood-website](https://github.com/ViditOG2006/garg-plywood-website).

## Prerequisites

- GitHub repo pushed and up to date
- A [Render](https://render.com) account
- Gmail App Password (or other SMTP credentials) for the contact form

## Build & start commands

| Setting | Value |
|--------|--------|
| **Runtime** | Node |
| **Node version** | `20` (set via `NODE_VERSION` env var or `engines` in `package.json`) |
| **Build command** | `npm install && npm run build` |
| **Start command** | `npm start` |

Render sets `PORT` automatically; Next.js picks it up. No custom server is required.

## Environment variables (contact form SMTP)

Add these in **Render Dashboard → your service → Environment**. All six are needed for the contact form to send email in production.

| Variable | Required | Example / notes |
|----------|----------|-----------------|
| `SMTP_HOST` | Yes | `smtp.gmail.com` |
| `SMTP_PORT` | Yes | `587` (TLS) or `465` (SSL) |
| `SMTP_USER` | Yes | Gmail address that owns the App Password |
| `SMTP_PASS` | Yes | 16-character Gmail App Password (no spaces) |
| `SMTP_FROM` | Recommended | `Garg Plywood Palace <gargplywoodpalacesince1985@gmail.com>` |
| `SMTP_TO` | Recommended | `gargplywoodpalacesince1985@gmail.com` (inbox for inquiries) |

Also set:

| Variable | Value |
|----------|--------|
| `NODE_ENV` | `production` |
| `NODE_VERSION` | `20` |

**Gmail App Password setup**

1. Enable 2-Step Verification on the Google account.
2. Open [App Passwords](https://myaccount.google.com/apppasswords).
3. Create a password named e.g. “Garg Plywood Website”.
4. Paste the 16-character value into `SMTP_PASS` on Render (not in git).

See `.env.example` in the repo for local development. **Never commit `.env.local` or real passwords.**

## Option A — Create Web Service manually (recommended for first deploy)

1. Sign in at [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** → **Web Service**.
3. Connect **GitHub** and select repo **ViditOG2006/garg-plywood-website**.
4. Configure the service:

   | Field | Value |
   |-------|--------|
   | **Name** | `garg-plywood-palace` (or your choice; becomes part of `*.onrender.com` URL) |
   | **Region** | **Singapore** (closest to India) or Oregon if you prefer US |
   | **Branch** | `master` |
   | **Root Directory** | *(leave blank)* |
   | **Runtime** | **Node** |
   | **Build Command** | `npm install && npm run build` |
   | **Start Command** | `npm start` |
   | **Instance Type** | **Free** (or paid for always-on / more resources) |

5. Expand **Environment Variables** and add all variables from the tables above.
6. Click **Create Web Service**. Render will clone, build, and deploy.
7. When the deploy finishes, open the `https://<name>.onrender.com` URL and test **Contact**.

## Option B — Deploy from `render.yaml` (Blueprint)

1. In Render: **New +** → **Blueprint**.
2. Connect the same GitHub repo; Render reads `render.yaml` at the repo root.
3. Review the proposed web service and enter SMTP values when prompted (`sync: false` keys).
4. Apply the Blueprint.

## Free vs paid tier

| | **Free** | **Paid (Starter+)** |
|---|----------|---------------------|
| **Cost** | $0 | From ~$7/month per service |
| **Spin-down** | Service sleeps after ~15 min idle; first request after sleep can take 30–60+ seconds | Always on |
| **Cold starts** | Noticeable on first visit after idle | Minimal |
| **Custom domains** | Supported (HTTPS included) | Supported |
| **SMTP / API routes** | Work when the instance is awake | Work continuously |

For a business brochure site, free tier is fine for testing; use a paid instance if you need faster first loads and no sleep.

## Custom domain (optional)

1. In Render: **your service → Settings → Custom Domains → Add**.
2. Add e.g. `gargplywoodpalace.com` and `www.gargplywoodpalace.com`.
3. At your domain registrar, add the DNS records Render shows (usually a CNAME for `www` and A/ALIAS for apex).
4. Wait for DNS propagation; Render provisions TLS automatically.
5. Update `SITE.url` in `src/lib/constants.ts` if it still points elsewhere, then redeploy.

## Verify deployment

1. **Homepage** loads at your Render URL.
2. **Contact form** — submit a test message; check `SMTP_TO` inbox.
3. If email fails: confirm all six SMTP vars, App Password is valid, and check **Logs** in the Render dashboard for `SmtpNotConfiguredError` or `SmtpAuthError`.

## Local production check

```bash
npm install
npm run build
npm start
```

Requires `.env.local` with the same SMTP variables for contact form testing locally.
