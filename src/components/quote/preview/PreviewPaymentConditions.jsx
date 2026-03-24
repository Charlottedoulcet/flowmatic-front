import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SectionTitle from "./SectionTitle";

export default function PreviewPaymentConditions({ paymentConditions }) {
  if (!paymentConditions?.length) return null;

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <SectionTitle>Conditions de paiement</SectionTitle>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {paymentConditions.map((cond, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              px: 3,
              py: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: 800,
                color: "primary.main",
                lineHeight: 1,
                minWidth: "72px",
                flexShrink: 0,
              }}
            >
              {cond.percentage}%
            </Typography>
            <Box sx={{ borderLeft: "2px solid", borderColor: "divider", pl: 3, flexGrow: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>{cond.description}</Typography>
              {cond.dueDateDescription && (
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.25 }}>
                  {cond.dueDateDescription}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
