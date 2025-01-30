import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

// Verifies the auth token exists and adds user data to the request object
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {  
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Retreive token
    const token = authHeader.split(' ')[1];

    // Retreive secret key
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Validate the token using the key
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      // Attach user info to the request object
      req.user = user as JwtPayload;
      return next();
    })
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
