// src/components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/authApi";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { toast } from "sonner";
import { Lock, User, Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast("Please fill in all fields");
      return;
    }

    try {
      const result = await login({ username, password }).unwrap();

      if (result.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-border/50 shadow-2xl backdrop-blur-sm bg-card/95">
      <CardHeader className="space-y-4 pb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <Lock className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold text-center text-foreground">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground text-base">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-foreground flex items-center gap-2"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="h-12 px-4 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm transition-all duration-200 focus:shadow-lg focus:shadow-primary/10"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground flex items-center gap-2"
            >
              <Lock className="h-4 w-4 text-muted-foreground" />
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 px-4 pr-12 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm transition-all duration-200 focus:shadow-lg focus:shadow-primary/10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent/50"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg  transition-all duration-300 transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="pt-4 border-t border-border/30">
          <p className="text-xs text-center text-muted-foreground">
            Task Management System v2.0
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
