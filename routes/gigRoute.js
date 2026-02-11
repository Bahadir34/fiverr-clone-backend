import express from "express";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getGig,
  updateGig,
} from "../controller/gigConctoller.js";
import { authorize } from "../middlewares/authMiddlewares.js";
import upload from "../utils/multer.js";

const gigRoute = express.Router();

gigRoute.route("/").post(
  authorize,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 6 },
  ]),
  createGig
);
gigRoute.route("/get-gigs").get(getAllGigs);
gigRoute
  .route("/:id")
  .get(getGig)
  .delete(authorize, deleteGig)
  .patch(updateGig);

export default gigRoute;
