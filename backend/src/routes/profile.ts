import express, { Request, Response, NextFunction } from "express";
import VTuber from "../models/VTuber";

const router = express.Router();

router.get("/:profileId", async (req: Request, res: Response, next: NextFunction) => {
  const { params } = req;
  const { profileId } = params;

  try {
    const profileData = await VTuber.findOne({ id: profileId });
    res.status(200).json(profileData);
  } catch (error) {
    next(new Error("Error with retrieving profile data"));
  }
});

export default router;
