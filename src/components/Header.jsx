import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("admin-token");
    navigate("/");
  };

  return (
    <div className="w-full bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-200">
      <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
      <button className="bg-black text-white px-4 py-2 rounded" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
};

export default Header;
