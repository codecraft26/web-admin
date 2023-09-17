import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
@Injectable()
export class CheckMiddleware implements NestMiddleware {
use(req: Request, res: Response, next: NextFunction) {

// const user = req.body.user
const headers = req.headers;
const body = req.body;
console.log(headers)

console.log(`Request Headers: ${JSON.stringify(headers)}`);
console.log(`Request Headers: ${JSON.stringify(body)}`);
  // 
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.body.user = user; // Attach the user object to the request
    next();
  })(req, res, next);

}
}

