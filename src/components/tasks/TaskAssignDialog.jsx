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
import { UserPlus, User } from "lucide-react";

const getInitials = (name) => {
  return (
    name
      ?.split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2) || "??"
  );
};

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
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-background to-background/95 border-0 shadow-2xl">
        <DialogHeader className="space-y-4 pb-6 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
              <UserPlus className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-foreground">
                Assign Task
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Assign "{task?.title}" to a team member
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-6">
          {/* Current Assignment */}
          {task?.employee && (
            <div className="p-4 bg-gradient-to-r from-accent/30 to-accent/20 rounded-lg border border-border/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {getInitials(task.employee.name)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Currently assigned to
                  </p>
                  <p className="font-semibold text-foreground">
                    {task.employee.name}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Employee Selection */}
          <div className="space-y-3">
            <Label
              htmlFor="employee"
              className="text-sm font-medium text-foreground"
            >
              Select Team Member
            </Label>
            <Select
              value={selectedEmployeeId}
              onValueChange={setSelectedEmployeeId}
              disabled={isLoadingEmployees}
            >
              <SelectTrigger className="h-11 border-border/50 focus:border-primary bg-background">
                <SelectValue
                  placeholder={
                    isLoadingEmployees
                      ? "Loading employees..."
                      : "Choose a team member"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id.toString()}>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                        {getInitials(employee.name)}
                      </div>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {employee.position}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-border/50">
            {task?.employee && (
              <Button
                variant="outline"
                onClick={handleUnassign}
                disabled={isAssigning}
                className="h-11 px-6 border-border/50 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
              >
                {isAssigning ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                    <span>Unassigning...</span>
                  </div>
                ) : (
                  "Unassign"
                )}
              </Button>
            )}
            <Button
              onClick={handleAssign}
              disabled={isAssigning || !selectedEmployeeId}
              className="h-11 px-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isAssigning ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  <span>Assigning...</span>
                </div>
              ) : (
                "Assign Task"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
