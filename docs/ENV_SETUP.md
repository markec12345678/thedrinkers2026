# Environment Variables Setup Guide

This guide explains how to configure environment variables for The Drinkers website.

## Quick Start

1. **Copy the example file:**

   ```bash
   cp .env.example .env
   ```

2. **Generate a secure auth secret:**

   ```bash
   # macOS/Linux
   openssl rand -base64 32

   # Windows PowerShell
   [System.Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
   ```

3. **Validate your configuration:**
   ```bash
   npm run env:check
   ```

## Required Variables

### Database

| Variable       | Description                       | Example                                          |
| -------------- | --------------------------------- | ------------------------------------------------ |
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |

**How to get:**

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project or select existing
3. Click "Connection Details"
4. Copy the connection string

### Authentication (Better Auth)

| Variable             | Description                    | Requirements                  |
| -------------------- | ------------------------------ | ----------------------------- |
| `BETTER_AUTH_SECRET` | Secret key for session signing | Min 32 characters             |
| `BETTER_AUTH_URL`    | Your application URL           | `http://localhost:3000` (dev) |

**How to generate secret:**

```bash
# Generate secure random string
openssl rand -base64 32
```

### Email (Resend)

| Variable         | Description                       | Example        |
| ---------------- | --------------------------------- | -------------- |
| `RESEND_API_KEY` | Resend API key for sending emails | `re_xxxxxxxxx` |

**How to get:**

1. Sign up at [Resend](https://resend.com)
2. Go to [API Keys](https://resend.com/api-keys)
3. Create new API key
4. Copy the key (starts with `re_`)

### Payments (Stripe)

| Variable                 | Description                         | Example       |
| ------------------------ | ----------------------------------- | ------------- |
| `STRIPE_SECRET_KEY`      | Stripe secret key                   | `sk_test_xxx` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key              | `pk_test_xxx` |
| `STRIPE_WEBHOOK_SECRET`  | Webhook signing secret (production) | `whsec_xxx`   |

**How to get:**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to "Developers" → "API keys"
3. Copy test keys for development
4. For webhooks: Create webhook endpoint and copy signing secret

### Application

| Variable              | Description      | Default                 |
| --------------------- | ---------------- | ----------------------- |
| `NODE_ENV`            | Environment mode | `development`           |
| `NEXT_PUBLIC_APP_URL` | Public app URL   | `http://localhost:3000` |

## Optional Variables

### Analytics

| Variable                          | Description           | Example        |
| --------------------------------- | --------------------- | -------------- |
| `NEXT_PUBLIC_GA_ID`               | Google Analytics 4 ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Vercel Analytics ID   | `xxxxxxxxxx`   |

### AI Services

| Variable            | Description           | Example                  |
| ------------------- | --------------------- | ------------------------ |
| `OPENAI_API_KEY`    | OpenAI API key        | `sk-xxx`                 |
| `ANTHROPIC_API_KEY` | Anthropic API key     | `sk-ant-xxx`             |
| `GOOGLE_AI_API_KEY` | Google AI API key     | `xxx`                    |
| `OLLAMA_HOST`       | Local Ollama instance | `http://localhost:11434` |

### Development Tools

| Variable                       | Description                | Example    |
| ------------------------------ | -------------------------- | ---------- |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | GitHub PAT for MCP         | `ghp_xxx`  |
| `MEMORIX_API_KEY`              | Memorix AI memory API key  | `xxx`      |
| `NEON_API_KEY`                 | Neon API for DB management | `napi_xxx` |
| `NEON_PROJECT_ID`              | Neon project ID            | `ep-xxx`   |

## Environment-Specific Configuration

### Development (.env)

```env
DATABASE_URL=postgresql://localhost:5432/thedrinkers
BETTER_AUTH_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production (.env.production)

```env
DATABASE_URL=postgresql://neondb_owner:xxx@host/neondb?sslmode=require
BETTER_AUTH_URL=https://thedrinkers.si
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://thedrinkers.si
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## Validation

The application validates environment variables on startup:

```bash
# Check environment variables
npm run env:check

# Build with validation
npm run build

# Build without validation (CI/CD)
npm run env:check:build
```

### Validation Rules

- **DATABASE_URL**: Must be a valid URL
- **BETTER_AUTH_SECRET**: Minimum 32 characters
- **BETTER_AUTH_URL**: Must be a valid URL
- **RESEND_API_KEY**: Must start with `re_`
- **STRIPE_SECRET_KEY**: Must start with `sk_`
- **STRIPE_WEBHOOK_SECRET**: Must start with `whsec_`
- **OPENAI_API_KEY**: Must start with `sk-`
- **ANTHROPIC_API_KEY**: Must start with `sk-ant-`
- **NEXT_PUBLIC_GA_ID**: Must start with `G-`

## Troubleshooting

### Error: Invalid environment variables

1. Run validation script:

   ```bash
   npm run env:check
   ```

2. Check error message for specific missing/invalid variables

3. Update `.env` file with correct values

4. Restart development server:
   ```bash
   npm run dev
   ```

### Error: BETTER_AUTH_SECRET must be at least 32 characters

Generate a new secret:

```bash
openssl rand -base64 32
```

### Error: RESEND*API_KEY must start with 're*'

Make sure you copied the complete key from Resend dashboard. Keys start with `re_`.

### Error: STRIPE*SECRET_KEY must start with 'sk*'

- Test keys start with `sk_test_`
- Live keys start with `sk_live_`
- Both are valid, just need the `sk_` prefix

## Security Best Practices

1. **Never commit `.env` files** to Git (already in `.gitignore`)
2. **Use different secrets** for development and production
3. **Rotate secrets regularly** (especially after team changes)
4. **Use environment-specific** Stripe keys (test vs live)
5. **Restrict database access** to specific IPs in production
6. **Use Vercel Environment Variables** for production deployments

## Vercel Deployment

Add environment variables in Vercel Dashboard:

1. Go to Project Settings → Environment Variables
2. Add each variable from `.env.example`
3. Deploy to apply changes

Or use Vercel CLI:

```bash
vercel env pull .env.production
```

## Local Development with Docker

If using Docker for local development:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/thedrinkers
```

Start PostgreSQL:

```bash
docker run -d \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=thedrinkers \
  -p 5432:5432 \
  postgres:15
```

## Additional Resources

- [Better Auth Documentation](https://better-auth.com)
- [Neon Database Docs](https://neon.tech/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Resend Documentation](https://resend.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/rendering/environment-variables)

---

**Need help?** Run `npm run env:check` to validate your configuration.
