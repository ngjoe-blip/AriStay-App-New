import api from './api';
import type { LaundryOrder, CreateLaundryOrderRequest, UpdateLaundryOrderRequest } from '../types/laundry';

export const laundryService = {
  // Get all laundry orders
  async getLaundryOrders() {
    const response = await api.get<LaundryOrder[]>('/laundry/orders');
    return response.data;
  },

  // Get laundry order by ID
  async getLaundryOrderById(id: number) {
    const response = await api.get<LaundryOrder>(`/laundry/orders/${id}`);
    return response.data;
  },

  // Create laundry order
  async createLaundryOrder(data: CreateLaundryOrderRequest) {
    const response = await api.post<LaundryOrder>('/laundry/orders', data);
    return response.data;
  },

  // Update laundry order
  async updateLaundryOrder(id: number, data: UpdateLaundryOrderRequest) {
    const response = await api.patch<LaundryOrder>(`/laundry/orders/${id}`, data);
    return response.data;
  },

  // Delete laundry order
  async deleteLaundryOrder(id: number) {
    const response = await api.delete(`/laundry/orders/${id}`);
    return response.data;
  },

  // Get orders by status
  async getLaundryOrdersByStatus(status: string) {
    const response = await api.get<LaundryOrder[]>(`/laundry/orders?status=${status}`);
    return response.data;
  },
};
