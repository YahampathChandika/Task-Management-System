// src/pages/TasksPage.jsx
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus, Search, Filter, X, CheckSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import TaskList from "../components/tasks/TaskList";
import TaskFormDialog from "../components/tasks/TaskFormDialog";

const filterOptions = [
  { value: "all", label: "All Tasks", icon: "📋" },
  { value: "todo", label: "To Do", icon: "⏳" },
  { value: "in_progress", label: "In Progress", icon: "🔄" },
  { value: "completed", label: "Completed", icon: "✅" },
  { value: "assigned", label: "Assigned", icon: "👤" },
  { value: "unassigned", label: "Unassigned", icon: "👤" },
  { value: "overdue", label: "Overdue", icon: "⚠️" },
];

export default function TasksPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const hasActiveFilters = searchTerm || statusFilter !== "all";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
                <CheckSquare className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Project Tasks
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Manage your project tasks and track progress
            </p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full sm:w-auto h-11 px-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Task
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col justify-between lg:flex-row gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by title, description, status, or assignee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-12 h-12 border-border/50 focus:border-primary bg-background shadow-sm"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full  w-[180px] h-12 border-border/50 focus:border-primary bg-background shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="h-12 px-4 border-border/50 hover:bg-accent"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Task List */}
      <TaskList filter={statusFilter} searchTerm={searchTerm} />

      {/* Add Task Dialog */}
      <TaskFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}
