export const STATUS_CONFIG = {
  PENDING: { label: "En attente", color: "warning" },
  SENT: { label: "Envoyé", color: "primary" },
  SIGNED: { label: "Signé", color: "success" },
  PAID: { label: "Payé", color: "success" },
  CANCELLED: { label: "Annulé", color: "error" },
};

export const ALL_STATUSES = Object.entries(STATUS_CONFIG).map(([value, { label }]) => ({ value, label }));
