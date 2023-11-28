import { Request, Response, NextFunction } from 'express'

/*Verifica se o usuário está autenticado usando req.isAuthenticated()*/
export default function isAuth (req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) { /*É uma função fornecida pelo Passport.js que verifica se o usuário está autenticado. Se o usuário estiver autenticado, ela retorna true; caso contrário, retorna false.*/
    next() /*Se o usuário estiver autenticado, ele chama next() para passar a solicitação para o próximo middleware na cadeia ou rota. */
  } else {
    res.status(401).send() /*Se o usuário não estiver autenticado, ele responde com um status 401 (Não Autorizado).*/
  }
}