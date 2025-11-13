# AriStay Complete Setup Guide

## Overview

AriStay là một ứng dụng quản lý tài sản cho thuê (Property Management System) được xây dựng với:
- **Backend**: NestJS + PostgreSQL + Redis + Docker
- **Frontend**: React + TypeScript + Tailwind CSS
- **Infrastructure**: Docker Compose để dễ dàng deploy

## Cấu Trúc Thư Mục

```
AriStay-App/
├── aristay-api/        # Backend NestJS
├── aristay-web/        # Frontend React
├── docker-compose.yml  # Docker configuration
├── ARCHITECTURE.md     # Architecture documentation
└── FRONTEND_GUIDE.md   # Frontend guide
```

## Yêu Cầu

- Docker & Docker Compose
- Node.js 18+ (nếu chạy locally không dùng Docker)
- npm hoặc yarn

## Cách 1: Chạy với Docker Compose (Recommended)

### 1. Xác nhận file docker-compose.yml

Điều chỉnh các biến môi trường nếu cần:

```bash
cd /workspaces/AriStay-App
```

### 2. Start tất cả các services

```bash
docker-compose up -d
```

Services sẽ chạy:
- **PostgreSQL**: `localhost:5432` (Database)
- **Redis**: `localhost:6379` (Cache)
- **NestJS API**: `localhost:3000` (Backend)

### 3. Check logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f aristay-api
docker-compose logs -f postgres
docker-compose logs -f redis
```

### 4. Stop services

```bash
docker-compose down
```

### 5. Stop and remove volumes (clean slate)

```bash
docker-compose down -v
```

## Cách 2: Chạy Backend Manually

### 1. Navigate to backend

```bash
cd /workspaces/AriStay-App/aristay-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup database

```bash
# Start PostgreSQL and Redis (if not using Docker Compose)
# Or ensure they're running on the correct ports
```

### 4. Create .env file

```bash
cat > .env << EOF
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=aristay_user
DATABASE_PASSWORD=aristay_password
DATABASE_NAME=aristay_db
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_here
REDIS_HOST=localhost
REDIS_PORT=6379
STORAGE_PATH=/uploads
NODE_ENV=development
EOF
```

### 5. Start development server

```bash
npm run start:dev
```

Backend will start at `http://localhost:3000`

### 6. Build for production

```bash
npm run build
```

## Cách 3: Chạy Frontend Manually

### 1. Navigate to frontend

```bash
cd /workspaces/AriStay-App/aristay-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create .env file

```bash
cat > .env << EOF
VITE_API_URL=http://localhost:3000/api
EOF
```

### 4. Start development server

```bash
npm run dev
```

Frontend will start at `http://localhost:5173`

### 5. Build for production

```bash
npm run build
```

Output will be in `dist/` folder

## Quick Start (All Services)

### Terminal 1 - Backend

```bash
cd /workspaces/AriStay-App/aristay-api
npm install
npm run start:dev
```

### Terminal 2 - Frontend

```bash
cd /workspaces/AriStay-App/aristay-web
npm install
npm run dev
```

### Terminal 3 - Database (if not using Docker)

```bash
# PostgreSQL
docker run --rm -e POSTGRES_PASSWORD=aristay_password \
  -e POSTGRES_USER=aristay_user \
  -e POSTGRES_DB=aristay_db \
  -p 5432:5432 postgres:16

# Redis
docker run --rm -p 6379:6379 redis:7
```

## Testing the Application

### 1. Open Frontend

Navigate to: `http://localhost:5173`

### 2. Register New Account

- Click "Register"
- Fill in:
  - Full Name: John Doe
  - Email: john@example.com
  - Phone: +1-555-0123
  - Password: SecurePassword123!
- Click "Register"

### 3. Login

- Use credentials from registration
- You'll be redirected to Dashboard

### 4. Navigate Pages

- **Dashboard**: View tasks
- **Properties**: Manage properties
- **Incidents**: Report incidents
- **Inventory**: Manage inventory
- **Laundry**: Track laundry orders

## API Documentation

### Base URL

```
http://localhost:3000/api
```

### Key Endpoints

#### Authentication

```bash
# Register
POST /auth/register
{
  "email": "user@example.com",
  "password": "password",
  "full_name": "John Doe",
  "phone": "+1-555-0123"
}

# Login
POST /auth/login
{
  "email": "user@example.com",
  "password": "password"
}

# Refresh Token
POST /auth/refresh
```

#### Tasks

