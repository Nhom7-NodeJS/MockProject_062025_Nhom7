import { Request, Response, NextFunction, RequestHandler } from 'express';

import { BaseJoiDto } from '@/shared/dto/base.dto';

type RequestSource = 'body' | 'query' | 'params';
type Constructor<T> = new (...args: any[]) => T;

declare global {
  namespace Express {
    interface Request {
      validated?: BaseJoiDto;
    }
  }
}

/**
 * Middleware factory for validating request data against a Joi schema
 * @param DtoClass The DTO class to validate against (must extend BaseJoiDto)
 * @param source The request property to validate (default: 'body')
 */
export function validateJoi<Dto extends BaseJoiDto>(
  DtoClass: Constructor<Dto> & typeof BaseJoiDto,
  source: RequestSource = 'body'
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Create and validate DTO instance using the static fromRequest method
      const dto = DtoClass.fromRequest(req[source]);
      
      // Get the schema from the DTO class
      const schema = DtoClass.schema;
      if (!schema) {
        throw new Error(`No Joi schema defined in ${DtoClass.name}`);
      }
      
      // Validate the DTO using Joi schema
      const validationErrors = await DtoClass.validate(dto);
      
      if (validationErrors) {
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: validationErrors,
        });
        return;
      }
      
      // Attach the validated DTO to the request object
      req.validated = dto;
      next();
    } catch (error) {
      next(error);
    }
  };
}
