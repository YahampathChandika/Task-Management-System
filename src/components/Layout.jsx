// src/components/Layout.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../store/authSlice";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import SignOutDialog from "./SignOutDialog";
import {
  Menu,
  X,
  Home,
  Users,
  CheckSquare,
  LogOut,
  Briefcase,
  Sparkles,
  Settings,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOutClick = () => {
    setIsSignOutDialogOpen(true);
  };

  const handleConfirmSignOut = () => {
    dispatch(logout());
    navigate("/login");
    setIsMobileMenuOpen(false);
    setIsSignOutDialogOpen(false);
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
    {
      path: "/",
      label: "Dashboard",
      icon: Home,
      gradient: "from-blue-500 to-blue-600",
      description: "Overview and analytics",
    },
    {
      path: "/employees",
      label: "Team",
      icon: Users,
      gradient: "from-green-500 to-green-600",
      description: "Manage your team members",
    },
    {
      path: "/tasks",
      label: "Tasks",
      icon: CheckSquare,
      gradient: "from-purple-500 to-purple-600",
      description: "Project tasks and workflow",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enhanced Top Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg"
            : "bg-background/80 backdrop-blur-sm border-b border-border/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 ">
            {/* Enhanced Logo Section */}
            <div className="flex items-center justify-between w-2/3">
              <div
                className="flex items-center space-x-3 group cursor-pointer"
                onClick={() => navigate("/")}
              >
                <div className="relative">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-primary/80 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Briefcase className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="h-2 w-2 text-white p-0.5" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                    TaskFlow Pro
                  </h1>
                  <p className="text-xs text-muted-foreground font-medium">
                    Project Management
                  </p>
                </div>
              </div>

              {/* Enhanced Desktop Navigation */}
              <div className="hidden md:flex md:space-x-10">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = isActiveRoute(item.path);
                  return (
                    <Button
                      key={item.path}
                      variant={isActive ? "default" : "ghost"}
                      onClick={() => navigate(item.path)}
                      className={`relative text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
                          : "hover:bg-accent/80 hover:scale-105"
                      }`}
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      {item.label}
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full" />
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Right Side */}
            <div className="flex items-center space-x-3">
              {isAuthenticated && (
                <>
                  {/* Desktop Actions */}
                  <div className="hidden md:flex items-center space-x-3">
                    <ModeToggle />
                    <div className="w-px h-6 bg-border/50" />
                    <Button
                      variant="outline"
                      onClick={handleSignOutClick}
                      className="text-sm font-medium px-4 py-2 rounded-xl border-border/50 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all duration-200 hover:scale-105"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>

                  {/* Mobile Menu Button */}
                  <div className="md:hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="relative z-[70] p-2 rounded-xl hover:bg-accent transition-all duration-200"
                    >
                      <div className="relative">
                        {isMobileMenuOpen ? (
                          <X className="h-6 w-6 transition-transform duration-200 rotate-90" />
                        ) : (
                          <Menu className="h-6 w-6 transition-transform duration-200" />
                        )}
                      </div>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Professional Mobile Navigation Menu */}
      {isMobileMenuOpen && isAuthenticated && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Enhanced Background overlay */}
          <div
            className="absolute inset-0 bg-background/98 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Enhanced Menu content */}
          <div className="relative z-[65] flex flex-col h-full bg-gradient-to-br from-background to-background/95">
            {/* Enhanced Header section */}
            <div className="flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-r from-card to-card/80">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-primary/80 shadow-lg">
                  <Briefcase className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground tracking-tight">
                    TaskFlow Pro
                  </h1>
                  <p className="text-xs text-muted-foreground font-medium">
                    Project Management
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full p-2 hover:bg-accent"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Enhanced Navigation section */}
            <div className="flex-1 px-6 py-8 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center">
                    <div className="w-4 h-px bg-gradient-to-r from-primary to-transparent mr-2" />
                    Navigation
                  </h3>
                  <div className="space-y-2">
                    {navigationItems.map((item) => {
                      const IconComponent = item.icon;
                      const isActive = isActiveRoute(item.path);
                      return (
                        <Button
                          key={item.path}
                          variant={isActive ? "default" : "ghost"}
                          onClick={() => navigateAndClose(item.path)}
                          className={`w-full justify-start text-lg py-6 px-5 rounded-2xl h-auto group transition-all duration-200 ${
                            isActive
                              ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg hover:shadow-xl`
                              : "hover:bg-accent/80 hover:scale-[1.02]"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-xl mr-4 transition-all duration-200 ${
                              isActive
                                ? "bg-white/20"
                                : `bg-gradient-to-r ${item.gradient} opacity-80 group-hover:opacity-100`
                            }`}
                          >
                            <IconComponent
                              className={`h-5 w-5 ${
                                isActive ? "text-white" : "text-white"
                              }`}
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-semibold">{item.label}</div>
                            <div
                              className={`text-xs ${
                                isActive
                                  ? "text-white/80"
                                  : "text-muted-foreground group-hover:text-foreground"
                              }`}
                            >
                              {item.description}
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Settings and Logout section */}
            <div className="px-6 py-6 border-t border-border/50 bg-gradient-to-r from-card/50 to-card/30 space-y-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
                <div className="w-4 h-px bg-gradient-to-r from-primary to-transparent mr-2" />
                Settings
              </h3>

              {/* Enhanced Theme Toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-accent/30 to-accent/20 border border-border/30">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-orange-400 to-yellow-400 shadow-lg">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-300 to-yellow-300 flex items-center justify-center">
                      <Sun className="h-3 w-3 text-orange-800" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Appearance</p>
                    <p className="text-sm text-muted-foreground">
                      Toggle theme mode
                    </p>
                  </div>
                </div>
                <ModeToggle />
              </div>

              {/* Enhanced Logout Button with Confirmation */}
              <Button
                variant="outline"
                onClick={handleSignOutClick}
                className="w-full justify-start text-lg py-6 px-5 rounded-2xl h-auto border-red-200 dark:border-red-800/50 bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/20 text-red-600 dark:text-red-400 hover:from-red-100 hover:to-red-200 dark:hover:from-red-950/40 dark:hover:to-red-900/40 transition-all duration-200 hover:scale-[1.02] group"
              >
                <div className="p-2 rounded-xl mr-4 bg-gradient-to-r from-red-500 to-red-600 text-white group-hover:scale-110 transition-transform duration-200">
                  <LogOut className="h-5 w-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold">Sign Out</div>
                  <div className="text-xs text-red-500/80 dark:text-red-400/80">
                    End your session securely
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Dialog */}
      <SignOutDialog
        open={isSignOutDialogOpen}
        onOpenChange={setIsSignOutDialogOpen}
        onConfirm={handleConfirmSignOut}
      />

      {/* Main Content with proper spacing */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">{children}</div>
        </div>
      </main>
    </div>
  );
}
