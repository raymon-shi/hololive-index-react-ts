import Box from "@mui/material/Box";
import HomePageListSection from "./HomePageListSection";
import { hololive } from "../data/hololive";
import { FC, ReactElement } from "react";

const HomePageListView: FC = (): ReactElement => {
  return (
    <Box>
      {["HoloMyth", "HoloPromise", "HoloAdvent"].map((name: string, index) => (
        <HomePageListSection title={name} generation={hololive[index]} key={index} />
      ))}
    </Box>
  );
};

export default HomePageListView;
