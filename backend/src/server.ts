import http from "http";
import express, { Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
import cors from "cors";

import adminRouter from "../src/routes/admin";
import profileRouter from "../src/routes/profile";
import liveRouter from "../src/routes/live";

// mongodb and mongoose setup
const mongodbUsername = "";
const mongodbPassword = "";
const mongodbDatabase = "";
const mongodbConnection = "";

const port = process.env.PORT || 8080;
const MONGODB_URI =
  process.env.MONGODB_URI || `mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbDatabase}.${mongodbConnection}.mongodb.net/`;
mongoose.connect(MONGODB_URI);

const app = express();
app.use(express.json({ limit: "200mb" }));
app.use(cors());

app.use("/admin", adminRouter);
app.use("/profile", profileRouter);
app.use("/live", liveRouter);

// default error handling
app.use((err: any, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).send(`There was an error with error message: ${err}!`);
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`MongoDB is connected at ${MONGODB_URI}`);
});

export default app;
