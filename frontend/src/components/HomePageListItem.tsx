import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IInitialData from "../../../shared/types/initial-data";
import { FC, ReactElement } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";

interface IProps {
  member: IInitialData;
}

const HomePageListItem: FC<IProps> = ({ member }): ReactElement => {
  const { id, name } = member;

  return (
    <ListItem key={id}>
      <ListItemButton>
        <Link to={`profile/${id}`} relative="path" state={{ id }}>
          <ListItemText primary={name} />
        </Link>
      </ListItemButton>
    </ListItem>
  );
};

export default HomePageListItem;
