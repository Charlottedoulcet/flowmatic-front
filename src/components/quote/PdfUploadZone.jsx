import { useRef, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function PdfUploadZone({ onExtract, loading }) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState(null);

  function validateAndSetFile(file) {
    if (file.type !== "application/pdf") {
      setFileError("Seuls les fichiers PDF sont acceptés.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setFileError(`Le fichier dépasse la limite de ${MAX_SIZE_MB} Mo.`);
      return;
    }
    setFileError(null);
    setSelectedFile(file);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      validateAndSetFile(file);
      e.target.value = "";
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    if (!loading && !selectedFile) setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    if (loading || selectedFile) return;
    const file = e.dataTransfer.files[0];
    if (file) validateAndSetFile(file);
  }

  function handleExtract() {
    if (selectedFile) onExtract(selectedFile);
  }

  function handleReset() {
    setSelectedFile(null);
    setFileError(null);
  }

  function getBorderColor() {
    if (selectedFile) return "primary.main";
    if (isDragging) return "primary.main";
    return "divider";
  }

  function getBgColor() {
    if (selectedFile) return "primary.light";
    if (isDragging) return "primary.light";
    return "background.default";
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      {fileError && (
        <Alert severity="error" onClose={() => setFileError(null)} sx={{ mb: 2 }}>
          {fileError}
        </Alert>
      )}
      <Box
        onClick={() => !loading && !selectedFile && inputRef.current.click()}
        onKeyDown={(e) => { if (!loading && !selectedFile && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); inputRef.current.click(); } }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={loading || selectedFile ? -1 : 0}
        aria-label="Choisir un fichier PDF à analyser"
        sx={{
          border: "2px dashed",
          borderColor: getBorderColor(),
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          bgcolor: getBgColor(),
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
            <Typography sx={{ fontSize: 12, color: "text.disabled", mt: 0.5 }}>
              PDF uniquement · 10 Mo max · L'IA extraira les données après confirmation
            </Typography>
          </>
        )}
      </Box>
    </Paper>
  );
}
