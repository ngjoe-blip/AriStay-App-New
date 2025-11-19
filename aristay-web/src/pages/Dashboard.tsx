import React from 'react';

// Sample data for tasks
const tasks = [
  { id: 1, title: 'Vệ sinh căn hộ 101', type: 'Cleaning', user: 'Nhân viên A', property: 'Chung cư A', status: 'pending', date: '2024-07-30' },
  { id: 2, title: 'Sửa điều hòa phòng 202', type: 'Maintenance', user: 'Nhân viên B', property: 'Chung cư B', status: 'in-progress', date: '2024-07-30' },
  { id: 3, title: 'Kiểm kho vật tư', type: 'Inventory', user: 'Nhân viên C', property: 'Kho chính', status: 'completed', date: '2024-07-29' },
  { id: 4, title: 'Giặt ủi lô ga giường', type: 'Laundry', user: 'Đối tác X', property: 'Xưởng giặt', status: 'pending', date: '2024-07-30' },
  { id: 5, title: 'Cắt cỏ sân vườn', type: 'Lawn-Pool', user: 'Nhân viên D', property: 'Biệt thự Vườn Tùng', status: 'pending', date: '2024-07-31' },
];

const TaskCard = ({ task }: { task: typeof tasks[0] }) => {
    const statusClasses: { [key: string]: string } = {
        pending: 'bg-yellow-200 border-yellow-500',
        'in-progress': 'bg-blue-200 border-blue-500',
        completed: 'bg-green-200 border-green-500',
    };

    const typeClasses: { [key: string]: string } = {
        Cleaning: 'text-blue-800',
        Maintenance: 'text-red-800',
        Inventory: 'text-purple-800',
        Laundry: 'text-indigo-800',
        'Lawn-Pool': 'text-green-800',
    }

    return (
        <div className={`p-3 mb-3 rounded-lg border-l-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${statusClasses[task.status]}`}>
            <h4 className="font-bold text-sm">{task.title}</h4>
            <p className={`text-xs font-semibold ${typeClasses[task.type]}`}>{task.type} @ {task.property}</p>
            <p className="text-xs text-gray-600 mt-1">Phụ trách: {task.user}</p>
        </div>
    );
};


const CalendarDay = ({ day, date, tasks }: { day: string, date: string, tasks: typeof tasks }) => {
    return (
        <div className="flex-1 border border-gray-200 rounded-lg p-3 bg-gray-50">
            <h3 className="font-bold text-center mb-4">{day} <span className="text-gray-500 font-normal">{date}</span></h3>
            <div className="h-full">
                {tasks.map(task => <TaskCard key={task.id} task={task} />)}
            </div>
        </div>
    )
}

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bảng điều phối công việc</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            <span>Chờ thực hiện</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
            <span>Đang tiến hành</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-400 rounded-full"></div>
            <span>Hoàn thành</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            + Tạo công việc mới
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        <CalendarDay day="Thứ Hai" date="29/07" tasks={tasks.filter(t => t.date === '2024-07-29')} />
        <CalendarDay day="Thứ Ba" date="30/07" tasks={tasks.filter(t => t.date === '2024-07-30')} />
        <CalendarDay day="Thứ Tư" date="31/07" tasks={tasks.filter(t => t.date === '2024-07-31')} />
      </div>
    </div>
  );
};

export default Dashboard;
