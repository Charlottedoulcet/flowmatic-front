import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function PdfUploadZone({ onExtract, loading }) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      e.target.value = "";
    }
  }

  function handleExtract() {
    if (selectedFile) {
      onExtract(selectedFile);
    }
  }

  function handleReset() {
    setSelectedFile(null);
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box
        onClick={() => !loading && !selectedFile && inputRef.current.click()}
        sx={{
          border: "2px dashed",
          borderColor: selectedFile ? "primary.main" : "divider",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          bgcolor: selectedFile ? "primary.light" : "background.default",
          cursor: loading || selectedFile ? "default" : "pointer",
          "&:hover": !loading && !selectedFile ? { borderColor: "primary.main" } : {},
          transition: "all 0.2s",
        }}
      >
        <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />

        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">
              Extraction en cours… cela peut prendre 30 secondes
            </Typography>
          </Box>
        ) : selectedFile ? (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 2 }}>
              <UploadFileIcon color="primary" />
              <Typography sx={{ fontWeight: 600, color: "text.primary" }}>{selectedFile.name}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button variant="outlined" size="small" onClick={handleReset}>
                Changer de fichier
              </Button>
              <Button variant="contained" startIcon={<AutoAwesomeIcon />} onClick={handleExtract}>
                Extraire les données avec l'IA
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Typography sx={{ fontSize: 32, lineHeight: 1, mb: 1 }}>📄</Typography>
            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
              Déposez un PDF de réceptif ici, ou{" "}
              <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
                parcourir
              </Box>
            </Typography>
            <Typography sx={{ fontSize: 12, color: "text.disabled", mt: 0.5 }}>L'IA extraira les données du devis après confirmation</Typography>
          </>
        )}
      </Box>
    </Paper>
  );
}
