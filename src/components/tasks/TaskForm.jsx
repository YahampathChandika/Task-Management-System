// src/components/tasks/TaskForm.jsx
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const statusOptions = [
  { value: "TODO", label: "To Do", icon: "⏳" },
  { value: "IN_PROGRESS", label: "In Progress", icon: "🔄" },
  { value: "COMPLETED", label: "Completed", icon: "✅" },
  { value: "BLOCKED", label: "Blocked", icon: "🚫" },
];

export default function TaskForm({ task = null, onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO",
    duedate: "",
    employeeId: 0,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "TODO",
        duedate: task.duedate ? task.duedate.split("T")[0] : "",
        employeeId: task.employeeId || 0,
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      duedate: formData.duedate ? formData.duedate : "",
    };

    onSubmit(submitData);
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-foreground">
          Task Title
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter a clear, descriptive task title"
          required
          className="h-11 border-border/50 focus:border-primary bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-sm font-medium text-foreground"
        >
          Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Provide detailed information about the task requirements and expectations"
          rows={4}
          className="border-border/50 focus:border-primary bg-background resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="status"
            className="text-sm font-medium text-foreground"
          >
            Status
          </Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleChange("status", value)}
          >
            <SelectTrigger className="h-11 border-border/50 focus:border-primary bg-background">
              <SelectValue placeholder="Select task status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
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

        <div className="space-y-2">
          <Label
            htmlFor="duedate"
            className="text-sm font-medium text-foreground"
          >
            Due Date
          </Label>
          <Input
            id="duedate"
            type="date"
            value={formData.duedate}
            onChange={(e) => handleChange("duedate", e.target.value)}
            className="h-11 border-border/50 focus:border-primary bg-background"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-border/50">
        <Button
          type="submit"
          disabled={isLoading}
          className="px-8 h-11 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              <span>Saving...</span>
            </div>
          ) : task ? (
            "Update Task"
          ) : (
            "Create Task"
          )}
        </Button>
      </div>
    </form>
  );
}
