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

const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case "TODO":
      return "bg-gray-100 text-gray-800";
    case "IN_PROGRESS":
    case "INPROGRESS":
      return "bg-blue-100 text-blue-800";
    case "COMPLETED":
      return "bg-green-100 text-green-800";
    case "BLOCKED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
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

  const overdue = isOverdue(task.dueDate);

  return (
    <>
      <Card className="w-full hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
          <div className="space-y-2 flex-1">
            <h3 className="font-semibold text-lg leading-none pr-2">
              {task.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge className={getStatusColor(task.status)}>
                {task.status || "TODO"}
              </Badge>
              {overdue && (
                <Badge variant="destructive" className="text-xs">
                  Overdue
                </Badge>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsAssignDialogOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                {task.employee ? "Reassign" : "Assign"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="space-y-3">
          {task.description && (
            <p className="text-sm text-gray-600 line-clamp-3">
              {task.description}
            </p>
          )}

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span className={overdue ? "text-red-600 font-medium" : ""}>
              {formatDate(task.dueDate)}
            </span>
          </div>

          {task.employee ? (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{task.employee.name}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <User className="h-4 w-4" />
              <span>Unassigned</span>
            </div>
          )}
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
