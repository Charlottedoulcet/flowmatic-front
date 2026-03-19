import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { useAuth } from "../../context/useAuth";
import { authService } from "../../services/authService";

export default function LoginPage() {
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
      const authResponse = await authService.login(data);
      login(authResponse);
      navigate("/dashboard");
    } catch {
      setError("Email ou mot de passe incorrect.");
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
        bgcolor: "#F3F4F6",
        px: 2,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 440,
          borderRadius: 3,
        }}
      >
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
            <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>F</Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, fontSize: "18px", color: "text.primary" }}>Flowmatic</Typography>
        </Box>

        <Typography variant="h5" textAlign="center" sx={{ fontWeight: 700, fontSize: "22px", color: "text.primary", mb: 0.5 }}>
          Bienvenue
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
          Connectez-vous pour accéder à votre espace
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary", mb: 0.5, textAlign: "left" }}>
            Adresse email
          </Typography>
          <TextField fullWidth type="email" placeholder="ex: charlotte@agencesoleil.com" autoComplete="email" {...register("email", { required: "L'adresse email est requise" })} error={!!errors.email} helperText={errors.email?.message} sx={{ mb: 2 }} />

          <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary", mb: 0.5, textAlign: "left" }}>
            Mot de passe
          </Typography>
          <TextField fullWidth type="password" placeholder="••••••••" autoComplete="current-password" {...register("password", { required: "Le mot de passe est requis" })} error={!!errors.password} helperText={errors.password?.message} sx={{ mb: 3 }} />

          <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ mb: 2, py: 1.5, fontSize: "15px" }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Se connecter"}
          </Button>
        </Box>

        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Pas encore de compte ?{" "}
            <Link to="/register" style={{ color: "#3B82F6", fontWeight: 600, textDecoration: "none" }}>
              Créer une agence
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
