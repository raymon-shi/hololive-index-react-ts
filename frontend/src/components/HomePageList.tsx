import List from "@mui/material/List";
import HomePageListItem from "./HomePageListItem";
import IInitialData from "../../../shared/types/initial-data";
import { FC, ReactElement } from "react";

interface IProps {
  generation: IInitialData[];
}

const HomePageList: FC<IProps> = ({ generation }): ReactElement => {
  return (
    <List>
      {generation.map((member) => (
        <HomePageListItem member={member} key={member.id} />
      ))}
    </List>
  );
};

export default HomePageList;
