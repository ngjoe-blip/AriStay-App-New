import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Navbar } from '../components/Navbar';
import type { LaundryOrder } from '../types/laundry';

export const Laundry = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    service_type: 'wash_dry',
    items_count: 0,
    special_instructions: '',
    pickup_date: '',
    delivery_date: '',
  });

  // Mock laundry orders data
  const { data: orders = [] } = useQuery({
    queryKey: ['laundry_orders'],
    queryFn: async () => {
      return [
        {
          id: 1,
          service_type: 'wash_dry',
          items_count: 15,
          special_instructions: 'Delicate wash only',
          pickup_date: new Date().toISOString(),
          delivery_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'in_progress',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          service_type: 'dry_clean',
          items_count: 5,
          special_instructions: 'Professional cleaning',
          pickup_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          delivery_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'pending',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ] as LaundryOrder[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return { id: orders.length + 1, ...data, status: 'pending' };
    },
    onSuccess: () => {
      setShowForm(false);
      setFormData({ service_type: 'wash_dry', items_count: 0, special_instructions: '', pickup_date: '', delivery_date: '' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceLabel = (type: string) => {
    switch (type) {
      case 'wash_dry':
        return 'Wash & Dry';
      case 'dry_clean':
        return 'Dry Clean';
      case 'iron':
        return 'Iron Only';
      case 'stain_removal':
        return 'Stain Removal';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Laundry Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            {showForm ? 'Cancel' : 'New Order'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.service_type}
                onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="wash_dry">Wash & Dry</option>
                <option value="dry_clean">Dry Clean</option>
                <option value="iron">Iron Only</option>
                <option value="stain_removal">Stain Removal</option>
              </select>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Number of Items</label>
                <input
                  type="number"
                  value={formData.items_count}
                  onChange={(e) => setFormData({ ...formData, items_count: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Pickup Date</label>
                <input
                  type="date"
                  value={formData.pickup_date}
                  onChange={(e) => setFormData({ ...formData, pickup_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Delivery Date</label>
                <input
                  type="date"
                  value={formData.delivery_date}
                  onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>
            <textarea
              placeholder="Special Instructions"
              value={formData.special_instructions}
              onChange={(e) => setFormData({ ...formData, special_instructions: e.target.value })}
              className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
            />
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {createMutation.isPending ? 'Creating...' : 'Create Order'}
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{getServiceLabel(order.service_type)}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">Items: {order.items_count}</p>
                  {order.special_instructions && (
                    <p className="text-gray-600 mt-1">Instructions: {order.special_instructions}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900">Pickup</p>
                  <p>{new Date(order.pickup_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Delivery</p>
                  <p>{new Date(order.delivery_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
