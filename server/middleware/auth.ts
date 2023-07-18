import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token || !process.env.JWT_SECRET) {
      return res.status(401).send({ error: "Token error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    (req as CustomRequest).token = decoded;
    return next();
  } catch (err) {
    return res.status(401).send("authentication error");
  }
};
