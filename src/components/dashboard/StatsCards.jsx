// src/components/dashboard/StatsCards.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Users,
  CheckSquare,
  Clock,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

export default function StatsCards({ employees = [], tasks = [] }) {
  // Calculate statistics
  const totalEmployees = employees.length;
  const totalTasks = tasks.length;

  const tasksByStatus = tasks.reduce((acc, task) => {
    const status = task.status?.toUpperCase() || "TODO";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const completedTasks = tasksByStatus.COMPLETED || 0;
  const inProgressTasks =
    tasksByStatus.IN_PROGRESS || tasksByStatus.INPROGRESS || 0;
  const todoTasks = tasksByStatus.TODO || 0;

  // Calculate overdue tasks
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueTasks = tasks.filter((task) => {
    if (!task.duedate) return false;
    const dueDate = new Date(task.duedate);
    return dueDate < today && task.status?.toUpperCase() !== "COMPLETED";
  }).length;

  // Calculate completion rate
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: CheckSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Overdue Tasks",
      value: overdueTasks,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
