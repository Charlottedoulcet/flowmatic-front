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
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const sidebar = theme.palette.sidebar;
  const isAdmin = hasRole("ADMIN");

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
        height: "100vh",
        bgcolor: "sidebar.bg",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 2.5, pt: 3, pb: 4 }}>
        <Box sx={{
          width: 28, height: 28, borderRadius: 1.5,
          bgcolor: "primary.main", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: "14px", fontWeight: 800, color: "common.white", flexShrink: 0,
        }}>
          F
        </Box>
        <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "common.white", letterSpacing: "-0.3px" }}>Flowmatic</Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25, px: 1.5 }}>
        <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "sidebar.sectionLabel", textTransform: "uppercase", letterSpacing: "1px", px: 1.5, pt: 0, pb: 0.5 }}>Devis</Typography>

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

      {/* Spacer — pousse le profil vers le bas */}
      <Box sx={{ flex: 1 }} />

      {/* Profil */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2.5, py: 1.5, borderTop: "1px solid", borderColor: "sidebar.divider" }}>
        <Box sx={{
          width: 32, height: 32, borderRadius: "50%",
          bgcolor: "primary.main", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 700, color: "common.white", flexShrink: 0,
        }}>
          {user?.firstName?.[0]?.toUpperCase()}{user?.lastName?.[0]?.toUpperCase()}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "sidebar.textActive", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {user?.firstName} {user?.lastName?.[0]?.toUpperCase()}.
          </Typography>
          <Typography sx={{ fontSize: "11px", color: "sidebar.text" }}>
            {isAdmin ? "Admin" : "Employé"}
          </Typography>
        </Box>
      </Box>

      {/* Déconnexion — collé au bas */}
      <Box sx={{ px: 1.5, pb: 2.5 }}>
        <Box component="button" onClick={handleLogout} sx={logoutSx}>
          <LogoutIcon sx={{ fontSize: 16 }} />
          Déconnexion
        </Box>
      </Box>
    </Box>
  );
}
