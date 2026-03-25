import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useSnackbar } from "../../hooks/useSnackbar";
import { userService } from "../../services/userService";
import FormLabel from "../shared/FormLabel";
import RoleChangedDialog from "./RoleChangedDialog";

const DEFAULTS = { firstName: "", lastName: "", email: "", password: "", roles: ["EMPLOYEE"] };

export default function EmployeeFormDialog({ open, employee, onSaved, onClose }) {
  const isEdit = employee !== null;
  const [saving, setSaving] = useState(false);
  const [logoutPending, setLogoutPending] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showError, SnackbarComponent } = useSnackbar();
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({ defaultValues: DEFAULTS });

  const selectedRoles = watch("roles") || [];

  function toggleRole(role) {
    if (selectedRoles.includes(role)) {
      setValue("roles", selectedRoles.filter((r) => r !== role), { shouldValidate: true });
    } else {
      setValue("roles", [...selectedRoles, role], { shouldValidate: true });
    }
  }

  useEffect(() => {
    if (!open) return;
    if (isEdit) {
      reset({
        ...employee,
        password: "",
        roles: employee.roles?.map((r) => r.replace("ROLE_", "")) || ["EMPLOYEE"],
      });
    } else {
      reset(DEFAULTS);
    }
  }, [open, employee]);

  async function onSubmit(data) {
    if (data.roles.length === 0) return; // sécurité — normalement géré par la validation
    setSaving(true);
    try {
      if (isEdit) {
        const { password, ...rest } = data;
        const payload = password ? { ...rest, password } : rest;
        const updated = await userService.update(employee.id, payload);
        if (updated.id === user.id) {
          setLogoutPending(true);
          return;
        }
        onSaved(updated);
      } else {
        const created = await userService.create(data);
        onSaved(created);
      }
    } catch (err) {
      const msg = err.response?.data?.message ?? "Erreur lors de l'enregistrement";
      showError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Modifier l'employé" : "Nouvel employé"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormLabel>Prénom *</FormLabel>
              <TextField fullWidth size="small"
                {...register("firstName", { required: "Prénom requis" })}
                error={!!errors.firstName} helperText={errors.firstName?.message} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormLabel>Nom *</FormLabel>
              <TextField fullWidth size="small"
                {...register("lastName", { required: "Nom requis" })}
                error={!!errors.lastName} helperText={errors.lastName?.message} />
            </Box>
          </Box>

          <Box>
            <FormLabel>Email *</FormLabel>
            <TextField fullWidth size="small" type="email"
              {...register("email", {
                required: "Email requis",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email invalide" },
              })}
              error={!!errors.email} helperText={errors.email?.message} />
          </Box>

          <Box>
            <FormLabel>{isEdit ? "Mot de passe (vide = inchangé)" : "Mot de passe *"}</FormLabel>
            <TextField fullWidth size="small" type="password"
              {...register("password", {
                required: isEdit ? false : "Mot de passe requis",
                minLength: { value: 6, message: "Minimum 6 caractères" },
              })}
              error={!!errors.password} helperText={errors.password?.message} />
          </Box>

          <Box>
            <FormLabel>Rôles * (au moins un)</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={selectedRoles.includes("EMPLOYEE")} onChange={() => toggleRole("EMPLOYEE")} />}
                label="Employé"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedRoles.includes("ADMIN")} onChange={() => toggleRole("ADMIN")} />}
                label="Administrateur"
              />
            </FormGroup>
            {selectedRoles.length === 0 && <FormHelperText error>Au moins un rôle requis</FormHelperText>}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, pt: 1 }}>
            <Button variant="outlined" onClick={onClose} disabled={saving}>Annuler</Button>
            <Button type="submit" variant="contained" disabled={saving}
              startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}>
              {saving ? "Enregistrement…" : isEdit ? "Modifier" : "Créer l'employé"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
      {SnackbarComponent}
    </Dialog>

    <RoleChangedDialog
      open={logoutPending}
      onConfirm={() => { logout(); navigate("/login", { state: { message: "Vos rôles ont été modifiés. Reconnectez-vous." } }); }}
    />
    </>
  );
}
