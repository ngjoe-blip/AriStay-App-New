"# 🏠 AriStay - Property Management System

A comprehensive full-stack property management system built with modern web technologies. AriStay helps property managers efficiently manage properties, tasks, incidents, inventory, and laundry services.

## 🎯 Features

### 🔐 Authentication & Security
- User registration and login with JWT authentication
- Role-based access control (Admin, Cleaning, Maintenance, Laundry, LawnPool)
- Automatic token refresh mechanism
- Protected routes and API endpoints
- Password hashing with bcrypt

### 📊 Dashboard
- Real-time task management
- Filter tasks by status and type
- Task status tracking (Pending, In Progress, Completed, Cancelled, Overdue)
- Visual status indicators with color coding

### 🏢 Property Management
- Full CRUD operations for properties
- Multiple units per property
- Property status tracking
- Grid-based property view
- Easy property information management

### 📋 Task Management
- Create and assign tasks
- Priority levels (Low, Medium, High, Urgent)
- Task types (Maintenance, Cleaning, Laundry, etc.)
- Status updates and tracking
- Assignment to staff members

### 🚨 Incident Management
- Report property incidents
- Priority classification (Low, Medium, High, Urgent)
- Incident types (Maintenance, Cleaning, Safety, Other)
- Status tracking (Pending, In Progress, Resolved, Cancelled)
- Detailed descriptions and tracking

### 📦 Inventory Management
- Stock level monitoring
- Low stock alerts
- Multiple item categories (Linens, Cleaning, Toiletries, etc.)
- Storage location tracking
- Minimum stock level configuration

### 👔 Laundry Service Management
- Order creation and tracking
- Multiple service types (Wash & Dry, Dry Clean, Iron, Stain Removal)
- Pickup and delivery scheduling
- Special instructions support
- Status monitoring

## 🏗️ Architecture

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **React Query** - Server state management
- **Axios** - HTTP client with interceptors

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe backend
- **PostgreSQL** - Relational database
- **TypeORM** - ORM for database operations
- **Redis** - Caching and session management
- **BullMQ** - Job queue processing
- **JWT** - Secure authentication
- **Passport** - Authentication middleware

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **PostgreSQL 16** - Database service
- **Redis 7** - Cache service

## 📂 Project Structure

```
AriStay-App/
├── aristay-api/                 # Backend NestJS application
│   ├── src/
│   │   ├── auth/               # Authentication module
│   │   ├── users/              # User management
│   │   ├── properties/         # Property management
│   │   ├── tasks/              # Task management
│   │   ├── incidents/          # Incident management
│   │   ├── inventory/          # Inventory management
│   │   ├── laundry/            # Laundry service
│   │   ├── files/              # File management
│   │   ├── common/             # Shared utilities
│   │   ├── config/             # Configuration files
│   │   ├── database/           # Database setup
│   │   ├── app.module.ts       # Main module
│   │   └── main.ts             # Entry point
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── aristay-web/                 # Frontend React application
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Properties.tsx
│   │   │   ├── Incidents.tsx
│   │   │   ├── Inventory.tsx
│   │   │   └── Laundry.tsx
│   │   ├── components/         # Reusable components
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── Navbar.tsx
│   │   ├── services/           # API services
│   │   │   ├── api.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── task.service.ts
│   │   │   ├── property.service.ts
│   │   │   ├── incident.service.ts
│   │   │   ├── inventory.service.ts
│   │   │   └── laundry.service.ts
│   │   ├── store/              # Zustand state
│   │   │   └── auth.store.ts
│   │   ├── types/              # TypeScript interfaces
│   │   │   ├── auth.ts
│   │   │   ├── task.ts
│   │   │   ├── property.ts
│   │   │   ├── incident.ts
│   │   │   ├── inventory.ts
│   │   │   └── laundry.ts
│   │   ├── App.tsx             # Main app component
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── ARCHITECTURE.md              # System architecture
├── COMPLETE_SETUP_GUIDE.md      # Setup instructions
├── FRONTEND_GUIDE.md            # Frontend guide
├── FRONTEND_SUMMARY.md          # Frontend summary
├── QUICK_REFERENCE.md           # Quick reference
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (optional, for local development)
- npm or yarn

### Option 1: Docker Compose (Recommended)

```bash
# Navigate to project root
cd /workspaces/AriStay-App

