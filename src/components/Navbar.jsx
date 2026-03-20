import { NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/useAuth";
import { useTheme } from "@mui/material/styles";

export default function Navbar() {
  const { roles, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const sidebar = theme.palette.sidebar;
  const isAdmin = roles?.includes("ROLE_ADMIN");

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const navLinkSx = {
    display: "flex",
    alignItems: "center",
    gap: 1.25,
    px: 1.5,
    py: 1.25,
    borderRadius: 2,
    fontSize: "13px",
    fontWeight: 500,
    color: sidebar.text,
    textDecoration: "none",
    transition: "background-color 0.15s, color 0.15s",
    "&:hover": { bgcolor: sidebar.hoverBg, color: sidebar.textHover },
    "&.active": { bgcolor: sidebar.activeBg, color: sidebar.textActive },
  };

  const logoutSx = {
    ...navLinkSx,
    width: "100%",
    bgcolor: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    "&:hover": { bgcolor: sidebar.logoutHoverBg, color: sidebar.logoutHoverText },
  };

  return (
    <Box
      component="aside"
      sx={{
        width: 230,
        minHeight: "100vh",
        bgcolor: "sidebar.bg",
        display: "flex",
        flexDirection: "column",
        py: 3,
        flexShrink: 0,
      }}
    >
      <Typography sx={{ px: 2.5, pb: 4, fontSize: "18px", fontWeight: 700, color: "common.white", letterSpacing: "-0.3px" }}>Flowmatic</Typography>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.25, px: 1.5 }}>
        <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "sidebar.sectionLabel", textTransform: "uppercase", letterSpacing: "1px", px: 1.5, pt: 2, pb: 0.5 }}>Devis</Typography>

        <Box component={NavLink} to="/dashboard" end sx={navLinkSx}>
          <DashboardIcon sx={{ fontSize: 16 }} />
          Tableau de bord
        </Box>

        <Box component={NavLink} to="/quotes/new" sx={navLinkSx}>
          <AddIcon sx={{ fontSize: 16 }} />
          Nouveau devis
        </Box>

        {isAdmin ? (
          <>
            <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "sidebar.sectionLabel", textTransform: "uppercase", letterSpacing: "1px", px: 1.5, pt: 2, pb: 0.5 }}>Administration</Typography>

            <Box component={NavLink} to="/employees" sx={navLinkSx}>
              <PeopleIcon sx={{ fontSize: 16 }} />
              Employés
            </Box>

            <Box component={NavLink} to="/settings" sx={navLinkSx}>
              <SettingsIcon sx={{ fontSize: 16 }} />
              Configuration
            </Box>
          </>
        ) : null}
      </Box>

      <Box sx={{ px: 1.5 }}>
        <Box component={"button"} onClick={handleLogout} sx={logoutSx}>
          <LogoutIcon sx={{ fontSize: 16 }} />
          Déconnexion
        </Box>
      </Box>
    </Box>
  );
}
