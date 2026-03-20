import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3B82F6",
      dark: "#2563EB",
      light: "#DBEAFE",
    },
    error: { main: "#EF4444" },
    warning: { main: "#F59E0B" },
    success: { main: "#10B981" },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
    sidebar: {
      bg: "#1E1E2E",
      text: "rgba(255, 255, 255, 0.45)",
      textActive: "#FFFFFF",
      textHover: "rgba(255, 255, 255, 0.7)",
      activeBg: "rgba(255, 255, 255, 0.08)",
      hoverBg: "rgba(255, 255, 255, 0.04)",
      divider: "rgba(255, 255, 255, 0.06)",
      sectionLabel: "rgba(255, 255, 255, 0.2)",
      logoutHoverBg: "rgba(239, 68, 68, 0.1)",
      logoutHoverText: "#EF4444",
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    h1: { fontSize: "20px", fontWeight: 700 },
    h2: { fontSize: "16px", fontWeight: 700 },
    h3: { fontSize: "14px", fontWeight: 600 },
    body1: { fontSize: "13px", color: "#374151" },
    body2: { fontSize: "12px" },
  },
  shape: {
    borderRadius: 7,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600, fontSize: "13px" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: "11px" },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { marginLeft: 0 },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: { background: "#FAFAFA" },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" },
        body: { fontSize: "13px", color: "#374151" },
      },
    },
  },
});

export default theme;