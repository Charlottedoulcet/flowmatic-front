import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";

export default function InclusionList({ fields, register, append, remove }) {
  return (
    <Accordion defaultExpanded={fields.length > 0}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h3">Inclus / Non inclus</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell sx={{ width: 120 }}>Inclus ?</TableCell>
              <TableCell sx={{ width: 64, textAlign: "right" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
                  <IconButton
                    size="small"
                    title="Ajouter inclus"
                    onClick={() => append({ description: "", included: true })}
                    sx={{ bgcolor: "primary.light", color: "primary.dark", width: 22, height: 22 }}
                  >
                    <AddIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    title="Ajouter non inclus"
                    onClick={() => append({ description: "", included: false })}
                    sx={{ bgcolor: "primary.light", color: "primary.dark", width: 22, height: 22 }}
                  >
                    <RemoveIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: "center", color: "text.secondary", py: 2 }}>
                  Aucune inclusion. Utilisez les boutons + / − pour commencer.
                </TableCell>
              </TableRow>
            ) : (
              fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>
                    <TextField
                      {...register(`inclusions.${index}.description`)}
                      variant="standard"
                      placeholder="Description"
                      size="small"
                      fullWidth
                      slotProps={{ input: { disableUnderline: true } }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={field.included ? "Inclus" : "Non inclus"}
                      color={field.included ? "primary" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <IconButton size="small" color="error" onClick={() => remove(index)}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
}
