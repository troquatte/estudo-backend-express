//Configs
import jwt from "jsonwebtoken";
import { promisify } from "util";

import authConfig from "../../config/auth";
/***********/

//Verificação JWT
export default async (req, res, next) => {
  //Puxa a info dos headers.authorization
  const authHeader = req.headers.authorization;
  //Verifica se existe o Token
  if (!authHeader) {
    return res.status(401).json({
      error: "Token not provided"
    });
  }
  //Const remove o bearer do header com split
  const [, token] = authHeader.split(" ");

  //Verificação com Try
  try {
    //Decoded do jwt
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (e) {
    //Caso o token der errado, msg de error
    return res.status(401).json({ error: "Token not provided" });
  }
};
