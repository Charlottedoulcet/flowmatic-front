import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

import DaySection from "./DaySection";

export default function DayTabs({ fields, register, errors, append, remove, activeDay, setActiveDay }) {
  function handleAddDay() {
    append({
      dayNumber: fields.length + 1,
      date: "",
      title: "",
      summary: "",
      nightLocation: "",
      description: "",
      transportDuration: "",
      accommodationName: "",
      accommodationLocation: "",
      roomType: "",
      meals: "",
      includedInDay: "",
    });
    setActiveDay(fields.length);
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h3">Programme jour par jour</Typography>
        <Button size="small" startIcon={<AddIcon />} onClick={handleAddDay}>
          Ajouter un jour
        </Button>
      </Box>

      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
          Aucun jour. Importez un PDF ou cliquez sur "Ajouter un jour".
        </Typography>
      ) : (
        <>
          <Tabs
            value={activeDay}
            onChange={(_, v) => setActiveDay(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
          >
            {fields.map((field, index) => (
              <Tab key={field.id} label={`Jour ${index + 1}`} />
            ))}
          </Tabs>

          {fields.map((field, index) => (
            <Box key={field.id} role="tabpanel" hidden={activeDay !== index}>
              {activeDay === index && (
                <DaySection
                  index={index}
                  register={register}
                  errors={errors}
                  onRemove={() => {
                    remove(index);
                    setActiveDay(Math.max(0, activeDay - 1));
                  }}
                />
              )}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}
