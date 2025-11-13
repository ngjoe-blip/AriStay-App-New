export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  min_stock: number;
  created_at: string;
  updated_at?: string;
}

export interface CreateInventoryItemRequest {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  min_stock: number;
}

export interface UpdateInventoryItemRequest {
  name?: string;
  quantity?: number;
  location?: string;
  min_stock?: number;
}
