import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 * Validation middleware factory
 * Validates request body against a DTO class using class-validator
 *
 * @param dtoClass - The DTO class to validate against
 * @param skipMissingProperties - Whether to skip validation of missing properties (default: false)
 * @returns Express middleware function
 */
export function validateDTO(
  dtoClass: any,
  skipMissingProperties = false
) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Transform plain object to class instance
      const dtoInstance = plainToClass(dtoClass, req.body);

      // Validate the instance
      const errors: ValidationError[] = await validate(dtoInstance, {
        skipMissingProperties,
        whitelist: true, // Strip properties that don't have decorators
        forbidNonWhitelisted: true, // Throw error if non-whitelisted properties exist
      });

      // If there are validation errors, return 400
      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
          value: error.value,
        }));

        res.status(400).json({
          error: 'Validation failed',
          details: formattedErrors,
        });
        return;
      }

      // Attach the validated and transformed DTO to request
      req.body = dtoInstance;
      next();
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error during validation',
      });
    }
  };
}
