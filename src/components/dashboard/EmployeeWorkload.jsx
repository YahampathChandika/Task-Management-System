// src/components/dashboard/EmployeeWorkload.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmployeeWorkload({ employees = [], tasks = [] }) {
  const navigate = useNavigate();

  // Calculate workload for each employee
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
    .sort((a, b) => b.totalTasks - a.totalTasks); // Sort by task count

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">
          Employee Workload
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/employees")}
          className="text-blue-600 hover:text-blue-700"
        >
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {employeeWorkload.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p>No employees yet</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => navigate("/employees")}
            >
              Add your first employee
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {employeeWorkload.slice(0, 5).map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {employee.name}
                  </h4>
                  <p className="text-xs text-gray-500">{employee.position}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {employee.activeTasks} active
                    </p>
                    <p className="text-xs text-gray-500">
                      {employee.completionRate}% completed
                    </p>
                  </div>
                  <Badge
                    variant={
                      employee.activeTasks > 5
                        ? "destructive"
                        : employee.activeTasks > 2
                        ? "default"
                        : "secondary"
                    }
                  >
                    {employee.totalTasks} tasks
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
