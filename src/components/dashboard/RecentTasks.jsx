// src/components/dashboard/RecentTasks.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case "TODO":
      return "bg-gray-100 text-gray-800";
    case "IN_PROGRESS":
    case "INPROGRESS":
      return "bg-blue-100 text-blue-800";
    case "COMPLETED":
      return "bg-green-100 text-green-800";
    case "BLOCKED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "No due date";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function RecentTasks({ tasks = [] }) {
  const navigate = useNavigate();

  // Get 5 most recent tasks (you might want to sort by creation date if available)
  const recentTasks = tasks
    .slice()
    .reverse() // Assuming newer tasks have higher IDs
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Recent Tasks</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/tasks")}
          className="text-blue-600 hover:text-blue-700"
        >
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {recentTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks yet</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => navigate("/tasks")}
            >
              Create your first task
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {task.title}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <Badge className={getStatusColor(task.status)}>
                      {task.status || "TODO"}
                    </Badge>
                    {task.duedate && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDate(task.duedate)}
                      </div>
                    )}
                    {task.employee && (
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="mr-1 h-3 w-3" />
                        {task.employee.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
