import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function LabelValue({ label, children }) {
  return (
    <Box>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body2">{children}</Typography>
    </Box>
  );
}
