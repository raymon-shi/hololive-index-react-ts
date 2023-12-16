interface IChannelDetails {
  title: string;
  description?: string;
  handle?: string;
  url: string;
  creationDate: Date;
  profileImage?: string;
  country: string;
  views: number;
  subscribers: number;
  videoCount: number;
  keywords?: string[];
  bannerImage?: string;
}

export default IChannelDetails;
