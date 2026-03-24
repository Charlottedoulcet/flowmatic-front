import Box from "@mui/material/Box";
import SectionTitle from "./SectionTitle";
import PreviewDayDetail from "./PreviewDayDetail";

export default function PreviewDayProgram({ days }) {
  if (!days?.length) return null;

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <SectionTitle>Programme détaillé</SectionTitle>
      {days.map((day) => (
        <PreviewDayDetail key={day.dayNumber} day={day} />
      ))}
    </Box>
  );
}
