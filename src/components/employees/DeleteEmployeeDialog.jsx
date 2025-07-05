// src/components/employees/DeleteEmployeeDialog.jsx
import { useDeleteEmployeeMutation } from "../../store/employeesApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

export default function DeleteEmployeeDialog({ employee, open, onOpenChange }) {
  const [deleteEmployee, { isLoading }] = useDeleteEmployeeMutation();

  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.id).unwrap();
      toast.success("Employee deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gradient-to-br from-background to-background/95 border-0 shadow-2xl">
        <AlertDialogHeader className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <AlertDialogTitle className="text-xl font-semibold text-foreground">
                Delete Employee
              </AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                This action cannot be undone. This will permanently remove{" "}
                <span className="font-semibold text-foreground">
                  {employee?.name}
                </span>{" "}
                from your team.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="space-x-3 pt-6">
          <AlertDialogCancel className="h-11 px-6 border-border/50 hover:bg-accent">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="h-11 px-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Deleting...</span>
              </div>
            ) : (
              "Delete Employee"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
