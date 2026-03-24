import Typography from "@mui/material/Typography";

export default function SectionTitle({ children }) {
  return (
    <Typography variant="h2" sx={{ pb: 1, mb: 2, borderBottom: "2px solid", borderColor: "primary.main" }}>
      {children}
    </Typography>
  );
}
