import React from 'react';

// Sample data for laundry services
const laundryBatches = [
  { id: 1, batchCode: 'L20240730-01', type: 'Khăn tắm', quantity: 50, status: 'washing', submittedAt: '2024-07-30 09:00', expectedReadyAt: '2024-07-30 14:00' },
  { id: 2, batchCode: 'L20240730-02', type: 'Ga giường', quantity: 30, status: 'drying', submittedAt: '2024-07-30 08:30', expectedReadyAt: '2024-07-30 13:00' },
  { id: 3, batchCode: 'L20240729-05', type: 'Rèm cửa', quantity: 15, status: 'ready', submittedAt: '2024-07-29 14:00', readyAt: '2024-07-29 19:00' },
  { id: 4, batchCode: 'L20240730-03', type: 'Tổng hợp', quantity: 100, status: 'washing', submittedAt: '2024-07-30 10:00', expectedReadyAt: '2024-07-30 15:00' },
];

const LaundryRow = ({ batch }: { batch: typeof laundryBatches[0] }) => {
    const statusClasses: { [key: string]: string } = {
        washing: 'bg-blue-100 text-blue-800',
        drying: 'bg-yellow-100 text-yellow-800',
        ready: 'bg-green-100 text-green-800',
    };

    const statusText: { [key: string]: string } = {
        washing: 'Đang giặt',
        drying: 'Đang sấy',
        ready: 'Sẵn sàng',
    }

    return (
        <tr className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{batch.batchCode}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{batch.type}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">{batch.quantity}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[batch.status]}`}>
                    {statusText[batch.status]}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{batch.expectedReadyAt || batch.readyAt}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Cập nhật trạng thái</a>
            </td>
        </tr>
    );
}

const Laundry: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý Giặt ủi</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Tạo lô giặt mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã lô</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại đồ</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dự kiến/Hoàn thành</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {laundryBatches.map(batch => <LaundryRow key={batch.id} batch={batch} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Laundry;
