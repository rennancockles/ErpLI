import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { JsonWebTokenError } from 'jsonwebtoken'

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

const notFoundErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  return res.status(404).json({ message: 'Entity not found' })
}

const authErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  return res.status(401).json({ message: error.message })
}


const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) validationErrorHandler(error, req, res, next)
  else if (error instanceof EntityNotFoundError) notFoundErrorHandler(error, req, res, next)
  else if (error instanceof JsonWebTokenError) authErrorHandler(error, req, res, next)
  
  console.error(error);

  return res.status(500).json({ message: 'Internal Server Error' })
};

export default errorHandler;