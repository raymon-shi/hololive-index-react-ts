import express, { Request, Response, NextFunction } from "express";
import VTuber from "../models/VTuber";

const router = express.Router();

router.get("/liveVTubers", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const liveVTubers = await VTuber.find({ isLive: true });
    res.status(200).json(liveVTubers);
  } catch (error) {
    next(new Error("Error getting live VTubers"));
  }
});

router.post("/updateLiveStatus", async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { id, isLive } = body;
  try {
    await VTuber.findOneAndUpdate({ id }, { isLive });
    res.status(200);
  } catch (error) {
    next(new Error("Error updating live status"));
  }
});

export default router;
