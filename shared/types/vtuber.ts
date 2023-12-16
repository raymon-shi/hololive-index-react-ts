import { corporation, platform } from "./constants";
import ISocialMedia from "./social-media";
import IChannelDetails from "./channel-details";
import IVideoDetails from "../types/video-details";

interface IVTuber extends IChannelDetails {
  id: string;
  name: string;
  platform: platform;
  corporation: corporation;
  socials?: ISocialMedia[];
  uploadData: IVideoDetails[];
  isLive: boolean;
}

export default IVTuber;
