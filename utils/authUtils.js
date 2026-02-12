import jsonwebtoken from "jsonwebtoken";
import { config, isProduction } from "../config/environment.js";

export const createAndSaveToken = (id, isSeller, res) => {
  console.log(config.API_SECRET);
  const token = jsonwebtoken.sign({ id, isSeller }, config.API_SECRET, {
    expiresIn: config.API_EXP,
  });

  res.status(200).cookie("JWT", token, {
    secure: isProduction ? true : false,
    httpOnly: true,
    expires: new Date(Date.now() + 14 * 24 * 3600 * 1000),
    sameSite: "lax", // frontend ve backend farkli domainlerde olsa bile cookie yi gonder demektir
  });

  return token; // mobil cihazlarda giris yapilabilmesi icin sadece cookie olarak giris yapmak yetmez, json data icerisinde de gondermek gerekir
};

export const verifyJWT = (token) => {
  return jsonwebtoken.verify(token, config.API_SECRET);
};
