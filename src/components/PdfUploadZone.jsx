import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function PdfUploadZone({ onExtract, loading }) {
  const inputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      onExtract(file);
      e.target.value = "";
    }
  }

  return (
    <Box
      sx={{
        border: "2px dashed",
        borderColor: "divider",
        p: 3,
        textAlign: "center",
        bgcolor: "background.paper",
        mb: 3,
      }}
    >
      <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />

      {loading ? (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
          <CircularProgress size={20} />
          <Typography variant="body2" color="text.secondary">
            Extraction en cours...
          </Typography>
        </Box>
      ) : (
        <Button
          variant="outlined"
          startIcon={<UploadFileIcon />}
          onClick={() => inputRef.current.click()}
        >
          Importer un PDF
        </Button>
      )}
    </Box>
  );
}