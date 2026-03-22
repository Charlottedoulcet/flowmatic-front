import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

function Lbl({ children }) {
  return (
    <Typography variant="formLabel" component="label">
      {children}
    </Typography>
  );
}

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
          <Lbl>Titre *</Lbl>
          <TextField
            placeholder="ex: Bienvenue au Guatemala !"
            size="small"
            {...register(`days.${index}.title`, { required: true })}
            error={!!dayErrors.title}
            fullWidth
          />
        </Box>
        <Box>
          <Lbl>Date</Lbl>
          <TextField
            placeholder="ex: samedi 11 avril"
            size="small"
            {...register(`days.${index}.date`)}
            fullWidth
          />
        </Box>
        <Box>
          <Lbl>Résumé (tableau itinéraire)</Lbl>
          <TextField
            placeholder="ex: Arrivée, transfert Antigua"
            size="small"
            {...register(`days.${index}.summary`)}
            fullWidth
          />
        </Box>
        <Box>
          <Lbl>Nuit à</Lbl>
          <TextField
            placeholder="ex: Antigua"
            size="small"
            {...register(`days.${index}.nightLocation`)}
            fullWidth
          />
        </Box>
        <Box sx={{ gridColumn: "1 / -1" }}>
          <Lbl>Description narrative</Lbl>
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
          <Lbl>Hébergement (nom)</Lbl>
          <TextField
            placeholder="ex: Mesón de María 3*"
            size="small"
            {...register(`days.${index}.accommodationName`)}
            fullWidth
          />
        </Box>
        <Box>
          <Lbl>Lieu hébergement</Lbl>
          <TextField
            placeholder="ex: Antigua"
            size="small"
            {...register(`days.${index}.accommodationLocation`)}
            fullWidth
          />
        </Box>
        <Box>
          <Lbl>Type de chambre</Lbl>
          <TextField
            placeholder="ex: 1 double + 1 simple"
            size="small"
            {...register(`days.${index}.roomType`)}
            fullWidth
          />
        </Box>
        <Box>
          <Lbl>Durée transport</Lbl>
          <TextField
            placeholder="ex: 1h15"
            size="small"
            {...register(`days.${index}.transportDuration`)}
            fullWidth
          />
        </Box>
        <Box>
          <Lbl>Repas</Lbl>
          <TextField
            placeholder="ex: Dîner"
            size="small"
            {...register(`days.${index}.meals`)}
            fullWidth
          />
        </Box>
        <Box sx={{ gridColumn: "1 / -1" }}>
          <Lbl>Inclus dans la journée</Lbl>
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
