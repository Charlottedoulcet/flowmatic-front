import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SectionTitle from "./SectionTitle";

export default function PreviewAccommodations({ accommodations }) {
  if (!accommodations?.length) return null;

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <SectionTitle>Vos hébergements</SectionTitle>
      {accommodations.map((acc, index) => (
        <Paper key={index} sx={{ mb: 1.5, overflow: "hidden" }}>
          <Box sx={{ p: 2.5, display: "flex", gap: 2.5 }}>
            <Box
              sx={{
                width: 120,
                height: 80,
                bgcolor: "background.default",
                borderRadius: 1,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.disabled" }}>
                Photo
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "15px" }}>
                {acc.name}{" "}
                {(acc.rating || acc.location) && (
                  <Typography component="span" sx={{ fontWeight: 400, color: "text.secondary", fontSize: "13px" }}>
                    {acc.rating}
                    {acc.location ? ` — ${acc.location}` : ""}
                  </Typography>
                )}
              </Typography>
              {acc.description && (
                <Typography variant="body2" sx={{ color: "text.primary", mt: 0.5, lineHeight: 1.5 }}>
                  {acc.description}
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
