import { useState } from "react";
import toast from "react-hot-toast";

const TodoFilter = ({ query, onChange }) => {
  const [priority, setPriority] = useState(query.priority || "");
  const [status, setStatus] = useState(query.completed || "");
  const [fromDate, setFromDate] = useState(query.from || "");
  const [toDate, setToDate] = useState(query.to || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      toast.error("Ngày kết thúc không được nhỏ hơn ngày bắt đầu");
      return;
    }
    onChange({
      ...query,
      priority,
      completed: status,
      createdAt_gte: fromDate,
      createdAt_lte: toDate,
      dueDate_gte: fromDate,
      dueDate_lte: toDate,
      _page: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl handwritten font-bold mb-4">🎯 Lọc công việc</h3>

      <div className="flex gap-4 flex-wrap">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-2 bg-white border-2 border-foreground rounded note-shadow-sm handwritten text-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Mức độ ưu tiên</option>
          <option value="3">Cao</option>
          <option value="2">Vừa</option>
          <option value="1">Thấp</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 bg-white border-2 border-foreground rounded note-shadow-sm handwritten text-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Trạng thái</option>
          <option value="true">Đã hoàn thành</option>
          <option value="false">Chưa hoàn thành</option>
        </select>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="handwritten text-lg font-semibold">Từ:</label>
          <input
            type="date"
            className="px-4 py-2 bg-white border-2 border-foreground rounded note-shadow-sm handwritten text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <span className="text-muted-foreground text-2xl">→</span>
        <div className="flex items-center gap-2">
          <label className="handwritten text-lg font-semibold">Đến:</label>
          <input
            type="date"
            className="px-4 py-2 bg-white border-2 border-foreground rounded note-shadow-sm handwritten text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-accent hover:bg-primary text-accent-foreground px-6 py-2 rounded note-shadow handwritten text-lg font-bold transition-colors"
      >
        Áp dụng lọc
      </button>
    </form>
  );
};

export default TodoFilter;
