# ApniSec Backend Documentation

**Location**: `src/backend`

The backend follows a strict **Layered Architecture** (OOP) to separate concerns, ensure testability, and maintain type safety.

## 🏗️ Architecture Layers

### 1. **Handlers** (`src/backend/handlers`)
**Role**: Controllers. Handle HTTP Request/Response.
- Extract data from `NextRequest`.
- Validate input using `Zod` schemas.
- Call Services.
- Return standardized JSON responses.

### 2. **Services** (`src/backend/services`)
**Role**: Business Logic.
- **`AuthService`**: Registration, Login, JWT issuing (Access/Refresh).
- **`UserService`**: Profile management settings.
- **`IssueService`**: Incident CRUD operations + **Caching**.
- **`BlogService`**: Directive CRUD operations + **Caching**.

### 3. **Repositories** (`src/backend/repositories`)
**Role**: Data Access.
- Interfaces (`IUserRepository`, etc.) define contracts.
- Implementations (`DrizzleUserRepository`) use Drizzle ORM to talk to the DB.

### 4. **Validators** (`src/backend/validators`)
**Role**: Input constraints.
- Zod schemas for strict type checking at runtime (e.g., `RegisterSchema`, `IssueSchema`).

## 💾 Database & Caching

### Database (PostgreSQL)
- **ORM**: Drizzle ORM.
- **Schema**:
  - `users`: ID, email, password_hash, full_name.
  - `issues`: High-priority system incidents.
  - `blogs`: Intelligence directives.

### Caching Strategy (`CacheService`)
In-memory caching is implemented to reduce DB load for read-heavy operations.
- **Scope**:
    - **Issues**: Cached per user (isolation).
    - **Blogs**: Global cache (shared intelligence).
    - **Profile**: Cached per session.
- **Invalidation**: Write operations (Create/Update/Delete) automatically clear relevant caches.
- **Headers**: `Cache-Control: no-store` added to sensitive routes to prevent *browser* caching.

## 🔒 Security Measures

1.  **JWT Authentication**:
    - **Access Token**: Short-lived (15m).
    - **Refresh Token**: Long-lived (7d), stored in HTTP-Only, Secure Cookie.
2.  **Password Hashing**: `bcrypt` with salt.
3.  **No-Store Headers**: Middleware ensures dashboard data isn't viewable via browser "Back" button after logout.
4.  **Zod Validation**: Prevents injection and malformed data at the entry gate.

## 🚀 API Routes (`src/app/api`)

### **Authentication**
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create new agent account | No |
| `POST` | `/api/auth/login` | Authenticate & set cookies | No |
| `POST` | `/api/auth/logout` | Clear session cookies | **Yes** |
| `GET` | `/api/auth/me` | Get current session info | **Yes** |

### **API 1: User Profile Management**
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Get user profile details | **Yes** |
| `PUT` | `/api/users/profile` | Update user profile (Name, etc.) | **Yes** |

### **API 2: Issue Management (Core Feature)**
| Method | Endpoint | Description | Params/Body | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/issues` | List all issues for user | `?type=VAPT` (Optional filter) | **Yes** |
| `POST` | `/api/issues` | Create new issue | `{ type, title, description, priority? }` | **Yes** |
| `GET` | `/api/issues/[id]` | Get single issue details | - | **Yes** |
| `PUT` | `/api/issues/[id]` | Update issue | `{ status, priority, ... }` | **Yes** |
| `DELETE` | `/api/issues/[id]` | Delete issue | - | **Yes** |

**Issue Types**: `Cloud Security`, `Redteam Assessment`, `VAPT`
**Required Fields**: `type`, `title`, `description`

### **API 3: Intelligence Directives (Choice Feature)**
This is the "Blog" or "Directive" system for broadcasting intelligence updates.
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/blogs` | List all intelligence directives | **Yes** |
| `POST` | `/api/blogs` | Publish new directive | **Yes** |
| `PUT` | `/api/blogs/[id]` | Update directive content | **Yes** |
| `DELETE` | `/api/blogs/[id]` | Delete directive | **Yes** |

## 🧪 Usage Examples (cURL)

**Note**: These commands assume you have a valid session cookie.

### **1. User Profile**
**Get Profile**
```bash
curl http://localhost:3000/api/users/profile
```

**Update Profile**
```bash
curl -X PUT http://localhost:3000/api/users/profile \
  -H "Content-Type: application/json" \
  -d '{"fullName": "Agent Smith", "username": "neo_v2"}'
```

### **2. Issue Management**
**List All Issues (with Filter)**
```bash
curl "http://localhost:3000/api/issues?type=Cloud%20Security"
```

**Create Issue**
```bash
curl -X POST http://localhost:3000/api/issues \
  -H "Content-Type: application/json" \
  -d '{
    "title": "SQL Injection in Login",
    "type": "VAPT",
    "description": "Found blind SQLi on the main gateway.",
    "priority": "HIGH"
  }'
```

**Get Single Issue**
```bash
curl http://localhost:3000/api/issues/[ISSUE_ID]
```

**Update Issue**
```bash
curl -X PUT http://localhost:3000/api/issues/[ISSUE_ID] \
  -H "Content-Type: application/json" \
  -d '{"status": "IN_PROGRESS", "priority": "CRITICAL"}'
```

**Delete Issue**
```bash
curl -X DELETE http://localhost:3000/api/issues/[ISSUE_ID]
```

### **3. Intelligence Directives (Blogs)**
**List Directives**
```bash
curl http://localhost:3000/api/blogs
```

**Publish Directive**
```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{"title": "New Protocol", "content": "All nodes must update encryption keys."}'
```

**Update Directive**
```bash
curl -X PUT http://localhost:3000/api/blogs/[BLOG_ID] \
  -H "Content-Type: application/json" \
  -d '{"title": "Protocol v2.1"}'
```

**Delete Directive**
```bash
curl -X DELETE http://localhost:3000/api/blogs/[BLOG_ID]
```
