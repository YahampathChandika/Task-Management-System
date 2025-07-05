// src/components/dashboard/UpcomingDeadlines.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0)
    return {
      text: `${Math.abs(diffDays)} days overdue`,
      color: "bg-red-100 text-red-800",
    };
  if (diffDays === 0)
    return { text: "Due today", color: "bg-orange-100 text-orange-800" };
  if (diffDays === 1)
    return { text: "Due tomorrow", color: "bg-yellow-100 text-yellow-800" };
  if (diffDays <= 7)
    return {
      text: `Due in ${diffDays} days`,
      color: "bg-blue-100 text-blue-800",
    };
  return {
    text: date.toLocaleDateString(),
    color: "bg-gray-100 text-gray-800",
  };
};

export default function UpcomingDeadlines({ tasks = [] }) {
  const navigate = useNavigate();

  // Filter and sort tasks with due dates
  const upcomingTasks = tasks
    .filter(
      (task) => task.duedate && task.status?.toUpperCase() !== "COMPLETED"
    )
    .sort((a, b) => new Date(a.duedate) - new Date(b.duedate))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">
          Upcoming Deadlines
        </CardTitle>
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
        {upcomingTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p>No upcoming deadlines</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingTasks.map((task) => {
              const dateInfo = formatDate(task.duedate);
              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {task.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {new Date(task.duedate).toLocaleDateString()}
                      </span>
                      {task.employee && (
                        <span className="text-xs text-gray-500">
                          • {task.employee.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge className={dateInfo.color}>{dateInfo.text}</Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
