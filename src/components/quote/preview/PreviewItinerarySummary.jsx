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

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <SectionTitle>Itinéraire en bref</SectionTitle>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Jour</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Programme</TableCell>
              <TableCell>Nuit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((day) => (
              <TableRow key={day.dayNumber}>
                <TableCell>
                  <Typography sx={{ color: "primary.main", fontWeight: 700, fontSize: "13px" }}>J{day.dayNumber}</Typography>
                </TableCell>
                <TableCell>{day.date ?? "—"}</TableCell>
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
