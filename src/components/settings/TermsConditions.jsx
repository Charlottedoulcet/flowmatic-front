import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { agencyService } from "../../services/agencyService";
import { useSnackbar } from "../../hooks/useSnackbar";

export default function TermsConditions({ agency, onUpdate }) {
  const [terms, setTerms] = useState(agency?.termsAndConditions ?? "");
  const [saving, setSaving] = useState(false);
  const { showSuccess, showError, SnackbarComponent } = useSnackbar();

  async function handleSave() {
    setSaving(true);
    try {
      const updated = await agencyService.updateAgency({
        ...agency,
        termsAndConditions: terms,
      });
      onUpdate(updated);
      showSuccess("CGV sauvegardées");
    } catch {
      showError("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box sx={{ mb: 3, p: 3, bgcolor: "background.paper", borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Conditions générales de vente
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        Affichées en bas de chaque devis dans l'aperçu client.
      </Typography>

      <TextField multiline rows={10} fullWidth value={terms} onChange={(e) => setTerms(e.target.value)} placeholder="Saisissez vos conditions générales de vente…" sx={{ mb: 2 }} />

      <Button variant="contained" onClick={handleSave} disabled={saving} startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}>
        {saving ? "Sauvegarde…" : "Sauvegarder les CGV"}
      </Button>

      {SnackbarComponent}
    </Box>
  );
}
