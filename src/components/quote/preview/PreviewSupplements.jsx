import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SectionTitle from "./SectionTitle";

export default function PreviewSupplements({ supplements, currency }) {
  if (!supplements?.length) return null;

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <SectionTitle>Suppléments optionnels</SectionTitle>
      <Paper>
        {supplements.map((sup, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2.5,
              py: 1.5,
              borderBottom: index < supplements.length - 1 ? "1px solid" : "none",
              borderColor: "divider",
            }}
          >
            <Typography variant="body2">{sup.description}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, ml: 2, flexShrink: 0 }}>
              {sup.pricePerPerson ? `${sup.pricePerPerson.toLocaleString("fr-FR")} ${sup.currency ?? currency} / pers.` : sup.totalPrice ? `${sup.totalPrice.toLocaleString("fr-FR")} ${sup.currency ?? currency}` : ""}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
