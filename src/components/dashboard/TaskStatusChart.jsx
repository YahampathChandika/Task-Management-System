// src/components/dashboard/TaskStatusChart.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { BarChart3 } from "lucide-react";

export default function TaskStatusChart({ tasks = [] }) {
  const tasksByStatus = tasks.reduce((acc, task) => {
    const status = task.status?.toUpperCase() || "TODO";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const statusData = [
    {
      name: "To Do",
      value: tasksByStatus.TODO || 0,
      color: "bg-slate-500 dark:bg-slate-400",
      bgColor: "bg-slate-100 dark:bg-slate-800/50",
      textColor: "text-slate-700 dark:text-slate-300",
    },
    {
      name: "In Progress",
      value: tasksByStatus.IN_PROGRESS || tasksByStatus.INPROGRESS || 0,
      color: "bg-blue-500 dark:bg-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-800/50",
      textColor: "text-blue-700 dark:text-blue-300",
    },
    {
      name: "Completed",
      value: tasksByStatus.DONE || 0,
      color: "bg-green-500 dark:bg-green-400",
      bgColor: "bg-green-100 dark:bg-green-800/50",
      textColor: "text-green-700 dark:text-green-300",
    }
  ];

  const totalTasks = tasks.length;
  const maxValue = Math.max(...statusData.map((s) => s.value), 1);

  return (
    <Card className="shadow-sm border-0 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-950/20 dark:to-indigo-900/20">
            <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <CardTitle className="text-lg font-semibold text-foreground">
            Task Status Overview
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {statusData.map((status, index) => {
          const percentage =
            totalTasks > 0 ? (status.value / totalTasks) * 100 : 0;
          const barWidth = totalTasks > 0 ? (status.value / maxValue) * 100 : 0;

          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${status.color} shadow-sm`}
                  ></div>
                  <span className="text-sm font-medium text-foreground">
                    {status.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className={`${status.bgColor} ${status.textColor} border-0 font-semibold`}
                  >
                    {status.value}
                  </Badge>
                  <span className="text-xs text-muted-foreground min-w-[3rem] text-right">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${status.color} transition-all duration-1000 ease-out shadow-sm`}
                    style={{ width: `${barWidth}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}

        {totalTasks === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No tasks to display</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
