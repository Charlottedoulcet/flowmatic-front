import Chip from "@mui/material/Chip";

const STATUS_CONFIG = {
  PENDING: { label: "En attente", color: "warning" },
  SENT: { label: "Envoyé", color: "primary" },
  SIGNED: { label: "Signé", color: "success" },
  PAID: { label: "Payé", color: "success" },
  CANCELLED: { label: "Annulé", color: "error" },
};

export default function StatusChip({ status }) {
  const config = STATUS_CONFIG[status] ?? { label: status, color: "default" };

  return <Chip label={config.label} color={config.color} size="small" variant="filled" />;
}
