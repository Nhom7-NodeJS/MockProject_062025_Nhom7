import Joi from 'joi';

import { BaseJoiDto } from '@/shared/dto/base.dto';

export class UpdateUserDto extends BaseJoiDto {
  name?: string;
  email?: string;
  password?: string;

  static schema = Joi.object({
    name: Joi.string()
      .min(2)
      .optional()
      .messages({
        'string.min': 'Name must be at least 2 characters long',
      }),
    
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .optional()
      .messages({
        'string.email': 'Invalid email format',
      }),
    
    password: Joi.string()
      .min(6)
      .optional()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
      }),
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update',
  });
}
