import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

import { useAuth } from "../context/useAuth";
import { quoteService } from "../services/quoteService";
import StatCard from "../components/StatCard";
import RecentQuotesList from "../components/RecentQuoteList";

const ALL_STATUSES = [
  { value: "PENDING", label: "En attente" },
  { value: "SENT", label: "Envoyé" },
  { value: "SIGNED", label: "Signé" },
  { value: "PAID", label: "Payé" },
  { value: "CANCELLED", label: "Annulé" },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusDialog, setStatusDialog] = useState({
    open: false,
    quoteId: null,
    currentStatus: "",
    selectedStatus: "",
    saving: false,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const pending = quotes.filter((q) => q.status === "PENDING").length;
  const signed = quotes.filter((q) => q.status === "SIGNED").length;
  const ca = quotes.reduce((sum, q) => sum + (q.pricePerPerson ?? 0), 0);

  useEffect(() => {
    quoteService
      .getAll()
      .then(setQuotes)
      .catch(() => setError("Impossible de charger les devis. Réessayez."))
      .finally(() => setLoading(false));
  }, []);

  function openStatusDialog(quote) {
    setStatusDialog({
      open: true,
      quoteId: quote.id,
      currentStatus: quote.status,
      selectedStatus: quote.status,
      saving: false,
    });
  }

  function closeStatusDialog() {
    setStatusDialog((prev) => ({ ...prev, open: false }));
  }

  async function handleStatusSave() {
    setStatusDialog((prev) => ({ ...prev, saving: true }));
    try {
      const updated = await quoteService.updateStatus(statusDialog.quoteId, statusDialog.selectedStatus);
      setQuotes((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
      setSnackbar({ open: true, message: "Statut mis à jour", severity: "success" });
      closeStatusDialog();
    } catch (err) {
      const msg = err.response?.data?.message ?? "Transition de statut invalide";
      setSnackbar({ open: true, message: msg, severity: "error" });
      setStatusDialog((prev) => ({ ...prev, saving: false }));
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h1" color="text.primary">Tableau de bord</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/quotes/new")}>
          Nouveau devis
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3, mt: 1 }}>
        <StatCard title="Total devis" value={quotes.length} />
        <StatCard title="En attente" value={pending} color="warning.main" />
        <StatCard title="Signés" value={signed} color="success.main" />
        <StatCard title="CA total" value={`${ca.toLocaleString("fr-FR")} €`} />
      </Box>

      <RecentQuotesList quotes={quotes} userId={user?.id} onStatusChange={openStatusDialog} onView={(id) => navigate(`/quotes/${id}/preview`)} onEdit={(id) => navigate(`/quotes/${id}/edit`)} onDelete={(id) => console.log("TODO supprimer", id)} onAddNew={() => navigate("/quotes/new")} />

      <Dialog open={statusDialog.open} onClose={closeStatusDialog} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: "text.primary" }}>Changer le statut</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Nouveau statut</InputLabel>
            <Select value={statusDialog.selectedStatus} label="Nouveau statut" onChange={(e) => setStatusDialog((prev) => ({ ...prev, selectedStatus: e.target.value }))}>
              {ALL_STATUSES.map((s) => (
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeStatusDialog} disabled={statusDialog.saving}>
            Annuler
          </Button>
          <Button variant="contained" onClick={handleStatusSave} disabled={statusDialog.saving || statusDialog.selectedStatus === statusDialog.currentStatus}>
            {statusDialog.saving ? "Enregistrement..." : "Confirmer"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
