// src/components/tasks/TaskFormDialog.jsx
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../store/tasksApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import TaskForm from "./TaskForm";
import { toast } from "sonner";
import { Plus, Edit } from "lucide-react";

export default function TaskFormDialog({ task = null, open, onOpenChange }) {
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const isEditing = !!task;
  const isLoading = isCreating || isUpdating;

  const handleSubmit = async (formData) => {
    try {
      if (isEditing) {
        await updateTask({ id: task.id, ...formData }).unwrap();
        toast.success("Task updated successfully");
      } else {
        await createTask(formData).unwrap();
        toast.success("Task created successfully");
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(
        isEditing ? "Failed to update task" : "Failed to create task"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background to-background/95 border-0 shadow-2xl">
        <DialogHeader className="space-y-4 pb-6 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div
              className={`p-3 rounded-xl bg-gradient-to-r ${
                isEditing
                  ? "from-blue-500 to-blue-600"
                  : "from-green-500 to-green-600"
              } text-white shadow-lg`}
            >
              {isEditing ? (
                <Edit className="h-6 w-6" />
              ) : (
                <Plus className="h-6 w-6" />
              )}
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-foreground">
                {isEditing ? "Edit Task" : "Create New Task"}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {isEditing
                  ? "Update the task information and track progress."
                  : "Fill in the details to create a new task for your project."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="pt-6">
          <TaskForm task={task} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
