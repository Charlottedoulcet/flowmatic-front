import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StatusChip from "../shared/StatusChip";

export default function RecentQuotesList({ quotes, userId, onStatusChange, onView, onEdit, onDelete, onAddNew }) {
  const [filter, setFilter] = useState("mine");

  const displayedQuotes = filter === "mine" ? quotes.filter((q) => q.createdById === userId) : quotes;

  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="h2" color="text.primary">
          Devis récents
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button size="small" variant={filter === "mine" ? "contained" : "outlined"} onClick={() => setFilter("mine")}>
            Mes devis
          </Button>
          <Button size="small" variant={filter === "all" ? "contained" : "outlined"} onClick={() => setFilter("all")}>
            Tous les devis
          </Button>
        </Box>
      </Box>

      {quotes.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 10, border: "1px dashed", borderColor: "divider", borderRadius: 2, m: 2 }}>
          <Typography variant="h2" color="text.secondary" gutterBottom>
            Aucun devis pour l'instant
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Créez votre premier devis pour commencer.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={onAddNew}>
            Créer un devis
          </Button>
        </Box>
      ) : (
        <TableContainer sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Réf</TableCell>
                <TableCell>Voyage</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell align="right">Prix / pers.</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {displayedQuotes.map((quote) => (
                <TableRow key={quote.id} hover>
                  <TableCell sx={{ fontWeight: 600, color: "primary.main" }}>{quote.referenceNumber}</TableCell>
                  <TableCell>{quote.title}</TableCell>
                  <TableCell>{quote.clientName}</TableCell>
                  <TableCell>{quote.destination}</TableCell>
                  <TableCell>
                    <StatusChip status={quote.status} />
                  </TableCell>
                  <TableCell align="right">{quote.pricePerPerson != null ? `${Number(quote.pricePerPerson).toLocaleString("fr-FR")} €` : "—"}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
                      <Tooltip title="Voir l'aperçu">
                        <IconButton size="small" onClick={() => onView(quote.id)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Modifier">
                        <IconButton size="small" onClick={() => onEdit(quote.id)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Changer le statut">
                        <IconButton size="small" onClick={() => onStatusChange(quote)}>
                          <SwapHorizIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton size="small" sx={{ color: "error.main" }} onClick={() => onDelete(quote.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
