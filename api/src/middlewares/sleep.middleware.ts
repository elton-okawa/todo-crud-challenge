import { NextFunction, Request, Response } from 'express';

function sleep(timeMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });
}

export async function sleepMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  await sleep(2000);
  next();
}
