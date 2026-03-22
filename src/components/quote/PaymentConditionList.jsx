import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
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

export default function PaymentConditionList({ fields, register, append, remove }) {
  return (
    <Accordion defaultExpanded={fields.length > 0}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h3">Conditions de paiement</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell sx={{ width: 80 }}>%</TableCell>
              <TableCell>Échéance</TableCell>
              <TableCell sx={{ width: 48, textAlign: "right" }}>
                <IconButton
                  size="small"
                  title="Ajouter une condition"
                  onClick={() => append({ description: "", percentage: "", dueDateDescription: "" })}
                  sx={{ bgcolor: "primary.light", color: "primary.dark", width: 22, height: 22 }}
                >
                  <AddIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: "center", color: "text.secondary", py: 2 }}>
                  Aucune condition. Cliquez sur + pour commencer.
                </TableCell>
              </TableRow>
            ) : (
              fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>
                    <TextField
                      {...register(`paymentConditions.${index}.description`)}
                      variant="standard"
                      placeholder="Description"
                      size="small"
                      fullWidth
                      slotProps={{ input: { disableUnderline: true } }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      {...register(`paymentConditions.${index}.percentage`, { valueAsNumber: true, min: 0, max: 100 })}
                      variant="standard"
                      placeholder="20"
                      size="small"
                      slotProps={{ input: { disableUnderline: true }, htmlInput: { min: 0, max: 100 } }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...register(`paymentConditions.${index}.dueDateDescription`)}
                      variant="standard"
                      placeholder="ex: À la réservation"
                      size="small"
                      fullWidth
                      slotProps={{ input: { disableUnderline: true } }}
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
