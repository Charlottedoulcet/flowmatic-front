import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "./ProtectedLayout";
import RoleRoute from "./RoleRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import QuoteCreatePage from "../pages/QuoteCreatePage";
import QuoteEditPage from "../pages/QuoteEditPage";
// import QuotePreviewPage from '../pages/QuotePreviewPage'; // T-4.1
// import SettingsPage from '../pages/SettingsPage';         // T-6.2
// import EmployeesPage from '../pages/EmployeesPage';       // T-5.2

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  {
    element: (
      <ProtectedRoute>
        <ProtectedLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      {
        path: "/quotes/new",
        element: (
          <RoleRoute role="EMPLOYEE">
            <QuoteCreatePage />
          </RoleRoute>
        ),
      },
      {
        path: "/quotes/:id/edit",
        element: (
          <RoleRoute role="EMPLOYEE">
            <QuoteEditPage />
          </RoleRoute>
        ),
      },
      { path: "/quotes/:id/preview", element: <div>Aperçu devis — T-4.1</div> },
      {
        path: "/settings",
        element: (
          <RoleRoute role="ADMIN">
            <div>Paramètres — T-6.2</div>
          </RoleRoute>
        ),
      },
      {
        path: "/employees",
        element: (
          <RoleRoute role="ADMIN">
            <div>Employés — T-5.2</div>
          </RoleRoute>
        ),
      },
    ],
  },

  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
