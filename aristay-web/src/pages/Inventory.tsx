import React from 'react';

// Sample data for inventory
const inventoryItems = [
  { id: 1, name: 'Khăn tắm', category: 'Vải vóc', stock: 150, location: 'Kho chính' },
  { id: 2, name: 'Ga giường (đôi)', category: 'Vải vóc', stock: 100, location: 'Kho chính' },
  { id: 3, name: 'Nước rửa chén', category: 'Hóa chất vệ sinh', stock: 50, location: 'Kho phụ A' },
  { id: 4, name: 'Bóng đèn LED', category: 'Thiết bị điện', stock: 200, location: 'Kho chính' },
  { id: 5, name: 'Xà phòng tắm', category: 'Đồ dùng cá nhân', stock: 300, location: 'Kho phụ B' },
];

const InventoryRow = ({ item }: { item: typeof inventoryItems[0] }) => (
  <tr className="hover:bg-gray-100">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.category}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">{item.stock}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.location}</td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <a href="#" className="text-indigo-600 hover:text-indigo-900">Cập nhật số lượng</a>
    </td>
  </tr>
);

const Inventory: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý Kho</h1>
        <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                + Nhập kho
            </button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                - Xuất kho
            </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên vật tư</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng tồn</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vị trí</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventoryItems.map(item => <InventoryRow key={item.id} item={item} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
