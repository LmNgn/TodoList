import { useState } from "react";

const TodoToolbar = ({ query, onChange }) => {
  const [keyword, setKeyword] = useState(query._q || "");
  const [sortField, setSortField] = useState(query._sort || "");
  const [order, setOrder] = useState(query._order || "");

  const handleSearch = (e) => {
    e.preventDefault();
    onChange({ _q: keyword || "", _page: 1 });
    setSortField("");
    setOrder("");
  };

  const handleChange = (field, value) => {
    onChange({ ...query, [field]: value, _page: 1 });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl handwritten font-bold mb-4">
        🔍 Tìm kiếm & Sắp xếp
      </h3>

      <form onSubmit={handleSearch} className="flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Nhập từ khoá tìm kiếm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 bg-white border-2 border-foreground rounded note-shadow-sm handwritten text-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-secondary text-primary-foreground px-6 py-2 rounded note-shadow handwritten text-lg font-bold transition-colors"
        >
          Tìm kiếm
        </button>
      </form>

      <div className="flex gap-4 flex-wrap">
        <select
          name="sort-field"
          value={sortField}
          onChange={(e) => {
            setSortField(e.target.value);
            handleChange("_sort", e.target.value);
          }}
          className="px-4 py-2 bg-white border-2 border-foreground rounded note-shadow-sm handwritten text-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Sắp xếp theo</option>
          <option value="name">Tên</option>
          <option value="priority">Mức độ ưu tiên</option>
          <option value="createdAt">Ngày tạo</option>
          <option value="updatedAt">Ngày cập nhật</option>
        </select>

        <select
          name="sort-order"
          value={order}
          onChange={(e) => {
            setOrder(e.target.value);
            handleChange("_order", e.target.value);
          }}
          className="px-4 py-2 bg-white border-2 border-foreground rounded note-shadow-sm handwritten text-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Thứ tự sắp xếp</option>
          <option value="asc">Tăng dần</option>
          <option value="desc">Giảm dần</option>
        </select>
      </div>
    </div>
  );
};

export default TodoToolbar;
