import { formatDate } from "../../utils";

const TodoDetail = ({ todo, index }) => {
  return (
    <tr className="border-b border-[#d6d3d1] hover:bg-[#fef9e7] transition-colors">
      <td className="p-3">
        <input
          type="checkbox"
          checked={todo.completed}
          className="w-5 h-5 rounded border-2 border-foreground cursor-pointer"
          readOnly
        />
      </td>
      <td className="p-3 handwritten text-lg">{index + 1}</td>
      <td className="p-3 handwritten text-lg font-semibold">{todo.name}</td>
      <td className="p-3 handwritten text-lg">{todo.description}</td>
      <td className="p-3">
        {(() => {
          const map = { 1: "Thấp", 2: "Vừa", 3: "Cao" };
          const level =
            typeof todo.priority === "object"
              ? todo.priority.level
              : todo.priority;
          const label =
            typeof todo.priority === "object"
              ? todo.priority.label
              : map[level] || "Không rõ";

          const color =
            level === 3
              ? "bg-[#fecaca] text-red-800"
              : level === 2
              ? "bg-[#fed7aa] text-orange-800"
              : "bg-[#d1fae5] text-green-800";

          return (
            <span
              className={`inline-block px-3 py-1 rounded-full note-shadow-sm handwritten text-lg ${color}`}
            >
              {label}
            </span>
          );
        })()}
      </td>
      <td className="p-3 handwritten text-lg">{formatDate(todo.dueDate)}</td>
      <td className="p-3 handwritten text-lg">{formatDate(todo.updatedAt)}</td>
      <td className="p-3">
        <div className="flex gap-2">
          <button className="bg-[#dbeafe] hover:bg-[#bfdbfe] px-4 py-2 rounded note-shadow-sm handwritten text-lg transition-colors">
            Cập nhật
          </button>
          <button className="bg-[#fecaca] hover:bg-[#fca5a5] px-4 py-2 rounded note-shadow-sm handwritten text-lg transition-colors">
            Xoá
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TodoDetail;
