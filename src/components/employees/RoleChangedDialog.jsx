import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

export default function RoleChangedDialog({ open, onConfirm }) {
  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Vos rôles ont été modifiés</DialogTitle>
      <DialogContent>
        <Typography color="text.secondary">
          Vos droits d'accès ont changé. Vous devez vous reconnecter pour que les modifications prennent effet.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onConfirm}>
          Se reconnecter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
