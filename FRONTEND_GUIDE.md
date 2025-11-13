# AriStay Frontend Guide

## Overview

AriStay frontend là một ứng dụng React + TypeScript hiện đại, được xây dựng với Vite, Tailwind CSS, React Router, Zustand, và React Query.

## Cấu trúc Dự án

```
aristay-web/
├── src/
│   ├── pages/          # Các trang chính
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Properties.tsx
│   │   ├── Incidents.tsx
│   │   ├── Inventory.tsx
│   │   └── Laundry.tsx
│   ├── components/     # Các component tái sử dụng
│   │   ├── Navbar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── services/       # API services
│   │   ├── api.ts                # Axios client with interceptors
│   │   ├── auth.service.ts       # Authentication API
│   │   ├── task.service.ts       # Task management API
│   │   ├── property.service.ts   # Property management API
│   │   ├── incident.service.ts   # Incident management API
│   │   ├── inventory.service.ts  # Inventory management API
│   │   └── laundry.service.ts    # Laundry management API
│   ├── store/         # State management (Zustand)
│   │   └── auth.store.ts
│   ├── types/         # TypeScript interfaces
│   │   ├── auth.ts
│   │   ├── property.ts
│   │   ├── task.ts
│   │   ├── incident.ts
│   │   ├── inventory.ts
│   │   └── laundry.ts
│   ├── App.tsx        # Main app with routing
│   ├── main.tsx       # Entry point
│   ├── App.css
│   └── index.css
├── public/
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
├── package.json
└── index.html
```

## Công Nghệ Sử Dụng

- **React 18**: JavaScript UI library
- **TypeScript**: Type-safe JavaScript
- **Vite 7.2**: Fast build tool and dev server
- **Tailwind CSS v4**: Utility-first CSS framework
- **React Router v7**: Client-side routing
- **Zustand**: Lightweight state management
- **React Query**: Server state management
- **Axios**: HTTP client with interceptors

## Cài Đặt

### 1. Clone repo (nếu chưa có)
```bash
cd /workspaces/AriStay-App/aristay-web
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Tạo file `.env`
```bash
VITE_API_URL=http://localhost:3000/api
```

## Chạy Ứng Dụng

### Development Server
```bash
npm run dev
```
Ứng dụng sẽ chạy tại: `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Output sẽ được tạo trong folder `dist/`

### Preview Production Build
```bash
npm run preview
```

## Các Trang Chính

### 1. **Login Page** (`/login`)
- Đăng nhập bằng email và password
- Tự động redirect đến Dashboard sau khi đăng nhập thành công
- Có link để chuyển sang Register page

### 2. **Register Page** (`/register`)
- Đăng ký tài khoản mới
- Các trường: full_name, email, phone, password
- Tự động redirect đến Login page sau khi đăng ký thành công

### 3. **Dashboard** (`/dashboard`)
- Hiển thị danh sách tasks với filtering
- Status filter: Pending, In Progress, Completed, Cancelled, Overdue
- Type filter: Maintenance, Cleaning, etc.
- Sử dụng React Query để fetch dữ liệu

### 4. **Properties** (`/properties`)
- Quản lý properties (CRUD)
- Hiển thị danh sách properties dưới dạng grid
- Form để tạo/chỉnh sửa properties
- Hiển thị status của property

### 5. **Incidents** (`/incidents`)
- Báo cáo incidents
- Phân loại theo priority (Low, Medium, High, Urgent)
- Phân loại theo type (Maintenance, Cleaning, Safety, Other)
- Tracking status (Pending, In Progress, Resolved, Cancelled)

### 6. **Inventory** (`/inventory`)
- Quản lý hàng tồn kho
- Hiển thị dưới dạng bảng
- Stock status: In Stock, Warning, Low Stock
- Các danh mục: Linens, Cleaning, Toiletries, Furniture, Equipment

### 7. **Laundry** (`/laundry`)
- Quản lý đơn giặt ủi
- Các loại dịch vụ: Wash & Dry, Dry Clean, Iron Only, Stain Removal
- Tracking: Pickup date, Delivery date, Status

