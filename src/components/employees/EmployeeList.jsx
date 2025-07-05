// src/components/employees/EmployeeList.jsx
import { useGetEmployeesQuery } from "../../store/employeesApi";
import EmployeeCard from "./EmployeeCard";
import { Card, CardContent } from "../ui/card";
import { Users } from "lucide-react";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-red-500">
            Error loading employees. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  if (filteredEmployees.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? "No employees found" : "No employees found"}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? `No employees match "${searchTerm}". Try a different search term.`
              : "Get started by adding your first employee."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Results Info */}
      {searchTerm && (
        <div className="text-sm text-gray-600">
          Found {filteredEmployees.length} employee
          {filteredEmployees.length !== 1 ? "s" : ""}
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      )}

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}
