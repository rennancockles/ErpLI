import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { JsonWebTokenError } from 'jsonwebtoken'
import { QueryFailedError } from 'typeorm';

interface ValidationErrors {
  [key: string]: string[];
}

const validationErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let errors: ValidationErrors = {};

  error.inner.forEach((err: ValidationError) => {
    errors[err.path] = err.errors
  });

  return res.status(400).json({ message: 'Validation fails', errors })
}

const authErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  return res.status(401).json({ message: error.message })
}

const notFoundErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  return res.status(404).json({ message: 'Entity not found' })
}

const conflictErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const dupRegex = /entry '(.*)' for/
  const matches = dupRegex.exec(error.message)
  let entry = ''

  if (matches && matches.length >= 2) {
    entry = matches[1]
  }

  return res.status(409).json({ message: 'Duplicate entry', entry })
}


const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) validationErrorHandler(error, req, res, next)
  else if (error instanceof EntityNotFoundError) notFoundErrorHandler(error, req, res, next)
  else if (error instanceof JsonWebTokenError) authErrorHandler(error, req, res, next)
  else if (error instanceof QueryFailedError && error.message.startsWith('ER_DUP_ENTRY')) conflictErrorHandler(error, req, res, next)
  
  console.error(error);

  return res.status(500).json({ message: 'Internal Server Error' })
};

export default errorHandler;