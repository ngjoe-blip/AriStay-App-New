import api from './api';
import type { Property, Unit } from '../types/property';

export const propertyService = {
  async getProperties() {
    const response = await api.get<Property[]>('/properties');
    return response.data;
  },

  async getPropertyById(id: string) {
    const response = await api.get<Property>(`/properties/${id}`);
    return response.data;
  },

  async createProperty(data: Partial<Property>) {
    const response = await api.post<Property>('/properties', data);
    return response.data;
  },

  async updateProperty(id: string, data: Partial<Property>) {
    const response = await api.patch<Property>(`/properties/${id}`, data);
    return response.data;
  },

  async deleteProperty(id: string) {
    await api.delete(`/properties/${id}`);
  },

  async getUnitsByProperty(propertyId: string) {
    const response = await api.get<Unit[]>(`/properties/${propertyId}/units`);
    return response.data;
  },

  async getUnitById(id: string) {
    const response = await api.get<Unit>(`/units/${id}`);
    return response.data;
  },
};
