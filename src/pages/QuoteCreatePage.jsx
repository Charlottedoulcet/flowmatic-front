import { useNavigate, useBlocker } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import QuoteFormBody from "../components/quote/QuoteFormBody";
import { useQuoteForm } from "../hooks/useQuoteForm";
import { quoteService } from "../services/quoteService";

export default function QuoteCreatePage() {
  const navigate = useNavigate();
  const form = useQuoteForm();

  const blocker = useBlocker(({ currentLocation, nextLocation }) =>
    form.isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  async function onSubmit(data) {
    form.setSaving(true);
    try {
      const created = await quoteService.create(data);
      form.reset(data);
      navigate(`/quotes/${created.id}/preview`);
    } catch (err) {
      const msg = err.response?.data?.message ?? "Erreur lors de l'enregistrement.";
      form.showError(msg);
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

      {form.SnackbarComponent}

      <Dialog open={blocker.state === "blocked"} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: "text.primary" }}>Quitter sans enregistrer ?</DialogTitle>
        <DialogContent>
          <Typography>Vos modifications seront perdues si vous quittez cette page.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => blocker.reset()}>Rester sur la page</Button>
          <Button variant="contained" color="error" onClick={() => blocker.proceed()}>
            Quitter sans enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
