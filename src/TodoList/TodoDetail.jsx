import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { formatDate, URL } from "../utils";

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (todoId) => {
    try {
      const response = await fetch(`${URL}/${todoId}`);
      const result = await response.json();
      setTodo(result.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải thông tin công việc.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1:
        return <span className="text-green-600 font-semibold">Thấp</span>;
      case 2:
        return (
          <span className="text-yellow-600 font-semibold">Trung bình</span>
        );
      case 3:
        return <span className="text-red-600 font-semibold">Cao</span>;
      default:
        return "Không xác định";
    }
  };

  const getOverdueStatus = (dueDate, completed) => {
    const now = new Date();
    const deadline = new Date(dueDate);
    if (completed) return null;
    if (deadline < now) {
      return (
        <p className="text-lg mb-2 text-red-600 font-semibold">
          Công việc đã quá hạn!
        </p>
      );
    } else {
      return (
        <p className="text-lg mb-2 text-blue-600 font-semibold">
          Còn thời gian để hoàn thành.
        </p>
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-accent hover:bg-primary text-accent-foreground px-6 py-2 mb-5 rounded note-shadow handwritten text-lg font-bold transition-colors cursor-pointer"
      >
        ← Quay lại
      </button>

      {loading ? (
        <p className="text-xl text-gray-600">Đang tải thông tin...</p>
      ) : todo ? (
        <div className="border border-gray-300 rounded-lg p-6 shadow-sm bg-white">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{todo.name}</h2>
          <p className="text-lg mb-2">
            <span className="font-semibold">Mô tả:</span> {todo.description}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Ngày tạo:</span>{" "}
            {formatDate(todo.createdAt)}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Hạn hoàn thành:</span>{" "}
            {formatDate(todo.dueDate)}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Ưu tiên:</span>{" "}
            {getPriorityLabel(todo.priority)}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Trạng thái:</span>{" "}
            {todo.completed ? "Hoàn thành" : "Chưa hoàn thành"}
          </p>
          {getOverdueStatus(todo.dueDate, todo.completed)}
          <p className="text-lg">
            <span className="font-semibold">Cập nhật lần cuối:</span>{" "}
            {formatDate(todo.updatedAt)}
          </p>
        </div>
      ) : (
        <p className="text-xl text-red-500">Không tìm thấy công việc.</p>
      )}
    </div>
  );
};

export default TodoDetail;
