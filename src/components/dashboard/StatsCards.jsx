// src/components/dashboard/StatsCards.jsx
import { Card, CardContent } from "../ui/card";
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

  // Fix: Use correct status values from your API
  const completedTasks = tasksByStatus.DONE || tasksByStatus.COMPLETED || 0;
  const inProgressTasks =
    tasksByStatus.IN_PROGRESS || tasksByStatus.INPROGRESS || 0;
  const todoTasks = tasksByStatus.TODO || 0;

  // Fix: Calculate overdue tasks with correct field name and status
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueTasks = tasks.filter((task) => {
    // Fix: Use dueDate (from your API) and check for DONE status
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    const status = task.status?.toUpperCase();
    return dueDate < today && status !== "DONE" && status !== "COMPLETED";
  }).length;

  // Calculate completion rate using the correct completed count
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      bgGradient:
        "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: CheckSquare,
      gradient: "from-purple-500 to-purple-600",
      bgGradient:
        "from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      gradient: "from-orange-500 to-orange-600",
      bgGradient:
        "from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "Overdue Tasks",
      value: overdueTasks,
      icon: AlertTriangle,
      gradient: "from-red-500 to-red-600",
      bgGradient:
        "from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="group hover:shadow-lg hover:scale-105  transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-card to-card/80"
          >
            <CardContent className="md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${stat.bgGradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground transition-transform duration-300">
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
