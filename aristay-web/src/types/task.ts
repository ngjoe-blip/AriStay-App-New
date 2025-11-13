export interface Task {
  id: string;
  unit_id?: string;
  assignee_id?: string;
  title: string;
  description?: string;
  type: 'Cleaning' | 'Maintenance' | 'Laundry' | 'LawnPool' | 'ToDo';
  status: 'Pending' | 'InProgress' | 'Completed' | 'Cancelled' | 'Overdue';
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskRequest {
  unit_id?: string;
  assignee_id?: string;
  title: string;
  description?: string;
  type: string;
  due_date?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: string;
  due_date?: string;
}
