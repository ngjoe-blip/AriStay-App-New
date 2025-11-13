import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { taskService } from '../services/task.service';
import { Navbar } from '../components/Navbar';

export const Dashboard = () => {
  const [filters, setFilters] = useState({ status: 'Pending', type: '' });

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => taskService.getTasks(filters),
  });

  const statusColors: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'InProgress': 'bg-blue-100 text-blue-700',
    'Completed': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
    'Overdue': 'bg-orange-100 text-orange-700',
  };

  const typeColors: Record<string, string> = {
    'Cleaning': 'bg-purple-100 text-purple-700',
    'Maintenance': 'bg-red-100 text-red-700',
    'Laundry': 'bg-blue-100 text-blue-700',
    'LawnPool': 'bg-green-100 text-green-700',
    'ToDo': 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>

          <div className="mb-4 flex gap-4">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Types</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Laundry">Laundry</option>
              <option value="LawnPool">Lawn/Pool</option>
            </select>
          </div>

          {isLoading ? (
            <p className="text-gray-600">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-600">No tasks found</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <div className="flex gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full ${statusColors[task.status] || 'bg-gray-100'}`}>
                        {task.status}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full ${typeColors[task.type] || 'bg-gray-100'}`}>
                        {task.type}
                      </span>
                    </div>
                  </div>
                  {task.description && (
                    <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                  )}
                  {task.due_date && (
                    <p className="text-xs text-gray-500">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
