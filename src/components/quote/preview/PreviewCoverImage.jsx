import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

export default function PreviewCoverImage({ agency, quote }) {
  const duration = quote.startDate && quote.endDate ? Math.round((new Date(quote.endDate) - new Date(quote.startDate)) / (1000 * 60 * 60 * 24)) + 1 : null;

  return (
    <Box
      role="img"
      aria-label={`${quote.destination} — image de couverture`}
      sx={{
        position: "relative",
        height: { xs: 240, sm: 300 },
        bgcolor: "text.disabled",
        backgroundImage: quote.coverImageUrl ? `url(${quote.coverImageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        printColorAdjust: "exact",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(transparent 30%, rgba(0,0,0,0.6))",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 20, sm: 28 },
          left: { xs: 20, sm: 40 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: (theme) => alpha(theme.palette.common.white, 0.92),
              borderRadius: 1,
              flexShrink: 0,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {agency?.logoUrl && <Box component="img" src={agency.logoUrl} alt={`Logo ${agency.name}`} sx={{ width: "100%", height: "100%", objectFit: "contain", p: "4px" }} />}
          </Box>
          <Typography sx={{ color: "common.white", fontSize: "14px", opacity: 0.9 }}>{agency?.name ?? "Flowmatic"} — Proposition de voyage</Typography>
        </Box>

        <Typography
          sx={{
            color: "common.white",
            fontSize: { xs: "22px", sm: "28px" },
            fontWeight: 800,
            lineHeight: 1.2,
            mb: 0.5,
          }}
        >
          {quote.title}
        </Typography>

        <Typography sx={{ color: "common.white", fontSize: "14px", opacity: 0.85 }}>
          {quote.clientName}
          {quote.participantCount ? ` · ${quote.participantCount} participant${quote.participantCount > 1 ? "s" : ""}` : ""}
          {duration ? ` · ${duration} jours` : ""}
        </Typography>
      </Box>
    </Box>
  );
}
