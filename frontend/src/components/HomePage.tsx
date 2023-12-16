import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Admin from "./Admin";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Switch from "@mui/material/Switch";
import HomePageListView from "./HomePageListView";
import HomePageLive from "./HomePageLive";
import axios from "axios";
import IVTuber from "../../../shared/types/vtuber";

const HomePage: FC = (): ReactElement => {
  const [tab, setTab] = React.useState("1");
  const [adminMode, setAdminMode] = React.useState(false);
  const [vtubers, setVTubers] = useState<IVTuber[]>([]);

  const config = useMemo(
    () => ({
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }),
    [],
  );

  const handleAdminModeChange = () => {
    setAdminMode(!adminMode);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const getLiveVTubers = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/live/liveVTubers", config);
      setVTubers(data);
    } catch (error) {
      console.log(error);
    }
  }, [config]);
  useEffect(() => {
    getLiveVTubers();
  }, [getLiveVTubers]);
  return (
    <>
      <h1>Hololive Index</h1>

      <Switch checked={adminMode} onChange={handleAdminModeChange} inputProps={{ "aria-label": "controlled" }} />

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
              <Tab label="VTuber List" value="1" />
              <Tab label="VTubers Live" value="2" />
              {adminMode ? <Tab label="Admin Mode" value="3" /> : null}
            </TabList>
          </Box>
          <TabPanel value="1">
            <HomePageListView />
          </TabPanel>
          <TabPanel value="2">
            <HomePageLive vtubers={vtubers} />
          </TabPanel>
          {adminMode ? (
            <TabPanel value="3">
              <Admin />
            </TabPanel>
          ) : null}
        </TabContext>
      </Box>
    </>
  );
};

export default HomePage;
