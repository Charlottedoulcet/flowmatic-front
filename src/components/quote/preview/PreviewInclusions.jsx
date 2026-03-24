import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SectionTitle from "./SectionTitle";

function InclusionColumn({ items, Icon, color, label }) {
  if (!items.length) return null;
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Typography variant="body2" sx={{ fontWeight: 600, color, mb: 1.5, textTransform: "uppercase", fontSize: "11px" }}>
        {label}
      </Typography>
      {items.map((item, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1 }}>
          <Icon aria-hidden="true" fontSize="small" sx={{ color, mt: "1px", flexShrink: 0 }} />
          <Typography variant="body2">{item.description}</Typography>
        </Box>
      ))}
    </Grid>
  );
}

export default function PreviewInclusions({ inclusions }) {
  if (!inclusions?.length) return null;

  const included = inclusions.filter((i) => i.included);
  const excluded = inclusions.filter((i) => !i.included);

  return (
    <Paper component="section" sx={{ p: 3, mb: 4 }}>
      <SectionTitle>Inclus / Non inclus</SectionTitle>
      <Grid container spacing={3}>
        <InclusionColumn items={included} Icon={CheckCircleOutlineIcon} color="success.main" label="Inclus" />
        <InclusionColumn items={excluded} Icon={HighlightOffIcon} color="error.main" label="Non inclus" />
      </Grid>
    </Paper>
  );
}
