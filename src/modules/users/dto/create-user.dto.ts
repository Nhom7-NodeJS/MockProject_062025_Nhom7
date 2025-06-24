import Joi from 'joi';

import { BaseJoiDto } from '@/shared/dto/base.dto';

export class CreateUserDto extends BaseJoiDto {
  name: string = '';
  email: string = '';
  password: string = '';

  static schema = Joi.object({
    name: Joi.string()
      .min(2)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters long',
        'string.empty': 'Name is required',
        'any.required': 'Name is required',
      }),
    
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
        'any.required': 'Email is required',
      }),
    
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
      }),
  });
}