```bash
# Get all tasks
GET /tasks

# Get task by ID
GET /tasks/:id

# Create task
POST /tasks
{
  "title": "Fix door lock",
  "description": "Main entrance",
  "type": "maintenance",
  "priority": "high",
  "assigned_to": "user_id"
}

# Update task
PATCH /tasks/:id
```

#### Properties

```bash
# Get all properties
GET /properties

# Create property
POST /properties
{
  "name": "Apartment 101",
  "address": "123 Main St",
  "city": "New York",
  "units": 5
}
```

#### Incidents

```bash
# Get all incidents
GET /incidents

# Create incident
POST /incidents
{
  "title": "Water leak",
  "description": "Bathroom leak",
  "type": "maintenance",
  "priority": "urgent"
}
```

#### Inventory

```bash
# Get all items
GET /inventory

# Create item
POST /inventory
{
  "name": "Bed Sheets",
  "category": "linens",
  "quantity": 50,
  "unit": "sets"
}
```

#### Laundry

```bash
# Get all orders
GET /laundry/orders

# Create order
POST /laundry/orders
{
  "service_type": "wash_dry",
  "items_count": 15,
  "pickup_date": "2024-01-15",
  "delivery_date": "2024-01-17"
}
```

## Database Schema

### Users Table
- id: UUID
- email: String (unique)
- password: String (hashed)
- full_name: String
- phone: String
- role: Enum (Admin, Cleaning, Maintenance, Laundry, LawnPool)
- created_at: DateTime
- updated_at: DateTime

### Properties Table
- id: UUID
- name: String
- address: String
- city: String
- state: String
- zip_code: String
- units: Integer
- created_at: DateTime
- updated_at: DateTime

### Tasks Table
- id: UUID
- title: String
- description: String
- type: Enum (Maintenance, Cleaning, Laundry, etc.)
- priority: Enum (Low, Medium, High, Urgent)
- status: Enum (Pending, InProgress, Completed, Cancelled, Overdue)
- assigned_to: UUID (User)
- property_id: UUID (Property)
- created_at: DateTime
- updated_at: DateTime

## Troubleshooting

### Backend won't start

```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed
kill -9 <PID>

# Check database connection
# Ensure PostgreSQL is running and credentials match
```

### Frontend won't connect to backend

```bash
# Check API URL in .env
VITE_API_URL=http://localhost:3000/api

# Check backend logs for CORS issues
docker-compose logs aristay-api

# Test API endpoint
curl http://localhost:3000/api
```

### Database connection failed

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check credentials in .env match docker-compose.yml
# Default: user=aristay_user, password=aristay_password, db=aristay_db
```

### Port already in use

```bash
# Frontend (5173)
lsof -i :5173
kill -9 <PID>

# Backend (3000)
lsof -i :3000
kill -9 <PID>

# PostgreSQL (5432)
lsof -i :5432
kill -9 <PID>
```

## Environment Variables

### Backend (.env)

```env
# Database
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=aristay_user
DATABASE_PASSWORD=aristay_password
DATABASE_NAME=aristay_db

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Storage
STORAGE_PATH=/uploads
MAX_FILE_SIZE=10485760  # 10MB

# Node
NODE_ENV=development
PORT=3000
```

### Frontend (.env)

```env
# API
VITE_API_URL=http://localhost:3000/api
```

## Production Deployment

### Build Backend

```bash
cd aristay-api
npm run build
```

### Build Frontend

```bash
cd aristay-web
npm run build
```

### Docker Production Build

```bash
# Build and push to registry
docker build -t aristay-api:latest ./aristay-api
docker build -t aristay-web:latest ./aristay-web

# Or use docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

## Performance Monitoring

### Database Connections

```bash
# Check active connections
docker exec -it aristay-api psql -U aristay_user -d aristay_db -c \
  "SELECT count(*) FROM pg_stat_activity;"
```

### API Response Times

Check browser DevTools → Network tab for response times

### Redis Cache

```bash
# Monitor Redis
docker exec -it aristay-redis redis-cli MONITOR
```

## Security Checklist

- [ ] Change default database credentials
- [ ] Update JWT secrets
- [ ] Enable HTTPS in production
- [ ] Setup CORS properly for production domain
- [ ] Use environment-specific configs
- [ ] Enable database backups
- [ ] Setup monitoring and logging
- [ ] Regular security updates for dependencies

## Support & Documentation

- Backend: See `aristay-api/README.md`
- Frontend: See `FRONTEND_GUIDE.md`
- Architecture: See `ARCHITECTURE.md`

## License

All rights reserved.
