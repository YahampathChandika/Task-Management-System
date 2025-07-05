// src/components/employees/EmployeeList.jsx
import { useGetEmployeesQuery } from "../../store/employeesApi";
import EmployeeCard from "./EmployeeCard";
import { Card, CardContent } from "../ui/card";
import { Users, Search } from "lucide-react";

export default function EmployeeList({ searchTerm = "" }) {
  const { data: employees = [], isLoading, error } = useGetEmployeesQuery();

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) => {
    if (!searchTerm) return true;

    const search = searchTerm.toLowerCase();
    return (
      employee.name?.toLowerCase().includes(search) ||
      employee.email?.toLowerCase().includes(search) ||
      employee.position?.toLowerCase().includes(search) ||
      employee.phone?.toLowerCase().includes(search)
    );
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-muted/70 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted/70 rounded w-3/4"></div>
                  <div className="h-3 bg-muted/50 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-12 bg-muted/50 rounded-lg"></div>
                <div className="h-12 bg-muted/50 rounded-lg"></div>
                <div className="h-10 bg-muted/50 rounded-lg"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="shadow-sm border-0 bg-gradient-to-br from-card to-card/80">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-2xl flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Error loading employees
          </h3>
          <p className="text-muted-foreground">
            Please check your connection and try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (filteredEmployees.length === 0) {
    return (
      <Card className="shadow-sm border-0 bg-gradient-to-br from-card to-card/80">
        <CardContent className="p-12 text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl flex items-center justify-center mb-6">
            {searchTerm ? (
              <Search className="h-10 w-10 text-muted-foreground" />
            ) : (
              <Users className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {searchTerm ? "No employees found" : "No employees yet"}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {searchTerm
              ? `No employees match "${searchTerm}". Try adjusting your search terms or check the spelling.`
              : "Get started by adding your first team member to begin managing your workforce."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Results Info */}
      {searchTerm && (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Search className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Found {filteredEmployees.length} employee
                {filteredEmployees.length !== 1 ? "s" : ""} for "{searchTerm}"
              </p>
              <p className="text-xs text-muted-foreground">
                Showing results from name, email, position, and phone number
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}
