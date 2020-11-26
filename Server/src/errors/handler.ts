import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

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

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) validationErrorHandler(error, req, res, next)
  
  console.error(error);

  return res.status(500).json({ message: 'Internal Server Error' })
};

export default errorHandler;