import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "../../hooks/useSnackbar";
import { quoteService } from "../../services/quoteService";

export default function DeleteQuoteDialog({ quoteId, onDeleted, onClose }) {
  const [deleting, setDeleting] = useState(false);
  const { showError, SnackbarComponent } = useSnackbar();

  async function handleConfirm() {
    setDeleting(true);
    try {
      await quoteService.delete(quoteId);
      onDeleted(quoteId);
    } catch {
      showError("Impossible de supprimer le devis. Réessayez.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={Boolean(quoteId)} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: "text.primary" }}>Supprimer le devis</DialogTitle>
      <DialogContent>
        <Typography color="text.secondary">
          Cette action est irréversible. Le devis sera définitivement supprimé.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleting}>Annuler</Button>
        <Button variant="contained" color="error" onClick={handleConfirm} disabled={deleting}
          startIcon={deleting ? <CircularProgress size={16} color="inherit" /> : null}>
          {deleting ? "Suppression…" : "Supprimer"}
        </Button>
      </DialogActions>
      {SnackbarComponent}
    </Dialog>
  );
}
