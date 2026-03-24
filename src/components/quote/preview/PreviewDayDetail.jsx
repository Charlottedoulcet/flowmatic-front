import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

function MetaItem({ icon: Icon, text }) {
  if (!text) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Icon aria-hidden="true" sx={{ fontSize: "14px", color: "text.secondary" }} />
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {text}
      </Typography>
    </Box>
  );
}

export default function PreviewDayDetail({ day }) {
  const accommodationText = day.accommodationName ? `${day.accommodationName}${day.accommodationLocation ? ` (${day.accommodationLocation})` : ""}` : null;

  const metaItems = [
    { icon: DirectionsCarOutlinedIcon, text: day.transportDuration },
    { icon: HotelOutlinedIcon, text: accommodationText },
    { icon: RestaurantOutlinedIcon, text: day.meals },
  ].filter((m) => m.text);

  return (
    <Box sx={{ pb: 4, mb: 4, borderBottom: "1px solid", borderColor: "divider", "&:last-child": { borderBottom: "none", mb: 0 } }}>
      <Typography variant="h3" sx={{ color: "primary.main", fontWeight: 700, mb: 1.5 }}>
        Jour {day.dayNumber}
        {day.title ? ` — ${day.title}` : ""}
      </Typography>

      {day.description && <Typography sx={{ lineHeight: 1.85, mb: 2 }}>{day.description}</Typography>}

      {metaItems.length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          {metaItems.map((item, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {index > 0 && (
                <Typography variant="body2" sx={{ color: "text.disabled" }}>
                  ·
                </Typography>
              )}
              <MetaItem icon={item.icon} text={item.text} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
