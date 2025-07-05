// src/components/employees/EmployeeFormDialog.jsx
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../store/employeesApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import EmployeeForm from "./EmployeeForm";
import { toast } from "sonner";
import { UserPlus, Edit } from "lucide-react";

export default function EmployeeFormDialog({
  employee = null,
  open,
  onOpenChange,
}) {
  const [createEmployee, { isLoading: isCreating }] =
    useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const isEditing = !!employee;
  const isLoading = isCreating || isUpdating;

  const handleSubmit = async (formData) => {
    try {
      let result;
      if (isEditing) {
        result = await updateEmployee({
          id: employee.id,
          ...formData,
        }).unwrap();
        toast.success("Employee updated successfully");
      } else {
        result = await createEmployee(formData).unwrap();
        toast.success("Employee created successfully");
      }

      // Close dialog only on success
      onOpenChange(false);

      // Force a small delay to ensure cache invalidation has processed
      setTimeout(() => {
        console.log("Employee operation completed, cache should be updated");
      }, 100);
    } catch (error) {
      console.error("Employee operation failed:", error);
      toast.error(
        isEditing
          ? "Failed to update employee. Please try again."
          : "Failed to create employee. Please try again."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background to-background/95 border-0 shadow-2xl">
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
                <UserPlus className="h-6 w-6" />
              )}
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-foreground">
                {isEditing ? "Edit Employee" : "Add New Employee"}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {isEditing
                  ? "Update the employee information below."
                  : "Fill in the details to create a new team member."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="pt-6">
          <EmployeeForm
            employee={employee}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
