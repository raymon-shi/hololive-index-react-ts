import express, { Request, Response, NextFunction } from "express";
import VTuber from "../models/VTuber";

const router = express.Router();

//initial data upload to database
router.post("/uploadInitialVTuberData", async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const {
    id,
    name,
    platform,
    corporation,
    socials,
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
  } = body;
  try {
    const vtuberInDatabase = await VTuber.findOne({ id });
    if (!vtuberInDatabase) {
      await VTuber.create({
        id,
        name,
        platform,
        corporation,
        socials,
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
      });
    } else {
      await VTuber.updateOne({ id }, { uploadData, profileImage, views, subscribers, videoCount, bannerImage });
    }
    res.status(200).send(`Uploaded VTuber data!`);
  } catch (error) {
    res.status(500).send(`There was an error uploading the initial VTuber data!`);
    next(new Error(`There was an error uploading the initial VTuber data with error message: ${error}`));
  }
});

export default router;
