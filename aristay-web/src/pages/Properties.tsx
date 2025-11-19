import React, { useState } from 'react';

// Sample data for properties
const properties = [
  { id: 1, name: 'Chung cư A', address: '123 Đường ABC, Quận 1, TP.HCM', units: 10, status: 'active' },
  { id: 2, name: 'Biệt thự Vườn Tùng', address: '456 Đường XYZ, Quận 2, TP.HCM', units: 1, status: 'active' },
  { id: 3, name: 'Khách sạn B', address: '789 Đường KLM, Quận 3, TP.HCM', units: 50, status: 'inactive' },
];

const PropertyRow = ({ property }: { property: typeof properties[0] }) => (
  <tr className="hover:bg-gray-100">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{property.name}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{property.address}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">{property.units}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {property.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <a href="#" className="text-indigo-600 hover:text-indigo-900">Sửa</a>
      <a href="#" className="text-red-600 hover:text-red-900 ml-4">Xóa</a>
    </td>
  </tr>
);

const Properties: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý Bất động sản</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Thêm Bất động sản
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa chỉ</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Số căn hộ</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map(prop => <PropertyRow key={prop.id} property={prop} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Properties;
