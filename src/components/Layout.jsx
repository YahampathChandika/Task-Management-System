// src/components/Layout.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../store/authSlice";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Menu, X, Home, Users, CheckSquare, LogOut } from "lucide-react";

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navigateAndClose = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/employees", label: "Employees", icon: Users },
    { path: "/tasks", label: "Tasks", icon: CheckSquare },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navbar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-semibold truncate">
                Task Management
              </h1>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-6 md:flex md:space-x-1">
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={isActiveRoute(item.path) ? "default" : "ghost"}
                    onClick={() => navigate(item.path)}
                    className="text-sm"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Right side - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated && (
                <>
                  <ModeToggle />
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="text-sm"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ModeToggle />
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                  className="relative z-[60]" // Higher z-index for the toggle button
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay - Higher z-index */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/50 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Menu - Highest z-index */}
      {isMobileMenuOpen && isAuthenticated && (
        <div className="fixed top-16 left-0 right-0 z-[60] md:hidden border-b bg-background/98 backdrop-blur-md shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={isActiveRoute(item.path) ? "default" : "ghost"}
                  onClick={() => navigateAndClose(item.path)}
                  className="w-full justify-start text-base py-3 px-4 rounded-lg"
                >
                  <IconComponent className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}

            {/* Mobile Logout */}
            <div className="pt-2 mt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-start text-base py-3 px-4 rounded-lg"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">{children}</div>
      </main>
    </div>
  );
}
