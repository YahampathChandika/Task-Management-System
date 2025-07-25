// src/pages/EmployeesPage.jsx
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus, Search, X, Users } from "lucide-react";
import EmployeeList from "../components/employees/EmployeeList";
import EmployeeFormDialog from "../components/employees/EmployeeFormDialog";

export default function EmployeesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                <Users className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Team Members
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Manage your team and track their information
            </p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full sm:w-auto h-11 px-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Employee
          </Button>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by name, email, position, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-12 h-12 border-border/50 focus:border-primary bg-background shadow-sm"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Employee List */}
      <EmployeeList searchTerm={searchTerm} />

      {/* Add Employee Dialog */}
      <EmployeeFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}
