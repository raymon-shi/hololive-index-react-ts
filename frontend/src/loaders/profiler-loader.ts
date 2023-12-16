import axios from "axios";
import { Params } from "react-router-dom";

export const profileLoader = async ({ params }: { params: Params<"profileId"> }) => {
  const { profileId } = params;
  const { data } = await axios.get(`http://localhost:8080/profile/${profileId}`);

  return data;
};
