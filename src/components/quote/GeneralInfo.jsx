import { Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormLabel from "../shared/FormLabel";

export default function GeneralInfo({ register, control, errors }) {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Informations générales
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <Box>
          <FormLabel>Titre du voyage *</FormLabel>
          <TextField
            placeholder="ex: Immersion au Guatemala en famille"
            size="small"
            {...register("title", { required: "Le titre est obligatoire" })}
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
          />
        </Box>
        <Box>
          <FormLabel>Nom du client *</FormLabel>
          <TextField
            placeholder="ex: Anna Saulnier"
            size="small"
            {...register("clientName", { required: "Le nom du client est obligatoire" })}
            error={!!errors.clientName}
            helperText={errors.clientName?.message}
            fullWidth
          />
        </Box>
        <Box>
          <FormLabel>Destination *</FormLabel>
          <TextField
            placeholder="ex: Guatemala & Belize"
            size="small"
            {...register("destination", { required: "La destination est obligatoire" })}
            error={!!errors.destination}
            helperText={errors.destination?.message}
            fullWidth
          />
        </Box>
        <Box>
          <FormLabel>Nombre de participants *</FormLabel>
          <TextField
            type="number"
            placeholder="3"
            size="small"
            {...register("participantCount", { required: true, min: 1, valueAsNumber: true })}
            error={!!errors.participantCount}
            helperText={errors.participantCount && "Minimum 1 participant"}
            fullWidth
            slotProps={{ htmlInput: { min: 1 } }}
          />
        </Box>

        <Box>
          <FormLabel>Date de début *</FormLabel>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: "La date de départ est obligatoire" }}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                size="small"
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
                fullWidth
                onClick={(e) => e.currentTarget.querySelector("input")?.showPicker?.()}
              />
            )}
          />
        </Box>
        <Box>
          <FormLabel>Date de fin *</FormLabel>
          <Controller
            name="endDate"
            control={control}
            rules={{ required: "La date de retour est obligatoire" }}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                size="small"
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
                fullWidth
                onClick={(e) => e.currentTarget.querySelector("input")?.showPicker?.()}
              />
            )}
          />
        </Box>

        <Box>
          <FormLabel>Prix par personne (€) *</FormLabel>
          <TextField
            type="number"
            placeholder="3990"
            size="small"
            {...register("pricePerPerson", { required: true, valueAsNumber: true })}
            error={!!errors.pricePerPerson}
            helperText={errors.pricePerPerson && "Le prix est obligatoire"}
            fullWidth
            sx={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none" },
              "& input[type=number]": { MozAppearance: "textfield" },
            }}
          />
        </Box>
        <Box>
          <FormLabel>Devise</FormLabel>
          <TextField
            placeholder="EUR"
            size="small"
            {...register("currency")}
            fullWidth
          />
        </Box>
        <Box sx={{ gridColumn: "1 / -1" }}>
          <FormLabel>Email du client</FormLabel>
          <TextField
            type="email"
            placeholder="ex: anna@email.com"
            size="small"
            {...register("clientEmail")}
            fullWidth
          />
        </Box>
        <Box sx={{ gridColumn: "1 / -1" }}>
          <FormLabel>Souhaits de voyage</FormLabel>
          <TextField
            placeholder="Le Guatemala authentique, entre culture maya et nature luxuriante..."
            size="small"
            {...register("travelWishes")}
            multiline
            rows={3}
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );
}
