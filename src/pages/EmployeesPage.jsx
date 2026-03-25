import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { userService } from "../services/userService";
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeFormDialog from "../components/employees/EmployeeFormDialog";
import DeleteEmployeeDialog from "../components/employees/DeleteEmployeeDialog";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formTarget, setFormTarget] = useState(undefined);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    userService
      .getAll()
      .then(setEmployees)
      .catch(() => setError("Impossible de charger les employés."))
      .finally(() => setLoading(false));
  }, []);

  function handleSaved(saved) {
    setEmployees((prev) => (prev.some((e) => e.id === saved.id) ? prev.map((e) => (e.id === saved.id ? saved : e)) : [...prev, saved]));
    setFormTarget(undefined);
  }

  function handleDeleted(id) {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    setDeleteTarget(null);
  }

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h1">Employés</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setFormTarget(null)}>
          Nouvel employé
        </Button>
      </Box>

      <EmployeeTable employees={employees} onEdit={setFormTarget} onDelete={setDeleteTarget} />

      <EmployeeFormDialog open={formTarget !== undefined} employee={formTarget ?? null} onSaved={handleSaved} onClose={() => setFormTarget(undefined)} />

      <DeleteEmployeeDialog employeeId={deleteTarget} onDeleted={handleDeleted} onClose={() => setDeleteTarget(null)} />
    </Box>
  );
}
