// src/components/tasks/TaskList.jsx
import { useGetTasksQuery } from "../../store/tasksApi";
import TaskCard from "./TaskCard";
import { Card, CardContent } from "../ui/card";
import { CheckSquare } from "lucide-react";

export default function TaskList({ filter = "all" }) {
  const { data: tasks = [], isLoading, error } = useGetTasksQuery();

  // Filter tasks based on the filter prop
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "assigned") return task.employeeId > 0;
    if (filter === "unassigned") return task.employeeId === 0;
    if (filter === "overdue") {
      const dueDate = new Date(task.duedate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return task.duedate && dueDate < today;
    }
    return task.status?.toUpperCase() === filter.toUpperCase();
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-red-500">
            Error loading tasks. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === "all" ? "No tasks found" : `No ${filter} tasks found`}
          </h3>
          <p className="text-gray-500">
            {filter === "all"
              ? "Get started by creating your first task."
              : "Try adjusting your filter or create new tasks."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
