import Button from "@mui/material/Button";
import axios from "axios";
import { FC, ReactElement, useCallback } from "react";
import { hololive } from "../data/hololive";
import IVideoDetails from "../../../shared/types/video-details";

const Admin: FC = (): ReactElement => {
  const getAndUploadVTuberData = useCallback(async () => {
    const key = "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      hololive.forEach(async (generation) => {
        for (const member of generation) {
          const { id: channelId, name, platform, corporation } = member;

          // get the channel data based on channel id
          const { data: ytChannelDataResp } = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings%2Csnippet%2Cstatistics&id=${channelId}&key=${key}`,
          );
          const { items: ytChannelItems } = ytChannelDataResp;
          const ytChannelData = ytChannelItems[0];
          const { snippet, statistics, brandingSettings } = ytChannelData;

          const { title, description, customUrl: handle, publishedAt: creationDate, thumbnails } = snippet;

          const channelUrl = handle ? `www.youtube.com/${handle}` : `www.youtube.com/channel/${channelId}`;

          const { medium: mediumProfileImage } = thumbnails;
          const { url: profileImage } = mediumProfileImage;

          const { viewCount: views, subscriberCount: subscribers, videoCount } = statistics;

          const { channel: channelBrandSettings, image: imageBrandSettings } = brandingSettings;
          const { country, keywords } = channelBrandSettings;
          const { bannerExternalUrl: bannerImage } = imageBrandSettings;

          // get the upload playlist data based on playlist id
          const uploadPlaylistId = "UU" + channelId.slice(2);
          const { data: ytPlaylistItemsDataResp } = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${uploadPlaylistId}&key=${key}`,
          );

          let { items: ytPlaylistItems, nextPageToken } = ytPlaylistItemsDataResp;

          while (nextPageToken) {
            const { data: nextPage } = await axios.get(
              `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${uploadPlaylistId}&key=${key}&pageToken=${nextPageToken}`,
            );
            const { items } = nextPage;
            nextPageToken = nextPage.nextPageToken;
            ytPlaylistItems = [...ytPlaylistItems, ...items];
          }
          const uploadData: IVideoDetails[] = [];
          for (const item of ytPlaylistItems) {
            const { contentDetails } = item;
            const { videoId } = contentDetails;

            const { data: videoData } = await axios.get(
              `https://www.googleapis.com/youtube/v3/videos?part=contentDetails%2CliveStreamingDetails%2Csnippet%2Cstatistics&id=${videoId}&key=${key}`,
            );
            const { items } = videoData;
            const video = items[0];
            const { snippet, contentDetails: videoContentDetails, statistics: videoStatistics, liveStreamingDetails } = video;
            const { publishedAt: videoPublishedAt, title: videoTitle, description: videoDescription, thumbnails: videoThumbnails, tags } = snippet;
            const { standard: standardResVideoThumbnail } = videoThumbnails;
            const { url: videoThumbnailUrl } = standardResVideoThumbnail || {};

            const { duration } = videoContentDetails;
            const { viewCount: videoViews, likeCount: likes, commentCount: comments } = videoStatistics;

            const { actualStartTime, actualEndTime, scheduledStartTime } = liveStreamingDetails || {};

            const videoDetails: IVideoDetails = {
              id: videoId,
              title: videoTitle,
              description: videoDescription,
              thumbnailUrl: videoThumbnailUrl,
              tags,
              publishedAt: videoPublishedAt,
              duration,
              views: videoViews,
              likes,
              comments,
              actualStartTime,
              actualEndTime,
              scheduledStartTime,
            };
            uploadData.push(videoDetails);
          }
          // upload data to the database
          await axios.post(
            "http://localhost:8080/admin/uploadInitialVTuberData",
            {
              id: channelId,
              name,
              platform,
              corporation,
              uploadData,
              title,
              description,
              handle,
              url: channelUrl,
              creationDate,
              profileImage,
              country,
              views,
              subscribers,
              videoCount,
              keywords,
              bannerImage,
            },
            config,
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Button variant="contained" onClick={getAndUploadVTuberData}>
        Load initial data!
      </Button>
    </>
  );
};

export default Admin;
