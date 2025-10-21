import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmed) {
      localStorage.removeItem("authData");
      sessionStorage.removeItem("authData");
      navigate("/auth");
    }
  };

  const links = [
    { href: "/todos", label: "Todo" },
    { href: "/important", label: "Important todo" },
    { href: "/todo", label: "Add todo" },
  ];

  return (
    <aside className="w-64 bg-amber-100 min-h-screen p-6 border-r-2 border-amber-200">
      <h1 className="text-3xl font-bold text-amber-900 mb-8">Todo App</h1>
      <nav>
        <ul className="space-y-3">
          {links.map((l, indx) => (
            <li key={indx}>
              <Link
                to={l.href}
                className="block px-4 py-3 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-200 transition-colors text-xl"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="mt-6 w-full px-4 py-3 rounded-lg bg-red-200 text-red-800 hover:bg-red-300 transition-colors text-xl"
        >
          Đăng xuất
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
