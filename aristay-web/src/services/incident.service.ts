import api from './api';
import type { Incident, CreateIncidentRequest, UpdateIncidentRequest } from '../types/incident';

export const incidentService = {
  // Get all incidents
  async getIncidents() {
    const response = await api.get<Incident[]>('/incidents');
    return response.data;
  },

  // Get incident by ID
  async getIncidentById(id: number) {
    const response = await api.get<Incident>(`/incidents/${id}`);
    return response.data;
  },

  // Create incident
  async createIncident(data: CreateIncidentRequest) {
    const response = await api.post<Incident>('/incidents', data);
    return response.data;
  },

  // Update incident
  async updateIncident(id: number, data: UpdateIncidentRequest) {
    const response = await api.patch<Incident>(`/incidents/${id}`, data);
    return response.data;
  },

  // Delete incident
  async deleteIncident(id: number) {
    const response = await api.delete(`/incidents/${id}`);
    return response.data;
  },

  // Get incidents by priority
  async getIncidentsByPriority(priority: string) {
    const response = await api.get<Incident[]>(`/incidents?priority=${priority}`);
    return response.data;
  },

  // Get incidents by status
  async getIncidentsByStatus(status: string) {
    const response = await api.get<Incident[]>(`/incidents?status=${status}`);
    return response.data;
  },

  // Update incident status
  async updateIncidentStatus(id: number, status: string) {
    const response = await api.patch<Incident>(`/incidents/${id}`, { status });
    return response.data;
  },
};
