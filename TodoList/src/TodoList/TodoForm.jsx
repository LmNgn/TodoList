import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { URL } from "../utils";

const TodoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    priority: 1,
    description: "",
    dueDate: "",
    isCompleted: false,
  });

  useEffect(() => {
    if (id) {
      const fetchTodo = async () => {
        try {
          const res = await fetch(`${URL}/${id}`);
          if (!res.ok) throw new Error("Không tìm thấy công việc");
          const json = await res.json();
          const data = json.data;
          setForm({
            name: data.name || "",
            priority: data.priority || 1,
            description: data.description || "",
            dueDate: data.dueDate?.slice(0, 10) || "",
            isCompleted: data.isCompleted || false,
          });
        } catch (error) {
          toast.error(error.message);
        }
      };
      fetchTodo();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (!form.name.trim()) {
      toast.error("Tên công việc không được để trống");
      return false;
    }
    if (form.name.length > 80) {
      toast.error("Tên công việc tối đa 80 ký tự");
      return false;
    }
    if (!form.dueDate) {
      toast.error("Ngày hết hạn không được để trống");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const method = id ? "PUT" : "POST";
      const endpoint = id ? `${URL}/${id}` : URL;

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Lỗi khi lưu công việc");

      toast.success(id ? "Cập nhật thành công" : "Thêm mới thành công");
      navigate("/todos"); // quay lại danh sách
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Chỉnh sửa công việc" : "Thêm công việc mới"}
      </h2>

      <div>
        <label className="block font-medium">Tên công việc *</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          maxLength={80}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Mức độ ưu tiên</label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value={1}>1 - Thấp</option>
          <option value={2}>2 - Trung bình</option>
          <option value={3}>3 - Cao</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Mô tả</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Ngày hết hạn *</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isCompleted"
          checked={form.isCompleted}
          onChange={handleChange}
        />
        <label>Hoàn thành</label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {id ? "Cập nhật" : "Thêm mới"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/todos")}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