# Start all services
docker-compose up -d

# Services will be available at:
# - Frontend: http://localhost:5173
# - Backend: http://localhost:3000
# - Database: localhost:5432
# - Cache: localhost:6379
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd aristay-api

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=aristay_user
DATABASE_PASSWORD=aristay_password
DATABASE_NAME=aristay_db
JWT_SECRET=your_jwt_secret_key
REDIS_HOST=localhost
REDIS_PORT=6379
NODE_ENV=development
EOF

# Start development server
npm run start:dev
```

#### Frontend Setup
```bash
cd aristay-web

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3000/api" > .env

# Start development server
npm run dev
```

#### Database & Cache (if not using Docker)
```bash
# Start PostgreSQL
docker run --rm -e POSTGRES_PASSWORD=aristay_password \
  -e POSTGRES_USER=aristay_user \
  -e POSTGRES_DB=aristay_db \
  -p 5432:5432 postgres:16

# Start Redis (in another terminal)
docker run --rm -p 6379:6379 redis:7
```

## 📖 Usage

### 1. Register a New Account
- Navigate to http://localhost:5173/register
- Fill in your details (name, email, phone, password)
- Click "Register"

### 2. Login
- Go to http://localhost:5173/login
- Enter your email and password
- You'll be redirected to the Dashboard

### 3. Navigate Pages
- **Dashboard** - View and manage tasks
- **Properties** - Create and manage properties
- **Incidents** - Report and track incidents
- **Inventory** - Manage stock items
- **Laundry** - Track laundry orders

## 🔧 Available Commands

### Backend
```bash
cd aristay-api

npm run start        # Start production server
npm run start:dev   # Start development server with auto-reload
npm run build       # Build for production
npm run test        # Run tests
npm run lint        # Run ESLint
```

### Frontend
```bash
cd aristay-web

npm run dev         # Start development server (http://localhost:5173)
npm run build       # Build for production (creates dist/)
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## 🌐 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Authentication
```
POST   /auth/register              Register new user
POST   /auth/login                 Login user
POST   /auth/refresh               Refresh access token
POST   /auth/logout                Logout user
```

### Tasks
```
GET    /tasks                      Get all tasks
GET    /tasks/:id                  Get task by ID
POST   /tasks                      Create new task
PATCH  /tasks/:id                  Update task
DELETE /tasks/:id                  Delete task
```

### Properties
```
GET    /properties                 Get all properties
GET    /properties/:id             Get property by ID
POST   /properties                 Create new property
PATCH  /properties/:id             Update property
DELETE /properties/:id             Delete property
GET    /properties/:id/units       Get units of property
```

### Incidents
```
GET    /incidents                  Get all incidents
GET    /incidents/:id              Get incident by ID
POST   /incidents                  Create new incident
PATCH  /incidents/:id              Update incident
DELETE /incidents/:id              Delete incident
```

### Inventory
```
GET    /inventory                  Get all inventory items
GET    /inventory/:id              Get item by ID
POST   /inventory                  Create new item
PATCH  /inventory/:id              Update item
DELETE /inventory/:id              Delete item
```

### Laundry
```
GET    /laundry/orders             Get all orders
GET    /laundry/orders/:id         Get order by ID
POST   /laundry/orders             Create new order
PATCH  /laundry/orders/:id         Update order
DELETE /laundry/orders/:id         Delete order
```

## 🗄️ Database Schema

### Key Tables

**Users**
- id, email, password, full_name, phone, role, created_at, updated_at

**Properties**
- id, name, address, city, state, zip_code, units, created_at, updated_at

**Tasks**
- id, title, description, type, priority, status, assigned_to, property_id, created_at, updated_at

**Incidents**
- id, title, description, type, priority, status, property_id, created_at, updated_at

**Inventory**
- id, name, category, quantity, unit, location, min_stock, created_at, updated_at

## 🔐 Environment Variables

### Backend (.env)
```env
# Database
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=aristay_user
DATABASE_PASSWORD=aristay_password
DATABASE_NAME=aristay_db

# JWT
JWT_SECRET=your_secure_jwt_secret_key
JWT_REFRESH_SECRET=your_secure_refresh_secret_key
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Server
NODE_ENV=development
PORT=3000

# Storage
STORAGE_PATH=/uploads
MAX_FILE_SIZE=10485760
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5173    # Frontend
lsof -i :3000    # Backend
lsof -i :5432    # Database

# Kill process
kill -9 <PID>
```

