// src/pages/DashboardPage.jsx
import { useGetEmployeesQuery } from "../store/employeesApi";
import { useGetTasksQuery } from "../store/tasksApi";
import StatsCards from "../components/dashboard/StatsCards";
import TaskStatusChart from "../components/dashboard/TaskStatusChart";
import RecentTasks from "../components/dashboard/RecentTasks";
import QuickActions from "../components/dashboard/QuickActions";
import EmployeeWorkload from "../components/dashboard/EmployeeWorkload";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import { Card, CardContent } from "../components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";

export default function DashboardPage() {
  const {
    data: employees = [],
    isLoading: isLoadingEmployees,
    error: employeesError,
    refetch: refetchEmployees,
  } = useGetEmployeesQuery();
  const {
    data: tasks = [],
    isLoading: isLoadingTasks,
    error: tasksError,
    refetch: refetchTasks,
  } = useGetTasksQuery();

  const isLoading = isLoadingEmployees || isLoadingTasks;
  const hasError = employeesError || tasksError;

  const handleRetry = () => {
    refetchEmployees();
    refetchTasks();
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="h-20 bg-muted/50 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="h-48 bg-muted/50 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full shadow-sm border-0">
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-2xl flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Unable to load dashboard
              </h3>
              <p className="text-muted-foreground">
                Please check your connection and try again.
              </p>
            </div>
            <Button onClick={handleRetry} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      {/* Statistics Cards */}
      <StatsCards employees={employees} tasks={tasks} />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Span 2 columns on large screens */}
        <div className="lg:col-span-2 space-y-6">
          <TaskStatusChart tasks={tasks} />
          <RecentTasks tasks={tasks} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />
          <UpcomingDeadlines tasks={tasks} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1">
        <EmployeeWorkload employees={employees} tasks={tasks} />
      </div>
    </div>
  );
}
