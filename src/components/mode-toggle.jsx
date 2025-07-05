// src/components/mode-toggle.jsx
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />
        );
      case "dark":
        return (
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />
        );
      case "system":
        return (
          <Monitor className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />
        );
      default:
        return (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />
        );
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light mode";
      case "dark":
        return "Dark mode";
      case "system":
        return "System mode";
      default:
        return "Light mode";
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 hover:scale-105 rounded-xl"
      title={getThemeLabel()}
    >
      <div className="relative transition-all duration-300">
        {getThemeIcon()}
      </div>
      <span className="sr-only">{getThemeLabel()}</span>
    </Button>
  );
}
