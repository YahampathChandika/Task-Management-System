// src/pages/LoginPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import { ModeToggle } from "../components/mode-toggle";

export default function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Task Management</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your tasks and employees efficiently
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
