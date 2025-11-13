import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Navbar } from '../components/Navbar';
import type { Incident } from '../types/incident';

export const Incidents = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'maintenance',
    priority: 'medium',
    property_id: '',
  });

  // Mock incidents data
  const { data: incidents = [] } = useQuery({
    queryKey: ['incidents'],
    queryFn: async () => {
      // In production, replace with actual API call
      return [
        {
          id: 1,
          title: 'Broken Door Lock',
          description: 'Main entrance lock is broken',
          type: 'maintenance',
          priority: 'high',
          status: 'pending',
          property_id: 'prop-1',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: 'Water Leak',
          description: 'Leak detected in bathroom',
          type: 'maintenance',
          priority: 'urgent',
          status: 'in_progress',
          property_id: 'prop-2',
          created_at: new Date().toISOString(),
        },
      ] as Incident[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // Mock API call
      return { id: incidents.length + 1, ...data, status: 'pending' };
    },
    onSuccess: () => {
      setShowForm(false);
      setFormData({ title: '', description: '', type: 'maintenance', priority: 'medium', property_id: '' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Incidents</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            {showForm ? 'Cancel' : 'Report Incident'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Incident Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="maintenance">Maintenance</option>
                <option value="cleaning">Cleaning</option>
                <option value="safety">Safety</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Property ID"
                value={formData.property_id}
                onChange={(e) => setFormData({ ...formData, property_id: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={4}
              required
            />
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {createMutation.isPending ? 'Submitting...' : 'Submit Incident'}
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 gap-6">
          {incidents.map((incident) => (
            <div key={incident.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
                  <p className="text-gray-600 mt-1">{incident.description}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getPriorityColor(incident.priority)}`}>
                    {incident.priority.toUpperCase()}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(incident.status)}`}>
                    {incident.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Property: {incident.property_id}</span>
                <span>{new Date(incident.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
