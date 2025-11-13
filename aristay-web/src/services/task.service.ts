import api from './api';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/task';

export const taskService = {
  async getTasks(filters?: any) {
    const response = await api.get<Task[]>('/tasks', { params: filters });
    return response.data;
  },

  async getTaskById(id: string) {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  async createTask(data: CreateTaskRequest) {
    const response = await api.post<Task>('/tasks', data);
    return response.data;
  },

  async updateTask(id: string, data: UpdateTaskRequest) {
    const response = await api.patch<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  async updateTaskStatus(id: string, status: string) {
    const response = await api.patch<Task>(`/tasks/${id}/status`, { status });
    return response.data;
  },

  async deleteTask(id: string) {
    await api.delete(`/tasks/${id}`);
  },
};
