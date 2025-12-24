# Deployment Guide (Vercel + Supabase)

This guide covers how to deploy the **ApniSec** application to Vercel with a Supabase database.

## Prerequisites

1.  **GitHub Repository**: Ensure your code is pushed to a GitHub repository.
2.  **Supabase Project**: You should have a Supabase project created.
3.  **Vercel Account**: You need a Vercel account linked to your GitHub.

## 1. Prepare Database (Supabase)

Vercel Serverless environments work best with the **Session Mode** connection pooling (Port 5432) for Drizzle/Postgres.

1.  Go to your **Supabase Dashboard** -> **Settings** -> **Database**.
2.  Under **Connection String**, select **URI**.
3.  **IMPORTANT**: Make sure "Use connection pooling" is **UNCHECKED** (or ensure check port is `5432`).
    *   *Note: If you use Transaction Mode (Port 6543), you might face timeout issues with prepared statements unless configured specifically.*
    *   Copy the connection string: `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres` (or similar).
4.  Replace `[password]` with your actual database password.

## 2. Push Schema to Production

Before deploying the app, your production database needs the tables.

1.  In your local terminal, run:
    ```bash
    npm run db:push
    ```
    *   *Tip*: If this pushes to your *local* DB, you can explicitly push to production by running:
        ```bash
        cross-env DATABASE_URL="<YOUR_SUPABASE_CONNECTION_STRING>" npm run db:push
        ```
        (Or specifically for Windows PowerShell:)
        ```powershell
        $env:DATABASE_URL='<YOUR_SUPABASE_CONNECTION_STRING>'; npm run db:push
        ```

## 3. Deploy to Vercel

1.  **Log in to Vercel** and click **"Add New..."** -> **"Project"**.
2.  **Import Git Repository**: Select your `insec` repository.
3.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: `./` (default).
4.  **Environment Variables** (Crucial Step):
    Add the following variables (copy values from your local `.env` but use Production secrets):

    | Key | Value Description |
    | :--- | :--- |
    | `DATABASE_URL` | The Supabase URI (Port 5432) you copied in Step 1. |
    | `JWT_ACCESS_SECRET` | A long, random string (e.g., generated via `openssl rand -hex 32`). |
    | `JWT_REFRESH_SECRET` | A different long, random string. |
    | `NODE_ENV` | `production` (Vercel sets this automatically usually). |

5.  Click **Deploy**.

## 4. Verification

1.  Wait for the build to complete.
2.  Visit the deployed URL (e.g., `https://insec-ten.vercel.app`).
3.  **Test Registration**: Go to `/register` and create a new user to verify Database writes.
4.  **Test Login**: Log in with that user to verify Database reads and JWT generation.

## Troubleshooting "Failed Query"

If you see "Failed query" logs in Vercel:
1.  **Tables Missing**: Did you run `npm run db:push` against the *production* URL?
2.  **Connection Mode**: Ensure `DATABASE_URL` is using Port `5432`.
3.  **IP Restrictions**: If your Supabase isn't allowing connections, check **Network Restrictions** in Supabase and ensure it allows `0.0.0.0/0` (allow all) for Vercel's dynamic IPs.
