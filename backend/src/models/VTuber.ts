import { Schema, model, Document } from "mongoose";
import IVTuber from "../../../shared/types/vtuber";

type VTuberDoc = IVTuber & Document;

interface VTuberDocument extends VTuberDoc {}

const vtuberSchema = new Schema<VTuberDocument>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    platform: { type: Number, enum: [0, 1, 2, 3], default: 0, required: true },
    corporation: { type: Number, enum: [1, 2, 3] },
    socials: { type: [{ platform: Number, url: String }], default: [] },
    uploadData: {
      type: [
        {
          id: String,
          title: String,
          description: String,
          thumbnailUrl: String,
          tags: [String],
          publishedAt: String,
          duration: String,
          views: Number,
          likes: Number,
          comments: Number,
          actualStartTime: Date,
          actualEndTime: Date,
          scheduledStartTime: Date,
        },
      ],
    },
    title: { type: String, required: true },
    description: { type: String },
    handle: { type: String },
    url: { type: String, required: true },
    creationDate: { type: Date, required: true },
    profileImage: { type: String },
    country: { type: String, required: true },
    views: { type: Number, required: true },
    subscribers: { type: Number, required: true },
    videoCount: { type: Number, required: true },
    keywords: { type: [String] },
    bannerImage: { type: String },
    isLive: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const VTuber = model<IVTuber>("VTuber", vtuberSchema);

export default VTuber;
