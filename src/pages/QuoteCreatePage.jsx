import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

export default function QuoteCreatePage() {
  const navigate = useNavigate();
  const [extracting, setExtracting] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [saving, setSaving] = useState(false);
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

  const { fields: dayFields, append: appendDay, remove: removeDay } = useFieldArray({ control, name: "days" });
  const { fields: inclusionFields, append: appendInclusion, remove: removeInclusion } = useFieldArray({ control, name: "inclusions" });
  const { fields: paymentFields, append: appendPayment, remove: removePayment } = useFieldArray({ control, name: "paymentConditions" });
  const { fields: supplementFields, append: appendSupplement, remove: removeSupplement } = useFieldArray({ control, name: "supplements" });
  const { fields: accommodationFields, append: appendAccommodation, remove: removeAccommodation } = useFieldArray({ control, name: "accommodations" });

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
      const created = await quoteService.create(data);
      navigate(`/quotes/${created.id}/preview`);
    } catch (err) {
      const msg = err.response?.data?.message ?? "Erreur lors de l'enregistrement.";
      setSnackbar({ open: true, message: msg, severity: "error" });
      setSaving(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h1" color="text.primary" sx={{ mb: 3 }}>
        Nouveau devis
      </Typography>

      <PdfUploadZone onExtract={handlePdfExtract} loading={extracting} />

      <Typography sx={{ textAlign: "center", color: "text.secondary", fontSize: 13, my: 3 }}>— ou créer manuellement —</Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <GeneralInfo register={register} control={control} errors={errors} />

        <Divider sx={{ my: 4 }} />

        <CoverImage setValue={setValue} destination={destination} />

        <Divider sx={{ my: 4 }} />

        <DayTabs fields={dayFields} register={register} errors={errors} append={appendDay} remove={removeDay} activeDay={activeDay} setActiveDay={setActiveDay} />

        <Divider sx={{ my: 4 }} />

        <Box>
          <InclusionList fields={inclusionFields} register={register} append={appendInclusion} remove={removeInclusion} />
          <PaymentConditionList fields={paymentFields} register={register} append={appendPayment} remove={removePayment} />
          <SupplementList fields={supplementFields} register={register} append={appendSupplement} remove={removeSupplement} />
          <AccommodationList fields={accommodationFields} register={register} append={appendAccommodation} remove={removeAccommodation} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
          <Button variant="outlined" onClick={() => navigate("/dashboard")} disabled={saving}>
            Annuler
          </Button>
          <Button type="submit" variant="contained" size="large" disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer le devis"}
          </Button>
        </Box>
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
