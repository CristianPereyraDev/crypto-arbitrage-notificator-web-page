import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import type { ICryptoPair } from "~/types";
import { useState } from "react";
import CustomTabPanel from "./CustomTabPanel";
import SymbolMonitor from "./SymbolMonitor";

type SymbolTabsProps = {
  pairs: ICryptoPair[];
};

export default function SymbolTabs(props: SymbolTabsProps) {
  const { pairs } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="px-4">
      <div className="sticky top-0 rounded-b-md bg-zinc-800">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {pairs.map((pair, index) => (
            <Tab
              key={index}
              label={`${pair.crypto}-${pair.fiat}`}
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
              className="text-amber-300"
            />
          ))}
        </Tabs>
      </div>
      {pairs.map((pair, index) => (
        <CustomTabPanel key={index} index={index} value={value}>
          <SymbolMonitor crypto={pair.crypto} fiat={pair.fiat} />
        </CustomTabPanel>
      ))}
    </div>
  );
}
