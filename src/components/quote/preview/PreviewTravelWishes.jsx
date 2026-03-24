import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SectionTitle from "./SectionTitle";

export default function PreviewTravelWishes({ travelWishes }) {
  if (!travelWishes) return null;

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <SectionTitle>Vos envies de voyage</SectionTitle>
      <Typography sx={{ fontStyle: "italic", color: "text.secondary", lineHeight: 1.7, fontSize: "14px" }}>{travelWishes}</Typography>
    </Box>
  );
}
