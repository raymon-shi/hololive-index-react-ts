interface IVideoDetails {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  publishedAt: string;
  duration: string;
  views: string;
  likes: string;
  comments: string;
  actualStartTime: string;
  actualEndTime: string;
  scheduledStartTime: string;
}

export default IVideoDetails;
