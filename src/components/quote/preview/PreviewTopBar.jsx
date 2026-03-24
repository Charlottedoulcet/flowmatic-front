import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import StatusChip from "../../shared/StatusChip";

export default function PreviewTopbar({ status, showEdit, onBack, onEdit }) {
  return (
    <Box
      component="header"
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        px: 4,
        py: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "@media print": { display: "none" },
      }}
    >
      <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ color: "text.secondary" }}>
        Retour au tableau de bord
      </Button>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Button size="small" variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
          Télécharger PDF
        </Button>
        {showEdit && (
          <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={onEdit}>
            Modifier
          </Button>
        )}
        <StatusChip status={status} />
      </Box>
    </Box>
  );
}
