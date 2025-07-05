// src/components/dashboard/TaskStatusChart.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

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
      color: "bg-gray-400",
      textColor: "text-gray-700",
      bgColor: "bg-gray-100",
    },
    {
      name: "In Progress",
      value: tasksByStatus.IN_PROGRESS || tasksByStatus.INPROGRESS || 0,
      color: "bg-blue-500",
      textColor: "text-blue-700",
      bgColor: "bg-blue-100",
    },
    {
      name: "Completed",
      value: tasksByStatus.COMPLETED || 0,
      color: "bg-green-500",
      textColor: "text-green-700",
      bgColor: "bg-green-100",
    },
  ];

  const totalTasks = tasks.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Task Status Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {statusData.map((status, index) => {
            const percentage =
              totalTasks > 0 ? (status.value / totalTasks) * 100 : 0;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${status.color}`}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      {status.name}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${status.bgColor} ${status.textColor}`}
                  >
                    {status.value}
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${status.color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
