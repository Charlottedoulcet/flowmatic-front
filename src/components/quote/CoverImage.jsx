import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import { pexelsService } from "../services/pexelsService";

export default function CoverImage({ setValue, destination }) {
  const [query, setQuery] = useState(destination ?? "");
  const [photos, setPhotos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch() {
    if (!query.trim()) return;
    setSearching(true);
    setError(null);
    try {
      const results = await pexelsService.search(query);
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
      <Typography variant="h6" gutterBottom>
        Image de couverture
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField label="Rechercher une image" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} size="small" fullWidth placeholder="ex: Guatemala jungle" />
        <Button variant="contained" onClick={handleSearch} disabled={searching || !query.trim()} startIcon={searching ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />} sx={{ whiteSpace: "nowrap" }}>
          Chercher image
        </Button>
      </Box>

      {error && (
        <Typography variant="caption" color="error" sx={{ mb: 1, display: "block" }}>
          {error}
        </Typography>
      )}

      {photos.length > 0 && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
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
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "common.white",
                  px: 0.5,
                  py: 0.25,
                }}
                noWrap
              >
                © {photo.photographer}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
