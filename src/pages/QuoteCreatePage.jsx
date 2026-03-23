import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

import QuoteFormBody from "../components/quote/QuoteFormBody";
import { useQuoteForm } from "../hooks/useQuoteForm";
import { quoteService } from "../services/quoteService";

export default function QuoteCreatePage() {
  const navigate = useNavigate();
  const form = useQuoteForm();

  async function onSubmit(data) {
    form.setSaving(true);
    try {
      const created = await quoteService.create(data);
      navigate(`/quotes/${created.id}/preview`);
    } catch (err) {
      const msg = err.response?.data?.message ?? "Erreur lors de l'enregistrement.";
      form.setSnackbar({ open: true, message: msg, severity: "error" });
      form.setSaving(false);
    }
  }

  return (
    <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
      <Typography variant="h1" color="text.primary" sx={{ mb: 3 }}>
        Nouveau devis
      </Typography>

      <QuoteFormBody
        {...form}
        pdfSubtitle="— ou créer manuellement —"
        submitLabel="Enregistrer le devis"
        onCancel={() => navigate("/dashboard")}
      />

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
