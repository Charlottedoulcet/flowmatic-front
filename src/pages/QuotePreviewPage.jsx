import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import baseTheme from "../styles/theme";
import { useAuth } from "../context/useAuth";
import { agencyService } from "../services/agencyService";
import { quoteService } from "../services/quoteService";

import PreviewTopbar from "../components/quote/preview/PreviewTopbar";
import PreviewCoverImage from "../components/quote/preview/PreviewCoverImage";
import PreviewInfoGrid from "../components/quote/preview/PreviewInfoGrid";
import PreviewTravelWishes from "../components/quote/preview/PreviewTravelWishes";
import PreviewItinerarySummary from "../components/quote/preview/PreviewItinerarySummary";
import PreviewDayProgram from "../components/quote/preview/PreviewDayProgram";
import PreviewAccommodations from "../components/quote/preview/PreviewAccommodations";
import PreviewInclusions from "../components/quote/preview/PreviewInclusions";
import PreviewSupplements from "../components/quote/preview/PreviewSupplements";
import PreviewPaymentConditions from "../components/quote/preview/PreviewPaymentConditions";
import PreviewTermsConditions from "../components/quote/preview/PreviewTermsConditions";

export default function QuotePreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasRole } = useAuth();

  const [quote, setQuote] = useState(null);
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuote = quoteService.getById(id);
    const loadAgency = agencyService.getAgency().catch(() => null);

    Promise.all([loadQuote, loadAgency])
      .then(([quoteData, agencyData]) => {
        setQuote(quoteData);
        setAgency(agencyData);
      })
      .catch(() => setError("Impossible de charger le devis. Vérifiez l'URL ou réessayez."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress aria-label="Chargement du devis" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/dashboard")}>
          Retour au tableau de bord
        </Button>
      </Box>
    );
  }

  const previewTheme = agency?.primaryColor
    ? createTheme(baseTheme, {
        palette: {
          primary: { main: agency.primaryColor },
          ...(agency.secondaryColor && { secondary: { main: agency.secondaryColor } }),
        },
      })
    : baseTheme;

  return (
    <ThemeProvider theme={previewTheme}>
      <Box component="main" sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <PreviewTopbar status={quote.status} showEdit={hasRole("EMPLOYEE")} onBack={() => navigate("/dashboard")} onEdit={() => navigate(`/quotes/${id}/edit`)} />

        <PreviewCoverImage agency={agency} quote={quote} />

        <Box sx={{ bgcolor: "background.paper", maxWidth: 1100, mx: "auto", my: 4, px: { xs: 2, sm: 6 }, pt: 4, pb: 6, borderRadius: 2 }}>
          <PreviewInfoGrid quote={quote} />
          <PreviewTravelWishes travelWishes={quote.travelWishes} />
          <PreviewItinerarySummary days={quote.days} />
          <PreviewDayProgram days={quote.days} />
          <PreviewAccommodations accommodations={quote.accommodations} />
          <PreviewInclusions inclusions={quote.inclusions} />
          <PreviewSupplements supplements={quote.supplements} currency={quote.currency} />
          <PreviewPaymentConditions paymentConditions={quote.paymentConditions} />
          <PreviewTermsConditions termsAndConditions={agency?.termsAndConditions} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
