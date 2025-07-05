// src/components/Layout.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../store/authSlice";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import {
  Menu,
  X,
  Home,
  Users,
  CheckSquare,
  LogOut,
  Briefcase,
} from "lucide-react";

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
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">
                  TaskFlow Pro
                </h1>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-8 md:flex md:space-x-1">
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={isActiveRoute(item.path) ? "default" : "ghost"}
                    onClick={() => navigate(item.path)}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Right side - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated && (
                <>
                  <ModeToggle />
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="text-sm font-medium"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                  className="relative z-[70] p-2"
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

      {/* Full Screen Mobile Navigation Menu */}
      {isMobileMenuOpen && isAuthenticated && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-background/98 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu content */}
          <div className="relative z-[65] flex flex-col h-full">
            {/* Header section with app name */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    TaskFlow Pro
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Professional Task Management
                  </p>
                </div>
              </div>

              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full p-2"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Navigation section */}
            <div className="flex-1 px-6 py-8">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Navigation
                </h3>
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Button
                      key={item.path}
                      variant={isActiveRoute(item.path) ? "default" : "ghost"}
                      onClick={() => navigateAndClose(item.path)}
                      className="w-full justify-start text-lg py-4 px-4 rounded-xl h-auto"
                    >
                      <IconComponent className="h-6 w-6 mr-4" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Settings and Logout section */}
            <div className="px-6 py-6 border-t border-border/50 space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Settings
              </h3>

              {/* Theme Toggle */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium">Theme</p>
                    <p className="text-sm text-muted-foreground">
                      Toggle dark/light mode
                    </p>
                  </div>
                </div>
                <ModeToggle />
              </div>

              {/* Logout Button */}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-start text-lg py-4 px-4 rounded-xl h-auto border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
              >
                <LogOut className="h-6 w-6 mr-4" />
                Sign Out
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
