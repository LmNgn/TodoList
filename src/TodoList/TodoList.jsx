import { useEffect, useState } from "react";
import TodoDetail from "./components/TodoDetail";
import TodoStats from "./components/TodoStats";
import TodoToolbar from "./components/TodoToolbar";
import TodoFilter from "./components/TodoFilter";
import toast from "react-hot-toast";
import { URL } from "../utils";

const TodoList = () => {
  const [todos, setTodos] = useState();
  const [meta, setMeta] = useState();
  const [list, setList] = useState();
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 5,
  });

  const fetchData = async () => {
    try {
      const params = new URLSearchParams(query).toString();
      await fetch(`${URL}?${params}`)
        .then((res) => res.json())
        .then((data) => {
          setTodos(data.data);
          setMeta(data.meta);
        });
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  const fetchAll = async () => {
    try {
      await fetch(`${URL}`)
        .then((res) => res.json())
        .then((data) => setList(data.data));
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAll();
  }, [query]);

  if (!todos || !list)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#fef3c7] note-shadow p-8 rounded-lg">
          <p className="text-2xl handwritten">Đang tải...</p>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-[#fed7aa] note-shadow p-6 rounded-lg rotate-[-0.5deg]">
        <h1 className="text-4xl md:text-5xl font-bold handwritten text-center mb-2">
          📝 Danh sách cần làm
        </h1>
      </div>

      <TodoStats todos={list} />

      <div className="bg-[#dbeafe] note-shadow p-6 rounded-lg rotate-[0.3deg]">
        <TodoToolbar
          query={query}
          onChange={(changes) => setQuery((prev) => ({ ...prev, ...changes }))}
        />
      </div>

      <div className="bg-[#d1fae5] note-shadow p-6 rounded-lg rotate-[-0.2deg]">
        <TodoFilter
          query={query}
          onChange={(changes) => setQuery((prev) => ({ ...prev, ...changes }))}
        />
      </div>

      <div className="bg-[#fef3c7] note-shadow p-6 rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-[#d6d3d1]">
              <th className="p-3 text-left handwritten text-xl"></th>
              <th className="p-3 text-left handwritten text-xl">STT</th>
              <th className="p-3 text-left handwritten text-xl">Tên</th>
              <th className="p-3 text-left handwritten text-xl">Mô tả</th>
              <th className="p-3 text-left handwritten text-xl">Ưu tiên</th>
              <th className="p-3 text-left handwritten text-xl">Ngày tạo</th>
              <th className="p-3 text-left handwritten text-xl">Cập nhật</th>
              <th className="p-3 text-left handwritten text-xl">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {todos && todos.length > 0 ? (
              todos.map((t, idx) => (
                <TodoDetail key={t._id} index={idx} todo={t} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-muted-foreground py-8"
                >
                  <p className="text-2xl handwritten">
                    Không có công việc nào phù hợp
                  </p>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            {meta && meta.totalPages > 1 && (
              <tr>
                <td colSpan={8}>
                  <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                      disabled={query._page === 1}
                      onClick={() =>
                        setQuery((prev) => ({ ...prev, _page: prev._page - 1 }))
                      }
                      className="px-6 py-3 bg-[#bfdbfe] hover:bg-[#93c5fd] text-[#1e3a8a] rounded-lg handwritten text-lg note-shadow transition-all hover:rotate-0 rotate-[-0.5deg] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Trang trước
                    </button>

                    <span className="text-lg handwritten bg-[#fef3c7] px-4 py-2 rounded-lg note-shadow">
                      Trang {meta.page} / {meta.totalPages}
                    </span>

                    <button
                      disabled={query._page === meta.totalPages}
                      onClick={() =>
                        setQuery((prev) => ({ ...prev, _page: prev._page + 1 }))
                      }
                      className="px-6 py-3 bg-[#bfdbfe] hover:bg-[#93c5fd] text-[#1e3a8a] rounded-lg handwritten text-lg note-shadow transition-all hover:rotate-0 rotate-[0.5deg] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Trang sau
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
