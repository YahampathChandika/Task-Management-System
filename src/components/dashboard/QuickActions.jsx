// src/components/dashboard/QuickActions.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Users, CheckSquare, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Task",
      description: "Create new task",
      icon: Plus,
      onClick: () => navigate("/tasks"),
      gradient: "from-blue-500 to-blue-600",
      bgGradient:
        "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
      hoverGradient: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      title: "Add Employee",
      description: "Add team member",
      icon: Users,
      onClick: () => navigate("/employees"),
      gradient: "from-green-500 to-green-600",
      bgGradient:
        "from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20",
      hoverGradient: "hover:from-green-600 hover:to-green-700",
    },
    {
      title: "View Tasks",
      description: "Manage all tasks",
      icon: CheckSquare,
      onClick: () => navigate("/tasks"),
      gradient: "from-purple-500 to-purple-600",
      bgGradient:
        "from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20",
      hoverGradient: "hover:from-purple-600 hover:to-purple-700",
    },
    {
      title: "View Team",
      description: "Team overview",
      icon: Users,
      onClick: () => navigate("/employees"),
      gradient: "from-orange-500 to-orange-600",
      bgGradient:
        "from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20",
      hoverGradient: "hover:from-orange-600 hover:to-orange-700",
    },
  ];

  return (
    <Card className="shadow-sm border-0 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-violet-50 to-violet-100 dark:from-violet-950/20 dark:to-violet-900/20">
            <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <CardTitle className="text-lg font-semibold text-foreground">
            Quick Actions
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center space-y-3 border-border/50 hover:border-border bg-gradient-to-br ${action.bgGradient} hover:bg-accent/30 group transition-all duration-200`}
                onClick={action.onClick}
              >
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${action.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {action.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
