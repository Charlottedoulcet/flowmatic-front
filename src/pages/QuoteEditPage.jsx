import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

import QuoteFormBody from "../components/quote/QuoteFormBody";
import { useQuoteForm } from "../hooks/useQuoteForm";
import { quoteService } from "../services/quoteService";

export default function QuoteEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const form = useQuoteForm();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    quoteService
      .getById(id)
      .then((quote) => {
        form.reset(quote);
        form.setActiveDay(0);
      })
      .catch(() => setLoadError("Impossible de charger le devis. Vérifiez l'URL."))
      .finally(() => setLoading(false));
  }, [id]);

  async function onSubmit(data) {
    form.setSaving(true);
    try {
      const updated = await quoteService.update(id, data);
      navigate(`/quotes/${updated.id}/preview`);
    } catch (err) {
      const msg = err.response?.data?.message ?? "Erreur lors de l'enregistrement.";
      form.setSnackbar({ open: true, message: msg, severity: "error" });
      form.setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await quoteService.delete(id);
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message ?? "Erreur lors de la suppression.";
      form.setSnackbar({ open: true, message: msg, severity: "error" });
      setDeleting(false);
      setDeleteDialog(false);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (loadError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{loadError}</Alert>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h1">Modifier le devis</Typography>
        <Button variant="outlined" color="error" onClick={() => setDeleteDialog(true)}>
          Supprimer ce devis
        </Button>
      </Box>

      <QuoteFormBody
        {...form}
        pdfSubtitle="— ou modifier les champs ci-dessous —"
        submitLabel="Enregistrer les modifications"
        onDelete={() => setDeleteDialog(true)}
      />

      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: "text.primary" }}>Supprimer ce devis ?</DialogTitle>
        <DialogContent>
          <Typography>
            Cette action est irréversible. Toutes les données du devis (jours, inclusions, hébergements) seront définitivement supprimées.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)} disabled={deleting}>
            Annuler
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Suppression…" : "Supprimer définitivement"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={form.snackbar.open}
        autoHideDuration={4000}
        onClose={() => form.setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={form.snackbar.severity}
          variant="filled"
          onClose={() => form.setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {form.snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
