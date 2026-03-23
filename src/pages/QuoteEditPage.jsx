import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

import AccommodationList from "../components/quote/AccommodationList";
import CoverImage from "../components/quote/CoverImage";
import DayTabs from "../components/quote/DayTabs";
import GeneralInfo from "../components/quote/GeneralInfo";
import InclusionList from "../components/quote/InclusionList";
import PaymentConditionList from "../components/quote/PaymentConditionList";
import PdfUploadZone from "../components/quote/PdfUploadZone";
import SupplementList from "../components/quote/SupplementList";
import { quoteService } from "../services/quoteService";

const DEFAULT_VALUES = {
  title: "",
  clientName: "",
  clientEmail: "",
  participantCount: 1,
  destination: "",
  travelWishes: "",
  startDate: "",
  endDate: "",
  pricePerPerson: "",
  currency: "EUR",
  coverImageUrl: "",
  days: [],
  inclusions: [],
  paymentConditions: [],
  supplements: [],
  accommodations: [],
};

export default function QuoteEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [extracting, setExtracting] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [saving, setSaving] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: DEFAULT_VALUES });

  const destination = watch("destination");
  const coverImageUrl = watch("coverImageUrl");

  const { fields: dayFields, append: appendDay, remove: removeDay } = useFieldArray({ control, name: "days" });
  const { fields: inclusionFields, append: appendInclusion, remove: removeInclusion } = useFieldArray({ control, name: "inclusions" });
  const { fields: paymentFields, append: appendPayment, remove: removePayment } = useFieldArray({ control, name: "paymentConditions" });
  const { fields: supplementFields, append: appendSupplement, remove: removeSupplement } = useFieldArray({ control, name: "supplements" });
  const { fields: accommodationFields, append: appendAccommodation, remove: removeAccommodation } = useFieldArray({ control, name: "accommodations" });

  useEffect(() => {
    quoteService
      .getById(id)
      .then((quote) => {
        reset(quote);
        setActiveDay(0);
      })
      .catch(() => setLoadError("Impossible de charger le devis. Vérifiez l'URL."))
      .finally(() => setLoading(false));
  }, [id, reset]);

  async function handlePdfExtract(file) {
    setExtracting(true);
    try {
      const extracted = await quoteService.extract(file);
      reset(extracted);
      setActiveDay(0);
      setSnackbar({ open: true, message: "PDF extrait avec succès ! Vérifiez les données.", severity: "success" });
    } catch (err) {
      const msg = err.response?.data?.message ?? "Échec de l'extraction. Réessayez.";
      setSnackbar({ open: true, message: msg, severity: "error" });
    } finally {
      setExtracting(false);
    }
  }

  async function onSubmit(data) {
    setSaving(true);
    try {
      const updated = await quoteService.update(id, data);
      navigate(`/quotes/${updated.id}/preview`);
    } catch (err) {
      const msg = err.response?.data?.message ?? "Erreur lors de l'enregistrement.";
      setSnackbar({ open: true, message: msg, severity: "error" });
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await quoteService.delete(id);
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message ?? "Erreur lors de la suppression.";
      setSnackbar({ open: true, message: msg, severity: "error" });
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h1">Modifier le devis</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" color="error" onClick={() => setDeleteDialog(true)}>
            Supprimer ce devis
          </Button>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer les modifications"}
          </Button>
        </Box>
      </Box>

      <PdfUploadZone onExtract={handlePdfExtract} loading={extracting} />

      <Typography sx={{ textAlign: "center", color: "text.secondary", fontSize: 13, my: 3 }}>— ou modifier les champs ci-dessous —</Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <GeneralInfo register={register} control={control} errors={errors} />

        <Divider sx={{ my: 4 }} />

        <CoverImage setValue={setValue} destination={destination} currentImageUrl={coverImageUrl} />

        <Divider sx={{ my: 4 }} />

        <DayTabs fields={dayFields} register={register} errors={errors} append={appendDay} remove={removeDay} activeDay={activeDay} setActiveDay={setActiveDay} />

        <Divider sx={{ my: 4 }} />

        <Box>
          <InclusionList fields={inclusionFields} register={register} append={appendInclusion} remove={removeInclusion} />
          <PaymentConditionList fields={paymentFields} register={register} append={appendPayment} remove={removePayment} />
          <SupplementList fields={supplementFields} register={register} append={appendSupplement} remove={removeSupplement} />
          <AccommodationList fields={accommodationFields} register={register} append={appendAccommodation} remove={removeAccommodation} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
          <Button variant="outlined" color="error" onClick={() => setDeleteDialog(true)}>
            Supprimer ce devis
          </Button>
          <Button type="submit" variant="contained" size="large" disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer les modifications"}
          </Button>
        </Box>
      </Paper>

      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Supprimer ce devis ?</DialogTitle>
        <DialogContent>
          <Typography>Cette action est irréversible. Toutes les données du devis (jours, inclusions, hébergements) seront définitivement supprimées.</Typography>
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

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
