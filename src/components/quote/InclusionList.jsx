import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";

export default function InclusionList({ fields, register, append, remove }) {
  return (
    <Accordion defaultExpanded={fields.length > 0} sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Inclus / Non inclus</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* Boutons d'ajout — cercles colorés alignés à droite */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5, mb: 1 }}>
          <IconButton
            size="small"
            title="Ajouter inclus"
            onClick={() => append({ description: "", included: true })}
            sx={{ bgcolor: "success.light", color: "success.dark", width: 28, height: 28,
              "&:hover": { bgcolor: "success.main", color: "common.white" } }}
          >
            <AddIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            size="small"
            title="Ajouter non inclus"
            onClick={() => append({ description: "", included: false })}
            sx={{ bgcolor: "error.light", color: "error.dark", width: 28, height: 28,
              "&:hover": { bgcolor: "error.main", color: "common.white" } }}
          >
            <RemoveIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        {fields.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            Aucune inclusion. Utilisez les boutons + / − pour commencer.
          </Typography>
        )}

        {fields.map((field, index) => (
          <Box key={field.id} sx={{ display: "flex", gap: 1, mb: 1, alignItems: "center" }}>
            <Chip label={field.included ? "Inclus" : "Non inclus"} color={field.included ? "success" : "error"} size="small" sx={{ minWidth: 90 }} />
            <TextField {...register(`inclusions.${index}.description`)} placeholder="Description" size="small" fullWidth />
            <IconButton size="small" color="error" onClick={() => remove(index)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
