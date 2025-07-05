// src/components/dashboard/QuickActions.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Users, CheckSquare, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Task",
      description: "Create a new task",
      icon: Plus,
      onClick: () => navigate("/tasks"),
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Add Employee",
      description: "Add team member",
      icon: Users,
      onClick: () => navigate("/employees"),
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "View Tasks",
      description: "Manage all tasks",
      icon: CheckSquare,
      onClick: () => navigate("/tasks"),
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "View Reports",
      description: "Task analytics",
      icon: BarChart3,
      onClick: () => navigate("/tasks"),
      color: "bg-orange-600 hover:bg-orange-700",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gray-50"
                onClick={action.onClick}
              >
                <div className={`p-2 rounded-full text-white ${action.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">
                    {action.title}
                  </p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
