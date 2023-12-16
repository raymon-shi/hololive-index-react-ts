import { Divider, Typography } from "@mui/material";
import IInitialData from "../../../shared/types/initial-data";
import { FC, ReactElement } from "react";
import HomePageList from "./HomePageList";

interface IProps {
  title: string;
  generation: IInitialData[];
}

const HomePageListSection: FC<IProps> = ({ title, generation }): ReactElement => {
  return (
    <>
      <Typography variant="h3">{title}</Typography>
      <HomePageList generation={generation} />
      <Divider />
    </>
  );
};

export default HomePageListSection;
