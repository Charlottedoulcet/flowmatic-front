import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import FormLabel from "../shared/FormLabel";

export default function DaySection({ index, register, errors, onRemove }) {
  const dayErrors = errors.days?.[index] ?? {};

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
        "& .MuiOutlinedInput-root": { bgcolor: "background.paper" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: "primary.main" }}>
          Jour {index + 1}
        </Typography>
        <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={onRemove}>
          Supprimer ce jour
        </Button>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <Box>
          <FormLabel>Titre *</FormLabel>
          <TextField
            placeholder="ex: Bienvenue au Guatemala !"
            size="small"
            {...register(`days.${index}.title`, { required: true })}
            error={!!dayErrors.title}
            fullWidth
          />
        </Box>
        <Box>
          <FormLabel>Date</FormLabel>
          <TextField
            placeholder="ex: samedi 11 avril"
            size="small"
            {...register(`days.${index}.date`)}
            fullWidth
          />
        </Box>
        <Box>
          <FormLabel>Résumé (tableau itinéraire)</FormLabel>
          <TextField
            placeholder="ex: Arrivée, transfert Antigua"
            size="small"
            {...register(`days.${index}.summary`)}
            fullWidth
          />
        </Box>
        <Box>
          <FormLabel>Nuit à</FormLabel>
          <TextField
            placeholder="ex: Antigua"
            size="small"
            {...register(`days.${index}.nightLocation`)}
            fullWidth
          />
        </Box>
        <Box sx={{ gridColumn: "1 / -1" }}>
          <FormLabel>Description narrative</FormLabel>
          <TextField
            placeholder="Accueil à l'aéroport, route vers Antigua..."
            size="small"
            {...register(`days.${index}.description`)}
            multiline
            rows={4}
            fullWidth
          />
        </Box>
        <Box>
          <FormLabel>Hébergement (nom)</FormLabel>
          <TextField
            placeholder="ex: Mesón de María 3*"
            size="small"
            {...register(`days.${index}.accommodationName`)}
            fullWidth
          />
        </Box>
        <Box>
          <FormLabel>Lieu hébergement</FormLabel>
          <TextField
            placeholder="ex: Antigua"
            size="small"
            {...register(`days.${index}.accommodationLocation`)}
            fullWidth
          />
        </Box>
        <Box>
          <FormLabel>Type de chambre</FormLabel>
          <TextField
            placeholder="ex: 1 double + 1 simple"
            size="small"
            {...register(`days.${index}.roomType`)}
            fullWidth
          />
        </Box>
        <Box>
          <FormLabel>Durée transport</FormLabel>
          <TextField
            placeholder="ex: 1h15"
            size="small"
            {...register(`days.${index}.transportDuration`)}
            fullWidth
          />
        </Box>
        <Box>
          <FormLabel>Repas</FormLabel>
          <TextField
            placeholder="ex: Dîner"
            size="small"
            {...register(`days.${index}.meals`)}
            fullWidth
          />
        </Box>
        <Box sx={{ gridColumn: "1 / -1" }}>
          <FormLabel>Inclus dans la journée</FormLabel>
          <TextField
            placeholder="ex: Transfert aéroport, accueil, carte SIM"
            size="small"
            {...register(`days.${index}.includedInDay`)}
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );
}
