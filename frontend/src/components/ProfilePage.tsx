import { Card, CardContent, Divider, Typography } from "@mui/material";
import { Link, useLoaderData } from "react-router-dom";
import { corporation as corporationEnum, platform as platformEnum } from "../../../shared/types/constants";
import IVTuber from "../../../shared/types/vtuber";
import StatsTable from "./VideoTable";
import IVideoDetails from "../../../shared/types/video-details";

const getAllTimeStatsSummary = (videos: IVideoDetails[]) => {
  const likesArr: number[] = [];
  const commentsArr: number[] = [];
  const viewsArr: number[] = [];

  videos.forEach((video) => {
    const { likes, comments, views } = video;

    if (likes) {
      likesArr.push(parseInt(likes));
    }
    if (comments) {
      commentsArr.push(parseInt(comments));
    }
    if (views) {
      viewsArr.push(parseInt(views));
    }
  });

  const avgLikes = Math.round(likesArr.reduce((a, b) => a + b) / likesArr.length);
  const avgComments = Math.round(commentsArr.reduce((a, b) => a + b) / commentsArr.length);
  const avgViews = Math.round(viewsArr.reduce((a, b) => a + b) / viewsArr.length);

  return { avgLikes, avgComments, avgViews };
};

const ProfilePage = () => {
  const profileData: IVTuber = useLoaderData() as IVTuber;
  const {
    name,
    platform,
    corporation,
    uploadData,
    title,
    description,
    handle,
    url,
    creationDate,
    profileImage,
    country,
    views,
    subscribers,
    videoCount,
    keywords,
    bannerImage,
  } = profileData;

  const { avgComments, avgLikes, avgViews } = getAllTimeStatsSummary(uploadData);

  return (
    <>
      <Link to="/">Home</Link>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          {/* Basic Info */}
          <Typography variant="h1" color="text.secondary" gutterBottom>
            {name}
          </Typography>
          <img src={`${profileImage}`} alt="" />
          <Typography variant="body1">{country}</Typography>
          <Typography variant="body1">{corporationEnum[corporation]}</Typography>
          <Typography variant="body1">{platformEnum[platform]}</Typography>
          <Typography variant="body1">{title}</Typography>
          <Typography variant="body1">{handle}</Typography>
          <Typography variant="body1">{url}</Typography>
          <Typography>{`Channel created on: ${new Date(creationDate).toLocaleDateString()}`}</Typography>
          <Divider />

          {/* Description + Keywords */}
          <Typography variant="h3">Description</Typography>
          <img src={`${bannerImage}`} alt="" />
          <Typography variant="body2">{description}</Typography>
          <Typography variant="h5">{`Keywords`}</Typography>
          <Typography variant="body2">{keywords ? keywords[0].replace(" ", ", ") : null}</Typography>
          <Divider />

          {/* Channel Stats */}
          <Typography variant="h3">Stats</Typography>
          <Typography variant="body2">{`${subscribers.toLocaleString("en")} subscribers`}</Typography>
          <Typography variant="body2">{`${views.toLocaleString("en")} views`}</Typography>
          <Typography variant="body2">{`${videoCount.toLocaleString("en")} videos uploaded`}</Typography>

          <Typography variant="h5">Average video stats all time</Typography>
          <Typography variant="body2">{`${avgViews.toLocaleString("en")} views per video`}</Typography>
          <Typography variant="body2">{`${avgLikes.toLocaleString("en")} likes per video`}</Typography>
          <Typography variant="body2">{`${avgComments.toLocaleString("en")} comments per video`}</Typography>
        </CardContent>
      </Card>
      <StatsTable videos={uploadData} />
    </>
  );
};

export default ProfilePage;
