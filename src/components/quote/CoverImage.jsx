import { useState, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import { unsplashService } from "../../services/unsplashService";

export default function CoverImage({ setValue, destination }) {
  const [query, setQuery] = useState(destination ?? "");
  const [photos, setPhotos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (destination && destination !== query) {
      setQuery(destination);
    }
  }, [destination]);

  async function handleSearch() {
    if (!query.trim()) return;
    setSearching(true);
    setError(null);
    try {
      const results = await unsplashService.search(query);
      setPhotos(results);
      setSelectedId(null);
    } catch {
      setError("Impossible de charger les photos. Vérifiez votre clé Pexels");
    } finally {
      setSearching(false);
    }
  }

  function handleSelect(photo) {
    setSelectedId(photo.id);
    setValue("coverImageUrl", photo.url);
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Image de couverture
      </Typography>

      <Box
        sx={{
          border: "2px dashed",
          borderColor: "divider",
          borderRadius: 2,
          p: 3,
          bgcolor: "background.default",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField label="Destination ou mot-clé" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} size="small" fullWidth placeholder="ex: Guatemala jungle" />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
            <Button variant="contained" onClick={handleSearch} disabled={searching || !query.trim()} startIcon={searching ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />} sx={{ whiteSpace: "nowrap" }}>
              Chercher image
            </Button>
            <Typography variant="body2" color="text.disabled">
              Via Unsplash
            </Typography>
          </Box>
        </Box>
      </Box>

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
          {error}
        </Typography>
      )}

      {photos.length > 0 && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.5, mt: 1.5 }}>
          {photos.map((photo) => (
            <Box
              key={photo.id}
              onClick={() => handleSelect(photo)}
              sx={{
                position: "relative",
                cursor: "pointer",
                borderRadius: 1,
                overflow: "hidden",
                aspectRatio: "16/9",
                backgroundImage: `url(${photo.thumb})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "3px solid",
                borderColor: selectedId === photo.id ? "primary.main" : "transparent",
              }}
            >
              {selectedId === photo.id && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    bgcolor: "primary.main",
                    color: "common.white",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckIcon sx={{ fontSize: 16 }} />
                </Box>
              )}
              <Typography
                variant="caption"
                component="a"
                href={photo.photographerUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                sx={(theme) => ({
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: alpha(theme.palette.common.black, 0.5),
                  color: "common.white",
                  px: 0.5,
                  py: 0.25,
                  textDecoration: "none",
                  display: "block",
                })}
                noWrap
              >
                © {photo.photographer} / Unsplash
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
