import { Request, Response, NextFunction, RequestHandler } from 'express';
import { BaseJoiDto } from '@/shared/dto/base.dto';

export function validateJoi<T extends BaseJoiDto>(
  type: new () => T,
  source: 'body' | 'query' | 'params' = 'body'
): RequestHandler {
  return (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Create instance of the DTO class
      const dto = new type();
      
      // Assign request data to DTO
      Object.assign(dto, req[source]);
      
      // Get the schema from the DTO class
      const schema = (dto.constructor as any).schema;
      if (!schema) {
        throw new Error(`No Joi schema defined in ${type.name}`);
      }
      
      // Validate the DTO using Joi schema
      const validationErrors = await (dto.constructor as typeof BaseJoiDto).validate(dto);
      
      if (validationErrors) {
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: validationErrors,
        });
        return;
      }

      // If DTO has custom validation
      if (typeof dto.validate === 'function') {
        const customErrors = await dto.validate();
        if (customErrors) {
          res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: customErrors,
          });
          return;
        }
      }

      // Attach the validated DTO to the request object
      req.validated = dto;
      next();
    } catch (error) {
      next(error);
    }
  }) as RequestHandler;
}

// Extend Express Request type to include validated property
declare global {
  namespace Express {
    interface Request {
      validated?: any;
    }
  }
}