## Các Component

### ProtectedRoute
- HOC bảo vệ các route yêu cầu authentication
- Kiểm tra `isAuthenticated` từ Zustand store
- Có thể kiểm tra roles (Admin, Cleaning, Maintenance, etc.)
- Redirect đến `/login` nếu chưa đăng nhập

### Navbar
- Hiển thị tên người dùng và role
- Các link điều hướng: Dashboard, Properties, Incidents, Inventory, Laundry
- Nút Logout

## State Management (Zustand)

### Auth Store (`src/store/auth.store.ts`)
```typescript
const { 
  user,              // User object
  isAuthenticated,   // Boolean
  isLoading,         // Boolean
  login,             // Function
  register,          // Function
  logout,            // Function
  setUser,           // Function
  loadUserFromStorage // Function
} = useAuthStore();
```

## API Integration

### Axios Client (`src/services/api.ts`)
- Automatic JWT token injection in request headers
- Token refresh interceptor on 401 responses
- Error handling with proper redirect to login

### Services
Mỗi module có service riêng với đầy đủ CRUD operations:
- `auth.service.ts`: login, register, refresh, logout
- `task.service.ts`: getTasks, createTask, updateTask, updateTaskStatus, deleteTask
- `property.service.ts`: getProperties, createProperty, updateProperty, deleteProperty
- `incident.service.ts`: getIncidents, createIncident, updateIncident, deleteIncident
- `inventory.service.ts`: getInventoryItems, createInventoryItem, updateInventoryItem
- `laundry.service.ts`: getLaundryOrders, createLaundryOrder, updateLaundryOrder

## Styling

### Tailwind CSS
- Primary color: Customized in `tailwind.config.ts`
- Responsive design with mobile-first approach
- Utility classes for rapid UI development

### Custom Classes
- `.btn-primary`: Primary button styling
- `.card`: Card component styling
- `.form-input`: Form input styling

## TypeScript

- Strict mode enabled
- Type imports using `import type` syntax
- All components and services have proper types
- Interface definitions in `src/types/` directory

## Environment Variables

```env
# API endpoint
VITE_API_URL=http://localhost:3000/api
```

## Development Tips

1. **Hot Module Replacement (HMR)**: Changes are instantly reflected in browser
2. **React DevTools**: Use React DevTools browser extension for debugging
3. **Zustand DevTools**: Monitor state changes
4. **Network Tab**: Check API calls and responses

## Build Output

Production build creates optimized files:
- HTML: 0.46 kB (gzip: 0.29 kB)
- CSS: 4.42 kB (gzip: 1.27 kB)
- JavaScript: 329.43 kB (gzip: 102.74 kB)

## Troubleshooting

### Build fails with TypeScript errors
- Check `tsconfig.json` configuration
- Ensure all imports use `import type` for type-only imports
- Run `npm run build` to see detailed errors

### API not responding
- Ensure backend is running on `http://localhost:3000`
- Check `.env` file has correct `VITE_API_URL`
- Check browser Network tab for CORS errors

### State not persisting
- Check localStorage in browser DevTools
- Verify `loadUserFromStorage()` is called on app mount
- Check `localStorage.setItem()` and `localStorage.getItem()` calls

## Next Steps

1. Start backend server: `docker-compose up -d` (in aristay-api folder)
2. Start frontend dev server: `npm run dev`
3. Open browser and navigate to `http://localhost:5173`
4. Login with credentials created in backend

## Performance

- Code splitting with Vite
- Lazy loading of routes (optional)
- React Query caching for API responses
- Optimized build with tree-shaking
- CSS purging in production build

## Security

- JWT token stored in localStorage (consider upgrading to httpOnly cookies)
- Automatic token refresh on 401 responses
- Protected routes with role-based access control
- CORS enabled on backend for frontend origin

## Support

For issues and questions, check:
1. Backend logs: `docker logs aristay-api`
2. Frontend console: F12 → Console tab
3. Network requests: F12 → Network tab
4. Zustand state: React DevTools or console
