import React from "react";

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
      className="mt-2 overscroll-contain"
    >
      {children}
    </div>
  );
}
