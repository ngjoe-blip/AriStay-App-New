export interface Property {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  description?: string;
  status: 'Active' | 'Inactive' | 'Archived';
  created_at: string;
  updated_at: string;
}

export interface Unit {
  id: string;
  property_id: string;
  unit_number: string;
  floor?: number;
  bedrooms?: number;
  bathrooms?: number;
  status: 'Ready' | 'Occupied' | 'Maintenance' | 'Blocked';
  created_at: string;
  updated_at: string;
}
