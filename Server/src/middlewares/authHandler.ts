import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express';

interface IToken {
  exp: number
  iat: number
  uid: number
  sid: number
}

const authHandler: RequestHandler = (req, res, next) => {
  const authorization = req.get('Authorization')

  if (req.url.startsWith('/auth')) {
    next()
    
  } else if (authorization) {
    const [authType, token] = authorization.split(' ')

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET||'') as IToken

    res.locals.userId = decodedToken.uid
    res.locals.storeId = decodedToken.sid

    return next()

  } else {
    throw new jwt.JsonWebTokenError('Auth error')
  } 
  
};

export default authHandler;