import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import SectionTitle from "./SectionTitle";

export default function PreviewItinerarySummary({ days }) {
  if (!days?.length) return null;

  const sortedDays = [...days].sort((a, b) => a.dayNumber - b.dayNumber);

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <SectionTitle>Itinéraire en bref</SectionTitle>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "56px" }}>Jour</TableCell>
              <TableCell sx={{ width: "140px", whiteSpace: "nowrap" }}>Date</TableCell>
              <TableCell>Programme</TableCell>
              <TableCell sx={{ width: "160px" }}>Nuit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDays.map((day) => (
              <TableRow key={day.dayNumber}>
                <TableCell>
                  <Typography sx={{ color: "primary.main", fontWeight: 700, fontSize: "13px" }}>J{day.dayNumber}</Typography>
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>{day.date ?? "—"}</TableCell>
                <TableCell>{day.summary ?? "—"}</TableCell>
                <TableCell>{day.nightLocation ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
