import { useState, useEffect } from "react";
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
import { useSnackbar } from "../../hooks/useSnackbar";
import { quoteService } from "../../services/quoteService";
import { ALL_STATUSES } from "../../utils/statusConfig";

export default function StatusChangeDialog({ quote, onChanged, onClose }) {
  const [selected, setSelected] = useState("");
  const [saving, setSaving] = useState(false);
  const { showError, SnackbarComponent } = useSnackbar();

  useEffect(() => {
    if (quote) setSelected(quote.status);
  }, [quote]);

  async function handleConfirm() {
    setSaving(true);
    try {
      const updated = await quoteService.updateStatus(quote.id, selected);
      onChanged(updated);
    } catch (err) {
      const msg = err.response?.data?.message ?? "Transition de statut invalide";
      showError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={Boolean(quote)} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: "text.primary" }}>Changer le statut</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Nouveau statut</InputLabel>
          <Select value={selected} label="Nouveau statut" onChange={(e) => setSelected(e.target.value)}>
            {ALL_STATUSES.map((s) => (
              <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Annuler</Button>
        <Button variant="contained" onClick={handleConfirm}
          disabled={saving || selected === quote?.status}
          startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}>
          {saving ? "Enregistrement…" : "Confirmer"}
        </Button>
      </DialogActions>
      {SnackbarComponent}
    </Dialog>
  );
}
