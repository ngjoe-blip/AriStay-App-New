# AriStay API

REST API backend cho hệ thống quản lý vận hành bất động sản AriStay.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm hoặc yarn
- PostgreSQL 16+
- Redis 7+

### Installation

1. **Clone repo và cài dependencies:**

```bash
cd aristay-api
npm install
```

2. **Setup environment variables:**

```bash
cp .env.example .env
```

3. **Start services với Docker Compose:**

```bash
docker-compose up -d
```

4. **Run development server:**

```bash
npm run start:dev
```

API sẽ chạy tại: `http://localhost:3000/api`

## 📋 Available Scripts

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod

# Testing
npm run test
npm run test:e2e

# Linting
npm run lint
npm run lint:fix
```

## 🏗️ Project Structure

```
src/
├── auth/              # Authentication (JWT, Passport)
├── users/             # User management
├── properties/        # Properties & Units management
├── tasks/             # Task management
├── files/             # File upload/download (local storage)
├── common/            # Shared utilities
│   ├── guards/       # Auth guards
│   ├── decorators/   # Custom decorators
│   └── interceptors/ # Global interceptors
├── config/            # Configuration files
├── database/          # Database setup
└── main.ts           # Application entry point
```

## 🔐 Authentication

API sử dụng JWT token-based authentication.

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

Response:

```json
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "User Name",
    "role": "Admin"
  }
}
```

### Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "full_name": "New User",
    "phone": "1234567890",
    "role": "Cleaning"
  }'
```

### Using Token

```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer <access_token>"
```

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token

### Users
- `GET /users` - List all users (Admin only)
- `GET /users/:id` - Get user details
- `GET /users/me` - Get current user profile
- `PATCH /users/:id` - Update user (Admin only)
- `DELETE /users/:id` - Delete user (Admin only)

### Properties
- `GET /properties` - List all properties
- `POST /properties` - Create property (Admin only)
- `GET /properties/:id` - Get property details
- `PATCH /properties/:id` - Update property (Admin only)
- `DELETE /properties/:id` - Delete property (Admin only)
- `GET /properties/:propertyId/units` - List units in property
- `GET /units/:id` - Get unit details

### Tasks
- `GET /tasks` - List all tasks (with filters)
- `POST /tasks` - Create task
- `GET /tasks/:id` - Get task details
- `PATCH /tasks/:id` - Update task
- `PATCH /tasks/:id/status` - Update task status
- `DELETE /tasks/:id` - Delete task

### Files
- `POST /files/upload/:category/:id` - Upload file
- `GET /files/:category/:id/:filename` - Download file
- `DELETE /files/:category/:id/:filename` - Delete file
- `GET /files/list/:category/:id` - List files

## 👥 User Roles

| Role | Permissions |
|------|-----------|
| **Admin** | Full access to all features |
| **Cleaning** | Manage cleaning tasks, upload photos |
| **Maintenance** | Manage maintenance tasks, incidents |
| **Laundry** | Manage laundry orders |
| **LawnPool** | Manage lawn/pool maintenance |

## 🗄️ Database

### Entity Relationships

```
User
├─ Tasks (one-to-many)
└─ (assignee)

Property
├─ Units (one-to-many)
└─ Tasks (through units)

Unit
├─ Tasks (one-to-many)
└─ (assigned to unit)

Task
├─ Assignee (many-to-one with User)
└─ Unit (many-to-one with Unit)
```

### Database Initialization

PostgreSQL database is automatically created and synchronized when starting the application in development mode.

## 📁 File Upload

Files are stored locally in `/uploads` directory.

```
/uploads/
├── tasks/
│   └── {task-id}/
│       ├── photo-1-{timestamp}.jpg
│       └── photo-2-{timestamp}.jpg
├── incidents/
│   └── {incident-id}/
│       └── photo-{timestamp}.jpg
└── users/
    └── avatars/
        └── {user-id}.jpg
```

## 🔧 Configuration

All configuration is managed through environment variables in `.env` file.

### Key Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - API port (default: 3000)
- `DB_*` - PostgreSQL connection
- `REDIS_*` - Redis connection
- `JWT_*` - JWT token secrets and expiration
- `UPLOAD_DIR` - File upload directory

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## 📦 Docker

### Build & Run

```bash
# Build image
docker build -t aristay-api:latest .

# Run container
docker run -p 3000:3000 --env-file .env aristay-api:latest
```

### Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

## 🚨 Error Handling

API returns consistent error responses:

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "BadRequest"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 📝 Logging

Application logs are configured with Winston and are printed to console in development.

Log levels: `debug`, `info`, `warn`, `error`

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/AmazingFeature`
2. Commit changes: `git commit -m 'Add AmazingFeature'`
3. Push to branch: `git push origin feature/AmazingFeature`
4. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💼 Support

For issues and questions, please open an issue on GitHub.

---

**Version:** 0.0.1  
**Status:** Development
