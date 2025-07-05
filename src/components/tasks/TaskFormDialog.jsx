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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the task information below."
              : "Fill in the details to create a new task."}
          </DialogDescription>
        </DialogHeader>
        <TaskForm task={task} onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
