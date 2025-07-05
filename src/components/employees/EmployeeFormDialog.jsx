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
      if (isEditing) {
        await updateEmployee({ id: employee.id, ...formData }).unwrap();
        toast.success("Employee updated successfully");
      } else {
        await createEmployee(formData).unwrap();
        toast.success("Employee created successfully");
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(
        isEditing ? "Failed to update employee" : "Failed to create employee"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the employee information below."
              : "Fill in the details to create a new employee."}
          </DialogDescription>
        </DialogHeader>
        <EmployeeForm
          employee={employee}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
