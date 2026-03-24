import Typography from "@mui/material/Typography";

export default function FormLabel({ children }) {
  return (
    <Typography variant="formLabel" component="label">
      {children}
    </Typography>
  );
}
