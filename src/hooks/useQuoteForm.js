import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { quoteService } from "../services/quoteService";
import { useSnackbar } from "./useSnackbar";

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

export function useQuoteForm() {
  const [extracting, setExtracting] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [saving, setSaving] = useState(false);
  const { showSuccess, showError, SnackbarComponent } = useSnackbar();

  const { register, control, handleSubmit, reset, watch, setValue, formState: { errors, isDirty } } =
    useForm({ defaultValues: DEFAULT_VALUES });

  const destination = watch("destination");
  const coverImageUrl = watch("coverImageUrl");

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
      showSuccess("PDF extrait avec succès ! Vérifiez les données.");
    } catch (err) {
      const msg = err.response?.data?.message ?? "Échec de l'extraction. Réessayez.";
      showError(msg);
    } finally {
      setExtracting(false);
    }
  }

  return {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    errors,
    isDirty,
    destination,
    coverImageUrl,
    dayFields, appendDay, removeDay,
    inclusionFields, appendInclusion, removeInclusion,
    paymentFields, appendPayment, removePayment,
    supplementFields, appendSupplement, removeSupplement,
    accommodationFields, appendAccommodation, removeAccommodation,
    extracting,
    handlePdfExtract,
    activeDay,
    setActiveDay,
    saving,
    setSaving,
    showSuccess,
    showError,
    SnackbarComponent,
  };
}
