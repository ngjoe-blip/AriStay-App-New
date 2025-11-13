export interface LaundryOrder {
  id: number;
  service_type: 'wash_dry' | 'dry_clean' | 'iron' | 'stain_removal';
  items_count: number;
  special_instructions?: string;
  pickup_date: string;
  delivery_date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at?: string;
}

export interface CreateLaundryOrderRequest {
  service_type: 'wash_dry' | 'dry_clean' | 'iron' | 'stain_removal';
  items_count: number;
  special_instructions?: string;
  pickup_date: string;
  delivery_date: string;
}

export interface UpdateLaundryOrderRequest {
  service_type?: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  special_instructions?: string;
}
