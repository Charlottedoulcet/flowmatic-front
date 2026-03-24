import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { formatDate } from "../../../utils/formatDate";

function InfoCell({ label, children }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "11px",
          color: "text.disabled",
          textTransform: "uppercase",
          fontWeight: 600,
          mb: 0.25,
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}

export default function PreviewInfoGrid({ quote }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 2,
        mb: 4,
      }}
    >
      <InfoCell label="Destination">
        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>{quote.destination}</Typography>
      </InfoCell>

      <InfoCell label="Dates">
        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
          {formatDate(quote.startDate)} — {formatDate(quote.endDate)}
        </Typography>
      </InfoCell>

      <InfoCell label="Prix par personne">
        <Typography sx={{ fontSize: "18px", fontWeight: 700, color: "primary.main" }}>
          {quote.pricePerPerson?.toLocaleString("fr-FR")} {quote.currency}
        </Typography>
      </InfoCell>

      <InfoCell label="Référence">
        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>{quote.referenceNumber}</Typography>
      </InfoCell>
    </Box>
  );
}
