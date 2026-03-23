import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import AccommodationList from "./AccommodationList";
import CoverImage from "./CoverImage";
import DayTabs from "./DayTabs";
import GeneralInfo from "./GeneralInfo";
import InclusionList from "./InclusionList";
import PaymentConditionList from "./PaymentConditionList";
import PdfUploadZone from "./PdfUploadZone";
import SupplementList from "./SupplementList";

export default function QuoteFormBody({ register, control, errors, setValue, destination, coverImageUrl, dayFields, appendDay, removeDay, inclusionFields, appendInclusion, removeInclusion, paymentFields, appendPayment, removePayment, supplementFields, appendSupplement, removeSupplement, accommodationFields, appendAccommodation, removeAccommodation, extracting, handlePdfExtract, pdfSubtitle, activeDay, setActiveDay, saving, submitLabel, onCancel, onDelete }) {
  return (
    <>
      <PdfUploadZone onExtract={handlePdfExtract} loading={extracting} />

      <Typography sx={{ textAlign: "center", color: "text.secondary", fontSize: 13, my: 3 }}>{pdfSubtitle}</Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <GeneralInfo register={register} control={control} errors={errors} />

        <Divider sx={{ my: 4 }} />

        <CoverImage setValue={setValue} destination={destination} currentImageUrl={coverImageUrl} />

        <Divider sx={{ my: 4 }} />

        <DayTabs
          form={{ register, errors }}
          fieldArray={{ fields: dayFields, append: appendDay, remove: removeDay }}
          activeDay={activeDay}
          setActiveDay={setActiveDay}
        />

        <Divider sx={{ my: 4 }} />

        <Box>
          <InclusionList fields={inclusionFields} register={register} append={appendInclusion} remove={removeInclusion} />
          <PaymentConditionList fields={paymentFields} register={register} append={appendPayment} remove={removePayment} />
          <SupplementList fields={supplementFields} register={register} append={appendSupplement} remove={removeSupplement} />
          <AccommodationList fields={accommodationFields} register={register} append={appendAccommodation} remove={removeAccommodation} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
          <Box>
            {onDelete && (
              <Button variant="outlined" color="error" onClick={onDelete}>
                Supprimer ce devis
              </Button>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            {onCancel && (
              <Button variant="outlined" onClick={onCancel} disabled={saving}>
                Annuler
              </Button>
            )}
            <Button type="submit" variant="contained" size="large" disabled={saving}>
              {saving ? "Enregistrement…" : submitLabel}
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
