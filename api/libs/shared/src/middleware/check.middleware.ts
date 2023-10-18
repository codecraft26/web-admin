import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ExecutionContext } from '@nestjs/common';
import * as passport from 'passport';
@Injectable()
export class CheckMiddleware implements NestMiddleware {
use(req: Request, res: Response, next: NextFunction) {
const {email,password}=req.body;

next();
}
}


