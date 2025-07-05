// src/components/tasks/TaskList.jsx
import { useGetTasksQuery } from "../../store/tasksApi";
import TaskCard from "./TaskCard";
import { Card, CardContent } from "../ui/card";
import { CheckSquare, Search, Filter } from "lucide-react";

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse shadow-sm border-0">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-5 bg-muted/70 rounded w-3/4"></div>
                    <div className="h-4 bg-muted/50 rounded w-1/3"></div>
                  </div>
                  <div className="h-6 w-6 bg-muted/50 rounded"></div>
                </div>
                <div className="h-16 bg-muted/30 rounded-lg"></div>
                <div className="space-y-3">
                  <div className="h-12 bg-muted/50 rounded-lg"></div>
                  <div className="h-12 bg-muted/50 rounded-lg"></div>
                </div>
                <div className="h-10 bg-muted/50 rounded-lg"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="shadow-sm border-0 bg-gradient-to-br from-card to-card/80">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-2xl flex items-center justify-center mb-4">
            <CheckSquare className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Error loading tasks
          </h3>
          <p className="text-muted-foreground">
            Please check your connection and try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (filteredTasks.length === 0) {
    const isSearchActive = searchTerm || filter !== "all";

    return (
      <Card className="shadow-sm border-0 bg-gradient-to-br from-card to-card/80">
        <CardContent className="p-12 text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl flex items-center justify-center mb-6">
            {isSearchActive ? (
              <Search className="h-10 w-10 text-muted-foreground" />
            ) : (
              <CheckSquare className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {isSearchActive ? "No tasks found" : "No tasks yet"}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {isSearchActive
              ? `No tasks match your current filters${
                  searchTerm ? ` and search for "${searchTerm}"` : ""
                }. Try adjusting your search or filters.`
              : "Get started by creating your first task to begin managing your project workflow."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search/Filter Results Info */}
      {(searchTerm || filter !== "all") && (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/20">
              {searchTerm ? (
                <Search className="h-4 w-4 text-primary" />
              ) : (
                <Filter className="h-4 w-4 text-primary" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Found {filteredTasks.length} task
                {filteredTasks.length !== 1 ? "s" : ""}
                {filter !== "all" && ` in "${filter}"`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
              <p className="text-xs text-muted-foreground">
                {searchTerm && filter !== "all"
                  ? `Filtering by status and searching in title, description, and assignee`
                  : searchTerm
                  ? `Searching in title, description, status, and assignee`
                  : `Filtered by ${filter} status`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
