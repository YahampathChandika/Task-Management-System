// src/components/dashboard/RecentTasks.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case "TODO":
      return "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300";
    case "IN_PROGRESS":
    case "INPROGRESS":
      return "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-300";
    case "COMPLETED":
      return "bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-300";
    case "BLOCKED":
      return "bg-red-100 text-red-800 dark:bg-red-800/50 dark:text-red-300";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300";
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

  const recentTasks = tasks.slice().reverse().slice(0, 5);

  return (
    <Card className="shadow-sm border-0 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20">
            <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <CardTitle className="text-lg font-semibold text-foreground">
            Recent Tasks
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
        {recentTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">No tasks yet</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/tasks")}
              className="hover:bg-primary/10"
            >
              Create your first task
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="group p-4 rounded-lg border border-border/50 hover:border-border hover:bg-accent/30 transition-all duration-200 cursor-pointer"
                onClick={() => navigate("/tasks")}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 space-y-2">
                    <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {task.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <Badge
                        className={getStatusColor(task.status)}
                        variant="secondary"
                      >
                        {task.status || "TODO"}
                      </Badge>
                      {task.duedate && (
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {formatDate(task.duedate)}
                        </div>
                      )}
                      {task.employee && (
                        <div className="flex items-center text-muted-foreground">
                          <User className="mr-1 h-3 w-3" />
                          <span className="truncate max-w-20">
                            {task.employee.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
