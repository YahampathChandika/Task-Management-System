// src/components/tasks/TaskAssignDialog.jsx
import { useState } from "react";
import { useGetEmployeesQuery } from "../../store/employeesApi";
import { useAssignTaskMutation } from "../../store/tasksApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

export default function TaskAssignDialog({ task, open, onOpenChange }) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const { data: employees = [], isLoading: isLoadingEmployees } =
    useGetEmployeesQuery();
  const [assignTask, { isLoading: isAssigning }] = useAssignTaskMutation();

  const handleAssign = async () => {
    if (!selectedEmployeeId) {
      toast.error("Please select an employee");
      return;
    }

    try {
      await assignTask({
        id: task.id,
        employeeId: parseInt(selectedEmployeeId),
      }).unwrap();
      toast.success("Task assigned successfully");
      onOpenChange(false);
      setSelectedEmployeeId("");
    } catch (error) {
      toast.error("Failed to assign task");
    }
  };

  const handleUnassign = async () => {
    try {
      await assignTask({
        id: task.id,
        employeeId: 0,
      }).unwrap();
      toast.success("Task unassigned successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to unassign task");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Assign Task</DialogTitle>
          <DialogDescription>
            Assign "{task?.title}" to an employee.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {task?.employee && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Currently assigned to:</p>
              <p className="font-medium">{task.employee.name}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="employee">Select Employee</Label>
            <Select
              value={selectedEmployeeId}
              onValueChange={setSelectedEmployeeId}
              disabled={isLoadingEmployees}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose an employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id.toString()}>
                    {employee.name} - {employee.position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            {task?.employee && (
              <Button
                variant="outline"
                onClick={handleUnassign}
                disabled={isAssigning}
              >
                Unassign
              </Button>
            )}
            <Button
              onClick={handleAssign}
              disabled={isAssigning || !selectedEmployeeId}
            >
              {isAssigning ? "Assigning..." : "Assign"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
