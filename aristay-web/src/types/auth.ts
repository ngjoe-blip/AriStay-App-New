export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'Admin' | 'Cleaning' | 'Maintenance' | 'Laundry' | 'LawnPool';
  status: 'Active' | 'Inactive';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  role?: string;
}
