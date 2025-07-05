// src/components/dashboard/EmployeeWorkload.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmployeeWorkload({ employees = [], tasks = [] }) {
  const navigate = useNavigate();

  const employeeWorkload = employees
    .map((employee) => {
      const assignedTasks = tasks.filter(
        (task) => task.employeeId === employee.id
      );
      const completedTasks = assignedTasks.filter(
        (task) => task.status?.toUpperCase() === "COMPLETED"
      );
      const activeTasks = assignedTasks.filter(
        (task) => task.status?.toUpperCase() !== "COMPLETED"
      );

      return {
        ...employee,
        totalTasks: assignedTasks.length,
        completedTasks: completedTasks.length,
        activeTasks: activeTasks.length,
        completionRate:
          assignedTasks.length > 0
            ? Math.round((completedTasks.length / assignedTasks.length) * 100)
            : 0,
      };
    })
    .sort((a, b) => b.totalTasks - a.totalTasks);

  return (
    <Card className="shadow-sm border-0 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-950/20 dark:to-cyan-900/20">
            <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          </div>
          <CardTitle className="text-lg font-semibold text-foreground">
            Team Workload
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/employees")}
          className="text-primary hover:text-primary/80 hover:bg-primary/10"
        >
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {employeeWorkload.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">No employees yet</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/employees")}
              className="hover:bg-primary/10"
            >
              Add your first employee
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {employeeWorkload.slice(0, 5).map((employee) => (
              <div
                key={employee.id}
                className="group p-4 rounded-lg border border-border/50 hover:border-border hover:bg-accent/30 transition-all duration-200 cursor-pointer"
                onClick={() => navigate("/employees")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {employee.name}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {employee.position}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 md:space-x-6 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-foreground">
                        {employee.activeTasks} active
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {employee.completionRate}% completed
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${
                        employee.activeTasks > 5
                          ? "bg-red-100 text-red-800 dark:bg-red-800/50 dark:text-red-300"
                          : employee.activeTasks > 2
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-800/50 dark:text-orange-300"
                          : "bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-300"
                      } border-0 font-semibold`}
                    >
                      {employee.totalTasks}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
                {/* Mobile stats */}
                <div className="mt-3 sm:hidden flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    {employee.activeTasks} active tasks
                  </span>
                  <span className="text-muted-foreground">
                    {employee.completionRate}% completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
