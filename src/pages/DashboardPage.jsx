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

export default function DashboardPage() {
  const {
    data: employees = [],
    isLoading: isLoadingEmployees,
    error: employeesError,
  } = useGetEmployeesQuery();
  const {
    data: tasks = [],
    isLoading: isLoadingTasks,
    error: tasksError,
  } = useGetTasksQuery();

  const isLoading = isLoadingEmployees || isLoadingTasks;
  const hasError = employeesError || tasksError;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-48 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Unable to load dashboard
            </h3>
            <p className="text-gray-500">
              Please check your connection and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      {/* Statistics Cards */}
      <StatsCards employees={employees} tasks={tasks} />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
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
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <EmployeeWorkload employees={employees} tasks={tasks} />
      </div>
    </div>
  );
}
