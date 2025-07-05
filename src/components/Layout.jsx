// src/components/Layout.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { Button } from "./ui/button";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Task Management
              </h1>
              <div className="hidden md:ml-6 md:flex md:space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/employees")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Employees
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/tasks")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Tasks
                </Button>
              </div>
            </div>

            {isAuthenticated && (
              <div className="flex items-center">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="ml-4"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">{children}</div>
      </main>
    </div>
  );
}
