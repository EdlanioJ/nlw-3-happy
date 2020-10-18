import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import { QueryFailedError } from 'typeorm';

interface ValidationErrors {
  [key: string]: string[];
}
const errorHander: ErrorRequestHandler = (error, request, response, next) => {
  console.error(error);

  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: 'validation fails', errors });
  }
  console.error(error);

  return response.status(500).json({ message: 'internal server error' });
};

export default errorHander;
