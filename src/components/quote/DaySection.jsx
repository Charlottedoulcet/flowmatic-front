import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DaySection({ index, register, errors, onRemove }) {
  const dayErrors = errors.days?.[index] ?? {};

  return (
    <Box sx={{ bgcolor: "background.default", border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={700} color="primary.main">
          Jour {index + 1}
        </Typography>
        <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={onRemove}>
          Supprimer ce jour
        </Button>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField label="Titre du jour *" {...register(`days.${index}.title`, { required: true })} error={!!dayErrors.title} fullWidth />
        <TextField label="Date (ex: samedi 11 avril)" {...register(`days.${index}.date`)} fullWidth />
        <TextField label="Résumé court (tableau itinéraire)" {...register(`days.${index}.summary`)} fullWidth />
        <TextField label="Nuit à" {...register(`days.${index}.nightLocation`)} fullWidth />
        <TextField label="Description narrative" {...register(`days.${index}.description`)} multiline rows={4} fullWidth sx={{ gridColumn: "1 / -1" }} />
        <TextField label="Durée transport" {...register(`days.${index}.transportDuration`)} fullWidth />
        <TextField label="Repas" {...register(`days.${index}.meals`)} fullWidth />
        <TextField label="Hébergement (nom)" {...register(`days.${index}.accommodationName`)} fullWidth />
        <TextField label="Hébergement (lieu)" {...register(`days.${index}.accommodationLocation`)} fullWidth />
        <TextField label="Type de chambre" {...register(`days.${index}.roomType`)} fullWidth />
        <TextField label="Inclus dans la journée" {...register(`days.${index}.includedInDay`)} fullWidth sx={{ gridColumn: "1 / -1" }} />
      </Box>
    </Box>
  );
}
