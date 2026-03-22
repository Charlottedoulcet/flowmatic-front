import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Icon from "@mui/material/Icon";

export default function AccommodationList({ fields, register, append, remove }) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <IconButton size="small" title="Ajouter un hébergement" onClick={() => append({ name: "", location: "", rating: "", description: "", displayOrder: fields.length + 1 })} sx={{ bgcolor: "success.light", color: "success.dark", width: 28, height: 28, "&:hover": { bgcolor: "success.main", color: "common.white" } }}>
          <AddIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {fields.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Aucun hébergement. Cliquez sur + pour commencer.
        </Typography>
      )}

      {fields.map((field, index) => (
        <Box key={field.id} sx={{ mb: 2, p: 2, border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <IconButton size="small" color="error" onClick={() => remove(index)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField label="Nom *" {...register(`accommodations.${index}.name`)} size="small" />
            <TextField label="Lieu *" {...register(`accommodations.${index}.location`)} size="small" />
            <TextField label="Catégorie (ex: 4*)" {...register(`accommodations.${index}.rating`)} size="small" />
            <TextField label="Description" {...register(`accommodations.${index}.description`)} size="small" multiline rows={2} sx={{ gridColumn: "1 / -1" }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
