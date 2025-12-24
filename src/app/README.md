# ApniSec Frontend Documentation

**Location**: `src/app`

This directory matches the **Next.js App Router** structure, featuring a high-fidelity "Cybersecurity" aesthetic with server and client components.

## 🎨 Design Philosophy & Aesthetic

The UI is built to resemble a futuristic **Command Center**.
- **Primary Color**: Neon Green (`#00FFB2`) for active states, success, and system indicators.
- **Background**: Deep Zinc Black (`#0a0a0a`) with subtle radial gradients.
- **Visual Effects**:
    - **Scanlines**: CSS-based animated overlays.
    - **Backdrop Blur**: Used in modals and sticky headers.
    - **Micro-interactions**: Hover transforms and spring based animations using `framer-motion`.

## 📂 Directory Structure

### `(public)`
Accessible to all visitors.
- `/login`: Enhanced login form with animated background.
- `/register`: Registration flow.
- `/page.tsx`: Landing page (Hero section).

### `(protected)`
Requires authentication. Wrapped in Auth Guards.
- `/dashboard`: Main incident management interface.
- `/profile`: User settings and directives.
- `/blogs`: Intelligence directive (blog) feed.
- `/stats`: System analytics visualization.

### `api`
Next.js Route Handlers (Backend Entry Points). See `src/backend/README.md` for details.

## 🧩 Key Components

### 1. `SuccessModal` (`src/components/common`)
Replaces browser alerts.
- **Features**: Auto-dismiss (5s), progress bar, themed visuals.
- **Usage**:
  ```tsx
  <SuccessModal
    isOpen={isOpen}
    title="Protocol Synced"
    message="Action completed successfully."
    onClose={handleClose}
  />
  ```

### 2. `DashboardNav` & `SystemSidebar`
- **Nav**: Global navigation with user profile summary.
- **Sidebar**: Decorative system metrics (CPU, Memory, Network) to enhance immersion.

### 3. `IssueCard` & `BlogCard`
- Display units for Incidents and Directives.
- specific interactive states for "Edit" and "Delete".

## 🛡️ Authentication Guards

Protected pages use a client-side effect to verify session validity.
- **Mechanism**: Calls `/api/auth/me`.
- **Action**: Redirects to `/login` on 401.
- **UX**: Shows a "System locking..." or loading state during verification.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