### API Connection Issues
```bash
# Check if backend is running
curl http://localhost:3000/api

# Check backend logs
docker-compose logs -f aristay-api

# Verify .env configuration
cat .env | grep VITE_API_URL
```

### Database Connection Failed
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Verify credentials in .env
docker-compose logs postgres
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📊 Monitoring

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f aristay-api
docker-compose logs -f postgres
docker-compose logs -f redis
```

### Database Access
```bash
# Connect to PostgreSQL
psql -h localhost -U aristay_user -d aristay_db

# List tables
\dt

# View specific table
SELECT * FROM "user";
```

## 🚀 Deployment

### Build for Production
```bash
# Backend
cd aristay-api
npm run build

# Frontend
cd aristay-web
npm run build
```

### Docker Deployment
```bash
# Build images
docker build -t aristay-api:latest ./aristay-api
docker build -t aristay-web:latest ./aristay-web

# Or use docker-compose
docker-compose -f docker-compose.yml up -d
```

### Cloud Deployment
- **Vercel**: Deploy frontend (supports Vite)
- **Netlify**: Deploy frontend
- **AWS/Heroku**: Deploy backend
- **AWS RDS/Heroku PostgreSQL**: Host database

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and design
- **[COMPLETE_SETUP_GUIDE.md](./COMPLETE_SETUP_GUIDE.md)** - Detailed setup instructions
- **[FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)** - Frontend development guide
- **[FRONTEND_SUMMARY.md](./FRONTEND_SUMMARY.md)** - Frontend implementation details
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference card

## 📦 Dependencies

### Frontend
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.0.0",
  "typescript": "^5.9.3",
  "vite": "^7.2.2",
  "tailwindcss": "^4.0.2",
  "axios": "^1.7.7",
  "zustand": "^4.5.5",
  "@tanstack/react-query": "^6.0.0"
}
```

### Backend
```json
{
  "@nestjs/common": "^11.0.1",
  "@nestjs/core": "^11.0.1",
  "@nestjs/jwt": "^11.0.0",
  "@nestjs/passport": "^10.0.0",
  "passport-jwt": "^4.0.1",
  "typeorm": "^0.3.27",
  "postgres": "^16.0.0",
  "redis": "^7.0.0",
  "bullmq": "^5.63.1",
  "bcryptjs": "^2.4.3"
}
```

## ✨ Quality Assurance

- ✅ TypeScript Strict Mode
- ✅ Zero Build Errors
- ✅ Type-safe code
- ✅ Responsive design
- ✅ Error handling
- ✅ Input validation
- ✅ Security best practices

## 🤝 Contributing

1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature
   ```

2. Make your changes and commit
   ```bash
   git add .
   git commit -m "Add your feature"
   ```

3. Push to the repository
   ```bash
   git push origin feature/your-feature
   ```

4. Create a Pull Request

## 📝 License

All rights reserved.

## 📞 Support

For issues, questions, or suggestions:
1. Check the documentation in the docs/
2. Review existing issues
3. Create a new issue with details

## 🎉 What's Included

- ✅ Complete user authentication system
- ✅ 7 fully functional pages
- ✅ 7 API services
- ✅ Responsive UI with Tailwind CSS
- ✅ State management with Zustand
- ✅ Server state caching with React Query
- ✅ Protected routes and role-based access
- ✅ Comprehensive API endpoints
- ✅ Docker setup for easy deployment
- ✅ Complete documentation

## 🚀 Next Steps

1. **Start the application**
   ```bash
   docker-compose up -d
   npm run dev  # (in aristay-web)
   ```

2. **Register and login**
   - Navigate to http://localhost:5173
   - Create a new account
   - Explore the dashboard

3. **Customize**
   - Update branding/colors
   - Add more features
   - Configure for your needs

4. **Deploy**
   - Build production images
   - Deploy to your infrastructure
   - Setup monitoring

---

**Built with ❤️ for Property Managers**

Last Updated: November 13, 2025" 
