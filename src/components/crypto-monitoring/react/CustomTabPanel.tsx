import React from "react";
import Box from "@mui/material/Box";

type CustomTabPanelProps = {
  index: number;
  value: number;
};

export default function CustomTabPanel(
  props: React.PropsWithChildren<CustomTabPanelProps>,
) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
}
