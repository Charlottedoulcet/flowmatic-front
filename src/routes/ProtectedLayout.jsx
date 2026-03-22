import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "../components/layout/Navbar";

export default function ProtectedLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1, p: 3, overflow: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
