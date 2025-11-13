# AriStay Quick Reference

## 🚀 Start in 3 Steps

```bash
# Step 1: Backend (Terminal 1)
cd aristay-api && npm install && npm run start:dev

# Step 2: Frontend (Terminal 2)
cd aristay-web && npm install && npm run dev

# Step 3: Open Browser
# Frontend: http://localhost:5173
# Backend: http://localhost:3000/api
```

## 📂 File Structure

```
aristay-web/src/
├── pages/          7 pages (Login, Register, Dashboard, Properties, Incidents, Inventory, Laundry)
├── components/     2 components (ProtectedRoute, Navbar)
├── services/       7 services (api, auth, task, property, incident, inventory, laundry)
├── types/          7 type files (auth, task, property, incident, inventory, laundry)
├── store/          1 Zustand store (auth.store.ts)
├── App.tsx         Main app with routing
├── main.tsx        Entry point
├── index.css       Tailwind directives
└── App.css         App styles
```

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `App.tsx` | Main routing and QueryClient setup |
| `store/auth.store.ts` | Global auth state (Zustand) |
| `services/api.ts` | Axios client with interceptors |
| `components/ProtectedRoute.tsx` | Route protection |
| `components/Navbar.tsx` | Navigation header |

## 🎯 Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/login` | Login.tsx | User authentication |
| `/register` | Register.tsx | New user signup |
| `/dashboard` | Dashboard.tsx | Task management |
| `/properties` | Properties.tsx | Property CRUD |
| `/incidents` | Incidents.tsx | Incident reporting |
| `/inventory` | Inventory.tsx | Stock management |
| `/laundry` | Laundry.tsx | Order tracking |

## 🔐 Authentication Flow

1. User registers/logs in
2. Backend returns JWT tokens
3. Tokens stored in localStorage
4. Zustand store updated
5. Auto-redirect to Dashboard
6. On 401: Auto-refresh token
7. Logout clears all tokens

## 📡 API Services

```typescript
// Each service has full CRUD:
authService.login(email, password)
taskService.getTasks()
propertyService.getProperties()
incidentService.getIncidents()
inventoryService.getInventoryItems()
laundryService.getLaundryOrders()
```

## 🎨 Tailwind Colors

```css
Primary: #3B82F6 (blue-500)
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
```

## 📦 Dependencies

```json
{
  "React": "18.3.1",
  "TypeScript": "5.9.3",
  "Vite": "7.2.2",
  "Tailwind CSS": "4.0.2",
  "React Router": "7.0.0",
  "Zustand": "4.5.5",
  "React Query": "6.0.0",
  "Axios": "1.7.7"
}
```

## 🛠️ Commands

```bash
# Development
npm run dev              # Start dev server (localhost:5173)
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint

# Backend
npm run start:dev       # Start dev server (localhost:3000)
npm run build           # Build project
npm run start           # Start production
```

## 🌐 Environment Variables

```env
# Frontend (.env)
VITE_API_URL=http://localhost:3000/api

# Backend (.env)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=aristay_user
DATABASE_PASSWORD=aristay_password
DATABASE_NAME=aristay_db
JWT_SECRET=your_secret
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 🐳 Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔗 API Endpoints

```
Base: http://localhost:3000/api

Auth:
- POST /auth/register
- POST /auth/login
- POST /auth/refresh

Tasks:
- GET /tasks
- POST /tasks
- PATCH /tasks/:id

Properties:
- GET /properties
- POST /properties
- PATCH /properties/:id

Incidents:
- GET /incidents
- POST /incidents
- PATCH /incidents/:id

Inventory:
- GET /inventory
- POST /inventory
- PATCH /inventory/:id

Laundry:
- GET /laundry/orders
- POST /laundry/orders
- PATCH /laundry/orders/:id
```

## 🐛 Troubleshooting

### Frontend won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### API not responding
```bash
# Check backend is running
curl http://localhost:3000/api

# Check .env has correct URL
cat .env | grep VITE_API_URL

# Check backend logs
docker-compose logs aristay-api
```

### Build fails
```bash
# Check TypeScript
npm run tsc -b

# Check for errors
npm run build -- --verbose
```

### Port conflicts
```bash
# Find process using port
lsof -i :5173  # Frontend
lsof -i :3000  # Backend

# Kill process
kill -9 <PID>
```

## 📊 Build Output

```
index.html:        0.46 kB (gzip: 0.29 kB)
assets/index.css:  4.42 kB (gzip: 1.27 kB)
assets/index.js:   329.43 kB (gzip: 102.74 kB)

Total: ~334 kB (gzipped: ~104 kB)
Build time: ~2.7s
Modules: 155 transformed
```

## 🎓 Learning Resources

- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs/
- Tailwind CSS: https://tailwindcss.com/docs
- React Router: https://reactrouter.com/docs
- Zustand: https://github.com/pmndrs/zustand
- React Query: https://tanstack.com/query/latest
- Axios: https://axios-http.com/docs/intro

## 🚢 Deployment

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ to Netlify
```

### Docker
```bash
docker build -t aristay-web:latest .
docker run -p 80:5173 aristay-web:latest
```

### Traditional Server
```bash
npm run build
# Copy dist/ to /var/www/html
# Configure Nginx/Apache
```

## 💾 Database

```sql
-- Connect to PostgreSQL
psql -h localhost -U aristay_user -d aristay_db

-- View tables
\dt

-- View users
SELECT * FROM "user";

-- View tasks
SELECT * FROM task;
```

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request
# ...

# Merge to main
git checkout main
git merge feature/new-feature
git push origin main
```

## 📞 Support

- Frontend Guide: See `FRONTEND_GUIDE.md`
- Setup Guide: See `COMPLETE_SETUP_GUIDE.md`
- Architecture: See `ARCHITECTURE.md`
- Issues: Check GitHub/GitLab issues

## ✅ Checklist

- [ ] Backend running on :3000
- [ ] Frontend running on :5173
- [ ] Database connected
- [ ] Can register new user
- [ ] Can login
- [ ] Can see Dashboard
- [ ] Can create tasks/properties
- [ ] Logout works correctly

---

**Happy Coding! 🎉**
