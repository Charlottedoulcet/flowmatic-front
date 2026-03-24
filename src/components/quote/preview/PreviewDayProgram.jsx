import Box from "@mui/material/Box";
import SectionTitle from "./SectionTitle";
import PreviewDayDetail from "./PreviewDayDetail";

export default function PreviewDayProgram({ days }) {
  if (!days?.length) return null;

  const sortedDays = [...days].sort((a, b) => a.dayNumber - b.dayNumber);

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <SectionTitle>Programme détaillé</SectionTitle>
      {sortedDays.map((day) => (
        <PreviewDayDetail key={day.dayNumber} day={day} />
      ))}
    </Box>
  );
}
