import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

interface IDecodedInterface {
  id: string;
}

async function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não encontado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const jwtSecret = process.env.APP_SECRET as string;
    const decoded: IDecodedInterface = jwt.verify(
      token,
      jwtSecret
    ) as IDecodedInterface;

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json(err);
  }
}
export default auth;
