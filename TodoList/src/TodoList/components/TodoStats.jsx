const TodoStats = ({ todos }) => {
  const totalTodo = todos.length || 0;
  const finishTodo = todos.filter((t) => t.completed).length;
  const ongoingTodo = totalTodo - finishTodo;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#fce7f3] note-shadow p-6 rounded-lg rotate-[0.5deg] hover:rotate-0 transition-transform">
        <h2 className="text-xl handwritten text-muted-foreground mb-2">
          Tổng số công việc:
        </h2>
        <span className="text-5xl font-bold handwritten text-foreground">
          {totalTodo}
        </span>
      </div>

      <div className="bg-[#d1fae5] note-shadow p-6 rounded-lg rotate-[-0.3deg] hover:rotate-0 transition-transform">
        <h2 className="text-xl handwritten text-muted-foreground mb-2">
          Đã hoàn thành:
        </h2>
        <span className="text-5xl font-bold handwritten text-green-700">
          {finishTodo}
        </span>
      </div>

      <div className="bg-[#fed7aa] note-shadow p-6 rounded-lg rotate-[0.4deg] hover:rotate-0 transition-transform">
        <h2 className="text-xl handwritten text-muted-foreground mb-2">
          Chưa hoàn thành:
        </h2>
        <span className="text-5xl font-bold handwritten text-orange-700">
          {ongoingTodo}
        </span>
      </div>
    </div>
  );
};

export default TodoStats;
