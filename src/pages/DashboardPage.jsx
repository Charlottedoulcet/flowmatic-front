import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../context/useAuth";
import { quoteService } from "../services/quoteService";
import StatCard from "../components/dashboard/StatCard";
import RecentQuotesList from "../components/dashboard/RecentQuoteList";
import StatusChangeDialog from "../components/dashboard/StatusChangeDialog";
import DeleteQuoteDialog from "../components/dashboard/DeleteQuoteDialog";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusTarget, setStatusTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    quoteService
      .getAll()
      .then(setQuotes)
      .catch(() => setError("Impossible de charger les devis. Réessayez."))
      .finally(() => setLoading(false));
  }, []);

  const pending = quotes.filter((q) => q.status === "PENDING").length;
  const signed = quotes.filter((q) => q.status === "SIGNED").length;
  const ca = quotes
    .filter((q) => q.status === "PAID")
    .reduce((sum, q) => sum + (q.pricePerPerson ?? 0) * (q.participantCount ?? 1), 0);

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ p: 3 }}><Alert severity="error">{error}</Alert></Box>;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h1" color="text.primary">Tableau de bord</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/quotes/new")}>
          Nouveau devis
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3, mt: 1, flexWrap: "wrap" }}>
        <StatCard title="Total devis" value={quotes.length} />
        <StatCard title="En attente" value={pending} color="warning.main" />
        <StatCard title="Signés" value={signed} color="success.main" />
        <StatCard title="CA total" value={`${ca.toLocaleString("fr-FR")} €`} />
      </Box>

      <RecentQuotesList
        quotes={quotes}
        userId={user?.id}
        onStatusChange={setStatusTarget}
        onView={(id) => navigate(`/quotes/${id}/preview`)}
        onEdit={(id) => navigate(`/quotes/${id}/edit`)}
        onDelete={setDeleteTarget}
        onAddNew={() => navigate("/quotes/new")}
      />

      <StatusChangeDialog
        quote={statusTarget}
        onChanged={(updated) => {
          setQuotes((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
          setStatusTarget(null);
        }}
        onClose={() => setStatusTarget(null)}
      />

      <DeleteQuoteDialog
        quoteId={deleteTarget}
        onDeleted={(id) => {
          setQuotes((prev) => prev.filter((q) => q.id !== id));
          setDeleteTarget(null);
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </Box>
  );
}
