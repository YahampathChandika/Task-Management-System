// src/components/tasks/TaskList.jsx
import { useGetTasksQuery } from "../../store/tasksApi";
import TaskCard from "./TaskCard";
import { Card, CardContent } from "../ui/card";
import { CheckSquare } from "lucide-react";

export default function TaskList({ filter = "all", searchTerm = "" }) {
  const { data: tasks = [], isLoading, error } = useGetTasksQuery();

  // Filter tasks based on both filter and search term
  const filteredTasks = tasks.filter((task) => {
    // First apply status/assignment filter
    let passesFilter = true;
    if (filter === "assigned") passesFilter = task.employeeId > 0;
    else if (filter === "unassigned") passesFilter = task.employeeId === 0;
    else if (filter === "overdue") {
      const dueDate = new Date(task.duedate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      passesFilter =
        task.duedate &&
        dueDate < today &&
        task.status?.toUpperCase() !== "COMPLETED";
    } else if (filter !== "all") {
      passesFilter = task.status?.toUpperCase() === filter.toUpperCase();
    }

    if (!passesFilter) return false;

    // Then apply search term filter
    if (!searchTerm) return true;

    const search = searchTerm.toLowerCase();
    return (
      task.title?.toLowerCase().includes(search) ||
      task.description?.toLowerCase().includes(search) ||
      task.status?.toLowerCase().includes(search) ||
      task.employee?.name?.toLowerCase().includes(search)
    );
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
    const isSearchActive = searchTerm || filter !== "all";

    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isSearchActive ? "No tasks found" : "No tasks found"}
          </h3>
          <p className="text-gray-500">
            {isSearchActive
              ? `No tasks match your current filters${
                  searchTerm ? ` and search for "${searchTerm}"` : ""
                }. Try adjusting your search or filters.`
              : "Get started by creating your first task."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search/Filter Results Info */}
      {(searchTerm || filter !== "all") && (
        <div className="text-sm text-gray-600">
          Found {filteredTasks.length} task
          {filteredTasks.length !== 1 ? "s" : ""}
          {filter !== "all" && ` in "${filter}"`}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      )}

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
