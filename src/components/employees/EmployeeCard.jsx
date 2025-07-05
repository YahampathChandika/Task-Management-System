// src/components/employees/EmployeeCard.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MoreVertical, Edit, Trash2, Mail, Phone, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import EmployeeFormDialog from "./EmployeeFormDialog";
import DeleteEmployeeDialog from "./DeleteEmployeeDialog";

const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarGradient = (id) => {
  const gradients = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-green-500 to-green-600",
    "from-orange-500 to-orange-600",
    "from-pink-500 to-pink-600",
    "from-indigo-500 to-indigo-600",
    "from-red-500 to-red-600",
    "from-cyan-500 to-cyan-600",
  ];
  return gradients[id % gradients.length];
};

export default function EmployeeCard({ employee }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <Card className="group transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-card to-card/80 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4 flex-1">
              {/* Avatar */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getAvatarGradient(
                  employee.id
                )} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {getInitials(employee.name)}
              </div>

              {/* Name and Position */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors truncate">
                  {employee.name}
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-0 font-medium text-xs"
                >
                  {employee.position}
                </Badge>
              </div>
            </div>

            {/* Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 transition-opacity duration-200 hover:bg-accent"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => setIsEditDialogOpen(true)}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Contact Information */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 group/item hover:bg-accent/30 p-2 rounded-lg transition-colors duration-200">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground truncate group-hover/item:text-primary transition-colors">
                  {employee.email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 group/item hover:bg-accent/30 p-2 rounded-lg transition-colors duration-200">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
                <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">
                  {employee.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex space-x-2 pt-2 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
              className="flex-1 border-border/50 hover:border-primary/50 hover:bg-primary/10"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="flex-1 border-border/50 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div> */}
        </CardContent>
      </Card>

      <EmployeeFormDialog
        employee={employee}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <DeleteEmployeeDialog
        employee={employee}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
