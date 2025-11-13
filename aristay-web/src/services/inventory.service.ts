import api from './api';
import type { InventoryItem, CreateInventoryItemRequest, UpdateInventoryItemRequest } from '../types/inventory';

export const inventoryService = {
  // Get all inventory items
  async getInventoryItems() {
    const response = await api.get<InventoryItem[]>('/inventory');
    return response.data;
  },

  // Get inventory item by ID
  async getInventoryItemById(id: number) {
    const response = await api.get<InventoryItem>(`/inventory/${id}`);
    return response.data;
  },

  // Create inventory item
  async createInventoryItem(data: CreateInventoryItemRequest) {
    const response = await api.post<InventoryItem>('/inventory', data);
    return response.data;
  },

  // Update inventory item
  async updateInventoryItem(id: number, data: UpdateInventoryItemRequest) {
    const response = await api.patch<InventoryItem>(`/inventory/${id}`, data);
    return response.data;
  },

  // Delete inventory item
  async deleteInventoryItem(id: number) {
    const response = await api.delete(`/inventory/${id}`);
    return response.data;
  },

  // Get items by category
  async getInventoryItemsByCategory(category: string) {
    const response = await api.get<InventoryItem[]>(`/inventory?category=${category}`);
    return response.data;
  },

  // Get low stock items
  async getLowStockItems() {
    const response = await api.get<InventoryItem[]>('/inventory?low_stock=true');
    return response.data;
  },

  // Update quantity
  async updateInventoryQuantity(id: number, quantity: number) {
    const response = await api.patch<InventoryItem>(`/inventory/${id}`, { quantity });
    return response.data;
  },
};
