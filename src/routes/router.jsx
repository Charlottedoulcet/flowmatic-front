import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

// Décommente au fur et à mesure des tâches :
// import DashboardPage from '../pages/DashboardPage';       // T-2.4
// import QuoteCreatePage from '../pages/QuoteCreatePage';   // T-3.4
// import QuoteEditPage from '../pages/QuoteEditPage';       // T-3.5
// import QuotePreviewPage from '../pages/QuotePreviewPage'; // T-4.1
// import SettingsPage from '../pages/SettingsPage';         // T-6.2
// import EmployeesPage from '../pages/EmployeesPage';       // T-5.2

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <div>Tableau de bord — T-2.4</div>
      </ProtectedRoute>
    ),
  },

  {
    path: "/quotes/new",
    element: (
      <ProtectedRoute>
        <RoleRoute role="EMPLOYEE">
          <div>Nouveau devis — T-3.4</div>
        </RoleRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/quotes/:id/edit",
    element: (
      <ProtectedRoute>
        <RoleRoute role="EMPLOYEE">
          <div>Modifier devis — T-3.5</div>
        </RoleRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/quotes/:id/preview",
    element: (
      <ProtectedRoute>
        <div>Aperçu devis — T-4.1</div>
      </ProtectedRoute>
    ),
  },

  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <RoleRoute role="ADMIN">
          <div>Paramètres — T-6.2</div>
        </RoleRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/employees",
    element: (
      <ProtectedRoute>
        <RoleRoute role="ADMIN">
          <div>Employés — T-5.2</div>
        </RoleRoute>
      </ProtectedRoute>
    ),
  },

  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
