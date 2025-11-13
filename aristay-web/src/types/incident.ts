export interface Incident {
  id: number;
  title: string;
  description: string;
  type: 'maintenance' | 'cleaning' | 'safety' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'resolved' | 'cancelled';
  property_id: string;
  assigned_to?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateIncidentRequest {
  title: string;
  description: string;
  type: 'maintenance' | 'cleaning' | 'safety' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  property_id: string;
}

export interface UpdateIncidentRequest {
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  status?: 'pending' | 'in_progress' | 'resolved' | 'cancelled';
  assigned_to?: string;
}
