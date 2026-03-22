import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function GeneralInfo({ register, errors }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Informations générales
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField label="Titre du voyage *" {...register("title", { required: "Le titre est obligatoire" })} error={!!errors.title} helperText={errors.title?.message} fullWidth />
        <TextField label="Destination *" {...register("destination", { required: "La destination est obligatoire" })} error={!!errors.destination} helperText={errors.destination?.message} fullWidth />
        <TextField label="Nom du client *" {...register("clientName", { required: "Le nom du client est obligatoire" })} error={!!errors.clientName} helperText={errors.clientName?.message} fullWidth />
        <TextField label="Email du client" type="email" {...register("clientEmail")} fullWidth />
        <TextField label="Date de départ *" type="date" {...register("startDate", { required: "La date de départ est obligatoire" })} error={!!errors.startDate} helperText={errors.startDate?.message} slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        <TextField label="Date de retour *" type="date" {...register("endDate", { required: "La date de retour est obligatoire" })} error={!!errors.endDate} helperText={errors.endDate?.message} slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        <TextField label="Nombre de participants *" type="number" {...register("participantCount", { required: true, min: 1, valueAsNumber: true })} error={!!errors.participantCount} helperText={errors.participantCount && "Minimum 1 participant"} fullWidth />
        <TextField label="Prix par personne (€) *" type="number" {...register("pricePerPerson", { required: true, min: 0.01, valueAsNumber: true })} error={!!errors.pricePerPerson} helperText={errors.pricePerPerson && "Le prix doit être supérieur à 0"} fullWidth />
        <TextField label="Souhaits de voyage" {...register("travelWishes")} multiline rows={3} fullWidth sx={{ gridColumn: "1 / -1" }} />
      </Box>
    </Box>
  );
}
