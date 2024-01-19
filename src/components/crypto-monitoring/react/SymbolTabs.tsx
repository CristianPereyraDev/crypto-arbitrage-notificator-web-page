import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./styles/tabs.css";

import type { ICryptoPair } from "~/types";
import SymbolMonitor from "./SymbolMonitor";

type SymbolTabsProps = {
  pairs: ICryptoPair[];
};

export default function SymbolTabs(props: SymbolTabsProps) {
  const { pairs } = props;

  return (
    <div className="px-4">
      <Tabs forceRenderTabPanel={true}>
        <TabList className={["react-tabs__tab-list"]}>
          {pairs.map((pair, index) => (
            <Tab
              key={index}
              className={["react-tabs__tab"]}
            >{`${pair.crypto}-${pair.fiat}`}</Tab>
          ))}
        </TabList>

        {pairs.map((pair, index) => (
          <TabPanel key={index}>
            <SymbolMonitor crypto={pair.crypto} fiat={pair.fiat} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
