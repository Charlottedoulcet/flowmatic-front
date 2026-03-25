import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Popover from "@mui/material/Popover";
import { useTheme } from "@mui/material/styles";
import { HexColorPicker } from "react-colorful";
import { agencyService } from "../../services/agencyService";
import { useSnackbar } from "../../hooks/useSnackbar";

export default function BrandColors({ agency, onUpdate }) {
  const theme = useTheme();
  const [primary, setPrimary] = useState(agency?.primaryColor ?? theme.palette.primary.main);
  const [secondary, setSecondary] = useState(agency?.secondaryColor ?? theme.palette.text.secondary);
  const [saving, setSaving] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const { showSuccess, showError, SnackbarComponent } = useSnackbar();

  function openPicker(e, colorKey) {
    setAnchorEl(e.currentTarget);
    setActiveColor(colorKey);
  }

  function closePicker() {
    setAnchorEl(null);
    setActiveColor(null);
  }

  function handlePickerChange(color) {
    if (activeColor === "primary") setPrimary(color);
    else setSecondary(color);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const updated = await agencyService.updateAgency({
        ...agency,
        primaryColor: primary,
        secondaryColor: secondary,
      });
      onUpdate(updated);
      showSuccess("Couleurs sauvegardées");
    } catch {
      showError("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  const currentPickerColor = activeColor === "primary" ? primary : secondary;

  function handleReset() {
    setPrimary(theme.palette.primary.main);
    setSecondary(theme.palette.text.secondary);
  }

  return (
    <Box sx={{ mb: 3, bgcolor: "background.paper", borderRadius: 2, border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="h3">Couleurs de marque</Typography>
      </Box>
      <Divider />

      <Box sx={{ px: 3, py: 2.5 }}>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        Ces couleurs s'appliquent automatiquement à la preview du devis.
      </Typography>

      <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
        {[
          { label: "Couleur principale", colorKey: "primary", value: primary },
          { label: "Couleur secondaire", colorKey: "secondary", value: secondary },
        ].map(({ label, colorKey, value }) => (
          <Box key={colorKey}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {label}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                role="button"
                tabIndex={0}
                aria-label={`Choisir la ${label.toLowerCase()}`}
                onClick={(e) => openPicker(e, colorKey)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openPicker(e, colorKey);
                  }
                }}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: value,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  cursor: "pointer",
                  flexShrink: 0,
                  "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
                }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace" }}>
                {value}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closePicker}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ p: 2 }}>
          <HexColorPicker color={currentPickerColor} onChange={handlePickerChange} />
        </Box>
      </Popover>

      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Button variant="contained" onClick={handleSave} disabled={saving} startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}>
          {saving ? "Sauvegarde…" : "Sauvegarder les couleurs"}
        </Button>
        <Button variant="outlined" onClick={handleReset} disabled={saving}>
          Réinitialiser
        </Button>
      </Box>

      {SnackbarComponent}
      </Box>
    </Box>
  );
}
