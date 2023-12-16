import { ListItem, ListItemText } from "@mui/material";
import { FC, ReactElement } from "react";
import IVTuber from "../../../shared/types/vtuber";
import { Link } from "react-router-dom";

interface IProps {
  vtuber: IVTuber;
}

const HomePageLiveIcon: FC<IProps> = ({ vtuber }): ReactElement => {
  const { id, name, profileImage, handle } = vtuber;
  return (
    <ListItem key={id}>
      <img src={`${profileImage}`} alt="" />
      <Link to={`https://youtube.com/${handle}/live`}>
        <ListItemText primary={name} />
      </Link>
    </ListItem>
  );
};

export default HomePageLiveIcon;
