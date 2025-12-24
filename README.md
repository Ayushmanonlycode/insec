# 🛡️ ApniSec - Secure Intelligence Platform

**ApniSec** is a cutting-edge, cybersecurity-themed dashboard built for high-stakes intelligence management. It features a Next.js 15 App Router architecture, robust OOP backend, and a premium "Command Center" UI.

## 🌟 Key Features

- **Cybersecurity Aesthetic**: Immersive dark mode, neon accents, and scanline effects.
- **Secure Authentication**: JWT-based auth with HTTP-Only cookies and automatic refresh rotation.
- **Role-Based Access**: Granular control over Incidents and Directive visibility.
- **Performance**: In-memory caching for issues and blogs.
- **Interactive UI**: Animated `SuccessModals` and dynamic data visualization.

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js 18+
- PostgreSQL Database (Local or Neon/Supabase)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-repo/apnisec.git
cd apnisec

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgres://user:pass@host:5432/db_name"

# Authentication (Generate robust secrets!)
JWT_ACCESS_SECRET="complex_random_string_A"
JWT_REFRESH_SECRET="complex_random_string_B"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (Optional)
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"
```

### 4. Database Migration
Push the Drizzle schema to your database:
```bash
npx drizzle-kit push
```

### 5. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to access the Command Center.

---

## 📚 Documentation Map

- **[Frontend Guide](src/app/README.md)**: UI Architecture, Components, and Design System.
- **[Backend Guide](src/backend/README.md)**: Services, Repositories, API, and Security.

---

## 🚀 Deployment Guide

### Option 1: Vercel (Recommended)

1.  **Push to GitHub**: Ensure your code is in a remote repository.
2.  **Import Project**: Go to [Vercel](https://vercel.com), "Add New Project", and select your repo.
3.  **Environment Variables**:
    - Copy all values from your local `.env`.
    - **Important**: Generate *new, strong* secrets for `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` in production.
4.  **Build Settings**:
    - Framework Preset: `Next.js`
    - Build Command: `next build`
    - Install Command: `npm install`
5.  **Deploy**: Click "Deploy". Vercel will build the monolithic app (Frontend + API Routes).

### Option 2: Self-Hosted (Docker/Node)

1.  **Build**:
    ```bash
    npm run build
    ```
2.  **Start**:
    ```bash
    npm start
    ```
    Ensure your process manager (PM2, Docker) exposes port 3000.

### Database Notes (Supabase/Neon)
- Ensure your production database allows connections from Vercel IPs (0.0.0.0/0 or specific allowlists).
- Use the **Transaction Pooler** URL (port 6543) for serverless environments (like Vercel) if available, or the Session URL (port 5432) for long-lived servers.

---

## 🔒 Security Best Practices

- **Secrets**: Never commit `.env` files.
- **Rotation**: Rotate `JWT_REFRESH_SECRET` periodically if compromise is suspected.
- **HTTPS**: Always serve over HTTPS in production (Vercel does this automatically).
