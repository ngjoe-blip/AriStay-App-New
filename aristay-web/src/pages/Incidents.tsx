import React from 'react';

// Sample data for incidents
const incidents = [
  { id: 1, property: 'Chung cư A - P.101', description: 'Rò rỉ ống nước', status: 'new', reportedBy: 'Khách thuê', reportedAt: '2024-07-30 10:00' },
  { id: 2, property: 'Biệt thự Vườn Tùng', description: 'Điều hòa không hoạt động', status: 'in-progress', assignedTo: 'Nhân viên B', reportedAt: '2024-07-29 15:30' },
  { id: 3, property: 'Khách sạn B - P.305', description: 'Wifi yếu', status: 'resolved', resolvedBy: 'Nhân viên A', reportedAt: '2024-07-28 09:00' },
  { id: 4, property: 'Chung cư A - P.203', description: 'Cửa sổ bị kẹt', status: 'new', reportedBy: 'Nhân viên dọn dẹp', reportedAt: '2024-07-30 11:00' },
];

const IncidentRow = ({ incident }: { incident: typeof incidents[0] }) => {
    const statusClasses: { [key: string]: string } = {
        new: 'bg-red-100 text-red-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        resolved: 'bg-green-100 text-green-800',
    };
    
    const statusText: { [key: string]: string } = {
        new: 'Mới',
        'in-progress': 'Đang xử lý',
        resolved: 'Đã giải quyết',
    }

    return (
        <tr className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{incident.property}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{incident.description}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{incident.reportedAt}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[incident.status]}`}>
                    {statusText[incident.status]}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{incident.assignedTo || incident.reportedBy}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Xem chi tiết</a>
            </td>
        </tr>
    );
}

const Incidents: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý Sự cố</h1>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          + Báo cáo sự cố mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bất động sản</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian báo cáo</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người báo cáo/Phụ trách</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incidents.map(inc => <IncidentRow key={inc.id} incident={inc} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Incidents;
