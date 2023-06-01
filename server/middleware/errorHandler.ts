import { Request, Response, NextFunction } from "express";

export type Err = Error & {
  status: number;
};

export const errorHandler = (err: Err, _req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  const status = err.status || 400;
  res.status(status).send({ error: err.message });

  next(err);
};
