import { Request, Response, NextFunction } from 'express'

export default function isAuth (req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).send()
  }
}