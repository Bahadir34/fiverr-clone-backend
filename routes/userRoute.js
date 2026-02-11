import express from "express";
import { getAllUsers } from "../controller/userController.js";
import { authorize } from "../middlewares/authMiddlewares.js";

const userRoute = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Tüm kullanıcıları getir
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Başarılı istek
 *       401:
 *         description: There is no token! Please send a valid json web token!
 *
 */
userRoute.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Ahmet" }]);
});
userRoute.get("/", authorize, getAllUsers);

export default userRoute;
