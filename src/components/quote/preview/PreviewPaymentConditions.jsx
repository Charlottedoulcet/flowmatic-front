import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SectionTitle from "./SectionTitle";

export default function PreviewPaymentConditions({ paymentConditions }) {
  if (!paymentConditions?.length) return null;

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <SectionTitle>Conditions de paiement</SectionTitle>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>%</TableCell>
              <TableCell>Échéance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentConditions.map((cond, index) => (
              <TableRow key={index}>
                <TableCell>{cond.description}</TableCell>
                <TableCell>{cond.percentage}%</TableCell>
                <TableCell>{cond.dueDateDescription ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
