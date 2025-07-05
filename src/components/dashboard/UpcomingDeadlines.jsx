// src/components/dashboard/UpcomingDeadlines.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, Clock, ArrowRight, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0)
    return {
      text: `${Math.abs(diffDays)} days overdue`,
      color: "bg-red-100 text-red-800 dark:bg-red-800/50 dark:text-red-300",
      urgent: true,
    };
  if (diffDays === 0)
    return {
      text: "Due today",
      color:
        "bg-orange-100 text-orange-800 dark:bg-orange-800/50 dark:text-orange-300",
      urgent: true,
    };
  if (diffDays === 1)
    return {
      text: "Due tomorrow",
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/50 dark:text-yellow-300",
      urgent: true,
    };
  if (diffDays <= 7)
    return {
      text: `Due in ${diffDays} days`,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-300",
      urgent: false,
    };
  return {
    text: date.toLocaleDateString(),
    color:
      "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300",
    urgent: false,
  };
};

export default function UpcomingDeadlines({ tasks = [] }) {
  const navigate = useNavigate();

  const upcomingTasks = tasks
    .filter(
      (task) => task.dueDate && task.status?.toUpperCase() !== "COMPLETED"
    )
    .sort((a, b) => new Date(a.duedate) - new Date(b.duedate))
    .slice(0, 5);

  return (
    <Card className="shadow-sm border-0 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20">
            <CalendarDays className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <CardTitle className="text-lg font-semibold text-foreground">
            Upcoming Deadlines
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/tasks")}
          className="text-primary hover:text-primary/80 hover:bg-primary/10"
        >
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {upcomingTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No upcoming deadlines</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingTasks.map((task) => {
              const dateInfo = formatDate(task.dueDate);
              return (
                <div
                  key={task.id}
                  className={`group p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    dateInfo.urgent
                      ? "border-orange-200 dark:border-orange-800/30 hover:border-orange-300 dark:hover:border-orange-700/50 hover:bg-orange-50/50 dark:hover:bg-orange-900/10"
                      : "border-border/50 hover:border-border hover:bg-accent/30"
                  }`}
                  onClick={() => navigate("/tasks")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 space-y-2">
                      <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {task.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        {task.employee && (
                          <div className="flex items-center text-muted-foreground">
                            <span className="truncate max-w-24">
                              • {task.employee.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
                      <Badge
                        className={`${dateInfo.color} border-0 font-semibold text-xs`}
                      >
                        {dateInfo.text}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
