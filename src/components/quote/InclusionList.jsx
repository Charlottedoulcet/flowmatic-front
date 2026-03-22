import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export default function InclusionList({ fields, register, append, remove }) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6"> Inclus/Non inclus</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button size="small" startIcon={<AddIcon />} onClick={() => append({ description: "", included: true })}>
            + Inclus
          </Button>
          <Button size="small" variant="outlined" startIcon={<AddIcon />} onClick={() => append({ description: "", included: false })}>
            + Non inclus
          </Button>
        </Box>
      </Box>

      {fields.length === 0 && (
        <Typography variant="body2" color="text.secondary ">
          Aucune inclusion. Cliquez sur "+ Inclus" ou "+ Non inclus" pour commencer.
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
    </Box>
  );
}
