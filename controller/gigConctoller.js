import { Gig } from "../model/gigModel.js";
import { createFilterFromRequest } from "../utils/gigUtils.js";
import e from "../utils/error.js";
import c from "../utils/catchAsync.js";
import uploadImage from "../utils/cloudinary.js";

export const createGig = c(async (req, res, next) => {
  // gig e image eklemek için multer kullanıcaz. İlk başta deneme için image ye default value verdik
  console.log("crreate gige geldik");
  if (!req.isSeller) {
    return next(
      e(
        403,
        "You have not permission to create a new gig. Please change ypur account status to seller account!"
      )
    );
  }

  console.log("is seller gecti");

  // kapak fotografini coludinary ye yukle
  const coverImage = req.files.coverImage[0];
  const uploadedCoverImage = await uploadImage(
    next,
    coverImage.path,
    "gig-images"
  );

  console.log("kapak fotogrrafi yuklendi");

  // images lasi yukle, en fazla 6 tane alinabilen fotograflar
  const promises = req.files.images.map((image) =>
    uploadImage(
      next,
      image.path,
      "gig-images",
      undefined,
      undefined,
      "fill",
      80
    )
  );
  console.log("images lar in istegi atildi");

  const images = await Promise.all(promises);

  console.log("promiseler alindi");

  // resimleri req.body ye ekle
  req.body.coverImage = uploadedCoverImage.secure_url;

  req.body.images = images.map((image) => image.secure_url);

  const savedGig = await Gig.create({
    ...req.body,
    user: req.userId,
    packageFeatures: req.body.packageFeatures.split(","),
  });

  console.log("image lar save edildi");

  return res.status(201).json({
    success: true,
    message: "Your gig has created successfully!",
    data: savedGig,
  });
});

export const getAllGigs = c(async (req, res, next) => {
  const filters = createFilterFromRequest(req);
  console.log("FILTERS : ", filters);
  const allGigs = await Gig.find(filters).populate("user", "-password");

  if (allGigs.length === 0)
    return next(e(404, "There are no any data matched with database!"));

  return res.status(200).json({
    success: true,
    message: "Fetcehd all gigs successfully!",
    totalGigsCount: allGigs.length,
    data: allGigs,
  });
});

export const getGig = c(async (req, res) => {
  const gigId = req.params.id;
  console.log(gigId);

  const gig = await Gig.findById(gigId).populate("user");

  res.status(200).json({
    success: true,
    message: "Get just one gig!",
  });
});
export const deleteGig = c(async (req, res, next) => {
  const id = req.params.id;

  const gig = await Gig.findById(id).populate("user");
  console.log(gig);

  console.log(
    "LOGIN OLMUS USER : ",
    req.userId,
    "\nSILMEK ISTEYEN USER : ",
    String(gig.user._id)
  );

  if (!gig) return next(e(404, "Could not find the gig you wanted to delete!"));

  // ^ eger String ile almaya calismazsak ObjectId olarak aliyor
  if (String(gig.user._id) !== req.userId)
    return next(e(401, "Can not delete gig belong other user!"));

  await Gig.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Gig has deleted successfully!",
  });
});

export const updateGig = c(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update gig!",
  });
});
