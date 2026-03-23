import { useState } from "react";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  function showSuccess(message) {
    setSnackbar({ open: true, message, severity: "success" });
  }

  function showError(message) {
    setSnackbar({ open: true, message, severity: "error" });
  }

  function handleClose() {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }

  const SnackbarComponent = (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={snackbar.severity} variant="filled" onClose={handleClose}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );

  return { showSuccess, showError, SnackbarComponent };
}
