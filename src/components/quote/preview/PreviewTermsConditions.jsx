import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SectionTitle from "./SectionTitle";

export default function PreviewTermsConditions({ termsAndConditions }) {
  if (!termsAndConditions) return null;

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <SectionTitle>Conditions générales de vente</SectionTitle>
      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
        {termsAndConditions}
      </Typography>
    </Box>
  );
}
