import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AgencyLogo from "../components/settings/AgencyLogo";
import BrandColors from "../components/settings/BrandColors";
import TermsConditions from "../components/settings/TermsConditions";
import { agencyService } from "../services/agencyService";

export default function SettingsPage() {
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    agencyService
      .getAgency()
      .then(setAgency)
      .catch(() => setError("Impossible de charger la configuration de l'agence."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
      <Typography variant="h1" sx={{ mb: 4 }}>
        Configuration
      </Typography>

      <AgencyLogo agency={agency} onUpdate={setAgency} />
      <BrandColors agency={agency} onUpdate={setAgency} />
      <TermsConditions agency={agency} onUpdate={setAgency} />
    </Box>
  );
}
