import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Navbar } from '../components/Navbar';
import type { InventoryItem } from '../types/inventory';

export const Inventory = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    unit: 'pcs',
    location: '',
    min_stock: 0,
  });

  // Mock inventory data
  const { data: items = [] } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      return [
        {
          id: 1,
          name: 'Bed Sheets',
          category: 'linens',
          quantity: 50,
          unit: 'sets',
          location: 'Storage Room A',
          min_stock: 20,
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Cleaning Supplies',
          category: 'cleaning',
          quantity: 100,
          unit: 'liters',
          location: 'Storage Room B',
          min_stock: 30,
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: 'Toiletries',
          category: 'toiletries',
          quantity: 5,
          unit: 'boxes',
          location: 'Storage Room A',
          min_stock: 10,
          created_at: new Date().toISOString(),
        },
      ] as InventoryItem[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return { id: items.length + 1, ...data };
    },
    onSuccess: () => {
      setShowForm(false);
      setFormData({ name: '', category: '', quantity: 0, unit: 'pcs', location: '', min_stock: 0 });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity < minStock) {
      return { text: 'Low Stock', color: 'bg-red-100 text-red-800' };
    }
    if (quantity < minStock * 1.5) {
      return { text: 'Warning', color: 'bg-yellow-100 text-yellow-800' };
    }
    return { text: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            {showForm ? 'Cancel' : 'Add Item'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Item Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select Category</option>
                <option value="linens">Linens</option>
                <option value="cleaning">Cleaning</option>
                <option value="toiletries">Toiletries</option>
                <option value="furniture">Furniture</option>
                <option value="equipment">Equipment</option>
                <option value="other">Other</option>
              </select>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="pcs">Pieces</option>
                <option value="sets">Sets</option>
                <option value="liters">Liters</option>
                <option value="boxes">Boxes</option>
                <option value="kg">Kilograms</option>
              </select>
              <input
                type="text"
                placeholder="Storage Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <div>
                <label className="block text-sm text-gray-700 mb-1">Minimum Stock Level</label>
                <input
                  type="number"
                  value={formData.min_stock}
                  onChange={(e) => setFormData({ ...formData, min_stock: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {createMutation.isPending ? 'Adding...' : 'Add Item'}
            </button>
          </form>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Item Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const status = getStockStatus(item.quantity, item.min_stock);
                return (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.color}`}>
                        {status.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
