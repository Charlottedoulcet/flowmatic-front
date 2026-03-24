import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useAuth } from "../context/useAuth";
import { authService } from "../services/authService";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const authResponse = await authService.register(data);
      login(authResponse);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Cette adresse email est déjà utilisée.");
      } else if (err.response?.status === 400) {
        setError("Données invalides. Vérifiez le formulaire.");
      } else {
        setError("Une erreur est survenue. Réessayez.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
        py: 4,
      }}
    >
      <Paper elevation={2} sx={{ p: 5, width: "100%", maxWidth: 440, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "common.white", fontWeight: 700, fontSize: "16px" }}>F</Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, fontSize: "18px", color: "text.primary" }}>Flowmatic</Typography>
        </Box>

        <Typography variant="h5" textAlign="center" sx={{ fontWeight: 700, fontSize: "22px", color: "text.primary", mb: 0.5 }}>
          Créer votre agence
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
          Vous serez le premier administrateur de l'agence
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary", mb: 0.5, textAlign: "left" }}>
            Nom de l'agence
          </Typography>
          <TextField fullWidth placeholder="ex: Agence Soleil Voyages" {...register("agencyName", { required: "Le nom de l'agence est requis" })} error={!!errors.agencyName} helperText={errors.agencyName?.message} sx={{ mb: 2 }} />

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={6}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary", mb: 0.5, textAlign: "left" }}>
                Prénom
              </Typography>
              <TextField fullWidth placeholder="Charlotte" {...register("firstName", { required: "Le prénom est requis" })} error={!!errors.firstName} helperText={errors.firstName?.message} />
            </Grid>
            <Grid size={6}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary", mb: 0.5, textAlign: "left" }}>
                Nom
              </Typography>
              <TextField fullWidth placeholder="Doulcet" {...register("lastName", { required: "Le nom est requis" })} error={!!errors.lastName} helperText={errors.lastName?.message} />
            </Grid>
          </Grid>

          <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary", mb: 0.5, textAlign: "left" }}>
            Adresse email
          </Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="charlotte@agencesoleil.com"
            autoComplete="email"
            {...register("email", {
              required: "L'adresse email est requise",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Adresse email invalide" },
            })}
            error={!!errors.email}
            helperText={errors.email?.message ?? "Utilisée pour vous connecter"}
            sx={{ mb: 2 }}
          />

          <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary", mb: 0.5, textAlign: "left" }}>
            Mot de passe
          </Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("password", {
              required: "Le mot de passe est requis",
              minLength: { value: 6, message: "Minimum 6 caractères" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message ?? "Minimum 6 caractères"}
            sx={{ mb: 3 }}
          />

          <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ mb: 2, py: 1.5, fontSize: "15px" }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Créer mon agence"}
          </Button>
        </Box>

        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Déjà un compte ?{" "}
            <MuiLink component={RouterLink} to="/login" color="primary" fontWeight={600} underline="none">
              Se connecter
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
