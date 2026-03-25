import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import UploadIcon from "@mui/icons-material/Upload";
import { agencyService } from "../../services/agencyService";
import { uploadService } from "../../services/uploadService";
import { useSnackbar } from "../../hooks/useSnackbar";

const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function AgencyLogo({ agency, onUpdate }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { showSuccess, showError, SnackBarComponent } = useSnackbar();

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      showError("Format non supporté. Utilisez JPG, PNG ou WebP.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      showError(`Fichier trop volumineux. Maximum ${MAX_SIZE_MB} Mo.`);
      e.target.value = "";
      return;
    }

    setUploading(true);
    try {
      const url = await uploadService.uploadImage(file);
      const updated = await agencyService.updateAgency({ ...agency, logoUrl: url });
      showSuccess("Logo mis à jour avec succès");
      onUpdate(updated);
    } catch {
      showError("Erreur lors de l'upload du logo");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <Box sx={{ mb: 3, bgcolor: "background.paper", borderRadius: 2, border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="h3">Logo de l'agence</Typography>
      </Box>
      <Divider />

      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 1,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {agency?.logoUrl ? (
              <Box component="img" src={agency.logoUrl} alt={`Logo ${agency.name}`} sx={{ width: "100%", height: "100%", objectFit: "contain", p: "8px" }} />
            ) : (
              <Typography sx={{ fontWeight: 700, fontSize: 24, color: "text.disabled" }}>{agency?.name?.charAt(0)?.toUpperCase() ?? "A"}</Typography>
            )}
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Logo actuel
          </Typography>
        </Box>

        <Box>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={handleFileChange} />
          <Button
            variant="contained"
            startIcon={uploading ? <CircularProgress size={16} color="inherit" /> : <UploadIcon />}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            sx={{ mb: 0.5 }}
          >
            {uploading ? "Upload en cours…" : "Changer le logo"}
          </Button>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            JPG, PNG ou WebP — max 5 Mo
          </Typography>
        </Box>
      </Box>

      {SnackBarComponent}
    </Box>
  );
}
