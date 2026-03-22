import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function PaymentConditionList({ fields, register, append, remove }) {
  return (
    <Accordion defaultExpanded={fields.length > 0} sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Conditions de paiement</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <IconButton
            size="small"
            title="Ajouter une condition"
            onClick={() => append({ description: "", percentage: "", dueDateDescription: "" })}
            sx={{ bgcolor: "success.light", color: "success.dark", width: 28, height: 28,
              "&:hover": { bgcolor: "success.main", color: "common.white" } }}
          >
            <AddIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        {fields.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            Aucune condition. Cliquez sur + pour commencer.
          </Typography>
        )}

        {fields.map((field, index) => (
          <Box key={field.id} sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr auto", gap: 1, mb: 1, alignItems: "start" }}>
            <TextField label="Description" {...register(`paymentConditions.${index}.description`)} size="small" />
            <TextField label="%" type="number" {...register(`paymentConditions.${index}.percentage`, { valueAsNumber: true })} size="small" />
            <TextField label="Échéance" {...register(`paymentConditions.${index}.dueDateDescription`)} size="small" />
            <IconButton size="small" color="error" onClick={() => remove(index)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
