// src/components/employees/EmployeeForm.jsx
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function EmployeeForm({
  employee = null,
  onSubmit,
  isLoading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        position: employee.position || "",
      });
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            className="h-11 border-border/50 focus:border-primary bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="position"
            className="text-sm font-medium text-foreground"
          >
            Position
          </Label>
          <Input
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g., Frontend Developer"
            required
            className="h-11 border-border/50 focus:border-primary bg-background"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@company.com"
          required
          className="h-11 border-border/50 focus:border-primary bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-foreground">
          Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          required
          className="h-11 border-border/50 focus:border-primary bg-background"
        />
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
          ) : employee ? (
            "Update Employee"
          ) : (
            "Create Employee"
          )}
        </Button>
      </div>
    </form>
  );
}
