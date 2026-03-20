import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function StatCard({ title, value, color = "text.primary" }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 2, flex: 1 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" color={color} fontWeight={700}>
        {value}
      </Typography>
    </Paper>
  );
}
