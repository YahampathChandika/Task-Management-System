// ===== 1. Enhanced Task Card Component =====
// src/components/tasks/TaskCard.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  MoreVertical,
  Edit,
  Trash2,
  User,
  Calendar,
  UserPlus,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import TaskFormDialog from "./TaskFormDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";
import TaskAssignDialog from "./TaskAssignDialog";

const getStatusConfig = (status) => {
  switch (status?.toUpperCase()) {
    case "TODO":
      return {
        color:
          "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300",
        icon: "⏳",
        gradient: "from-slate-500 to-slate-600",
      };
    case "IN_PROGRESS":
    case "INPROGRESS":
      return {
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-300",
        icon: "🔄",
        gradient: "from-blue-500 to-blue-600",
      };
    case "COMPLETED":
      return {
        color:
          "bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-300",
        icon: "✅",
        gradient: "from-green-500 to-green-600",
      };
    case "BLOCKED":
      return {
        color: "bg-red-100 text-red-800 dark:bg-red-800/50 dark:text-red-300",
        icon: "🚫",
        gradient: "from-red-500 to-red-600",
      };
    default:
      return {
        color:
          "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300",
        icon: "⏳",
        gradient: "from-slate-500 to-slate-600",
      };
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "No due date";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const isOverdue = (dateString) => {
  if (!dateString) return false;
  const dueDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dueDate < today;
};


export default function TaskCard({ task }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const statusConfig = getStatusConfig(task.status);
  const overdue = isOverdue(task.duedate);

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-card to-card/80 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              {/* Title and Status */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
                  {task.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    className={`${statusConfig.color} border-0 font-medium text-xs px-3 py-1`}
                  >
                    <span className="mr-1">{statusConfig.icon}</span>
                    {task.status || "TODO"}
                  </Badge>
                  {overdue && task.status?.toUpperCase() !== "COMPLETED" && (
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-800/50 dark:text-red-300 border-0 font-medium text-xs px-3 py-1">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Overdue
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-accent"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem
                  onClick={() => setIsEditDialogOpen(true)}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsAssignDialogOpen(true)}
                  className="cursor-pointer"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  {task.employee ? "Reassign" : "Assign"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          {task.description && (
            <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {task.description}
              </p>
            </div>
          )}

          {/* Task Details */}
          <div className="space-y-3">
            {/* Due Date */}
            <div className="flex items-center space-x-3 group/item hover:bg-accent/30 p-2 rounded-lg transition-colors duration-200">
              <div
                className={`p-2 rounded-lg bg-gradient-to-r ${
                  overdue && task.status?.toUpperCase() !== "COMPLETED"
                    ? "from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20"
                    : "from-indigo-50 to-indigo-100 dark:from-indigo-950/20 dark:to-indigo-900/20"
                }`}
              >
                <Calendar
                  className={`h-4 w-4 ${
                    overdue && task.status?.toUpperCase() !== "COMPLETED"
                      ? "text-red-600 dark:text-red-400"
                      : "text-indigo-600 dark:text-indigo-400"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Due Date</p>
                <p
                  className={`text-sm font-medium transition-colors ${
                    overdue && task.status?.toUpperCase() !== "COMPLETED"
                      ? "text-red-600 dark:text-red-400 font-semibold"
                      : "text-foreground group-hover/item:text-primary"
                  }`}
                >
                  {formatDate(task.dueDate)}
                </p>
              </div>
            </div>

            {/* Assignee */}
            <div className="flex items-center space-x-3 group/item hover:bg-accent/30 p-2 rounded-lg transition-colors duration-200">
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20">
                <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Assigned To</p>
                {task.employeeId ? (
                  <div className="flex items-center space-x-2">
                    {/* <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                      {getInitials(task.employeeId)}
                    </div> */}
                    <p className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">
                      ID: {task.employeeId}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-muted-foreground">
                    Unassigned
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
              className="flex-1 border-border/50 hover:border-primary/50 hover:bg-primary/10"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAssignDialogOpen(true)}
              className="flex-1 border-border/50 hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {task.employee ? "Reassign" : "Assign"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <TaskFormDialog
        task={task}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <DeleteTaskDialog
        task={task}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />

      <TaskAssignDialog
        task={task}
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
      />
    </>
  );
}
