import axios from "axios";
import { hololive } from "../data/hololive";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FC, ReactElement } from "react";
import IVTuber from "../../../shared/types/vtuber";
import HomePageLiveIcon from "./HomePageLiveIcon";

interface IProps {
  vtubers: IVTuber[];
}

const HomePageLive: FC<IProps> = ({ vtubers }): ReactElement => {
  const key = "";
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const checkLiveStatus = async () => {
    hololive.forEach(async (generation) => {
      for (const member of generation) {
        const { id: channelId } = member;
        // get the upload playlist data based on playlist id
        const uploadPlaylistId = "UU" + channelId.slice(2);
        const { data: ytPlaylistItemsDataResp } = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${uploadPlaylistId}&key=${key}`,
        );

        const { items: ytPlaylistItems } = ytPlaylistItemsDataResp;

        const lastestVideo = [ytPlaylistItems[0]];
        let isLive = false;
        for (const video of lastestVideo) {
          const { contentDetails } = video;
          const { videoId } = contentDetails;

          const { data: videoData } = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails%2CliveStreamingDetails%2Csnippet%2Cstatistics&id=${videoId}&key=${key}`,
          );
          const { items } = videoData;
          const vid = items[0];
          const { snippet } = vid;
          const { liveBroadcastContent } = snippet;
          isLive = liveBroadcastContent === "live";
        }

        await axios.post("http://localhost:8080/live/updateLiveStatus", { id: channelId, isLive }, config);
      }
    });
  };

  return (
    <Box>
      <Button variant="contained" onClick={checkLiveStatus}>
        Check who is currently live!
      </Button>
      {vtubers.map((vtuber) => (
        <HomePageLiveIcon vtuber={vtuber} />
      ))}
    </Box>
  );
};

export default HomePageLive;
