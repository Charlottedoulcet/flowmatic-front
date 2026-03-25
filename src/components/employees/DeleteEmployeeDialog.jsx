import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "../../hooks/useSnackbar";
import { userService } from "../../services/userService";

export default function DeleteEmployeeDialog({ employeeId, onDeleted, onClose }) {
  const [deleting, setDeleting] = useState(false);
  const { showError, SnackbarComponent } = useSnackbar();

  async function handleConfirm() {
    setDeleting(true);
    try {
      await userService.delete(employeeId);
      onDeleted(employeeId);
    } catch (err) {
      const msg = err.response?.data?.message ?? "Impossible de supprimer l'employé";
      showError(msg);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={Boolean(employeeId)} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Supprimer cet employé ?</DialogTitle>
      <DialogContent>
        <Typography color="text.secondary">Cette action est irréversible.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleting}>
          Annuler
        </Button>
        <Button variant="contained" color="error" onClick={handleConfirm} disabled={deleting} startIcon={deleting ? <CircularProgress size={16} color="inherit" /> : null}>
          {deleting ? "Suppression…" : "Supprimer"}
        </Button>
      </DialogActions>
      {SnackbarComponent}
    </Dialog>
  );
}
