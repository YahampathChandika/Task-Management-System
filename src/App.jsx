// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "./components/ui/sonner";

// Placeholder components - you'll create these later
function DashboardPage() {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="text-gray-600 mt-2">
        Welcome to your task management system!
      </p>
    </div>
  );
}

function EmployeesPage() {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold">Employees</h2>
      <p className="text-gray-600 mt-2">Employee management coming soon...</p>
    </div>
  );
}

function TasksPage() {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold">Tasks</h2>
      <p className="text-gray-600 mt-2">Task management coming soon...</p>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route index element={<DashboardPage />} />
                    <Route path="employees" element={<EmployeesPage />} />
                    <Route path="tasks" element={<TasksPage />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </Provider>
  );
}
