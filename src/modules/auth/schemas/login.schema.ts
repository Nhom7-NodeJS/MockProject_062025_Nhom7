import Joi from 'joi';
import { LoginDto } from '../dto/login.dto';

export const loginSchema = Joi.object<LoginDto>({
  username: Joi.string().required().messages({
    'string.empty': 'Username is required',
    'any.required': 'Username is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  }),
});
