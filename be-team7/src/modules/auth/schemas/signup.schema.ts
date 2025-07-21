import Joi from 'joi';

import { Gender } from '@/modules/users/enums/user.enum';
import { RoleType } from '@/constants/role-type';

import { SignupDto } from '../dto/signup.dto';

export const signupSchema = Joi.object<SignupDto>({
  username: Joi.string().required().messages({
    'string.empty': 'Username is required',
    'any.required': 'Username is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address'
  }),
  fullname: Joi.string().required().messages({
    'string.empty': 'Full name is required',
    'any.required': 'Full name is required'
  }),
  dob: Joi.string().pattern(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/).required().messages({
    'string.pattern.base': 'Date of birth must be in MM-DD-YYYY format',
    'any.required': 'Date of birth is required'
  }),
  phone_number: Joi.string().optional().messages({
    'string.base': 'Phone number must be a string'
  }),
  gender: Joi.string().valid(...Object.values(Gender)).optional().messages({
    'any.only': `Gender must be one of: ${Object.values(Gender).join(', ')}`
  }),
  date_attended: Joi.string().pattern(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/).required().messages({
    'string.pattern.base': 'Date attended must be in MM-DD-YYYY format',
    'any.required': 'Date attended is required'
  }),
  roleType: Joi.string().valid(...Object.values(RoleType)).default(RoleType.CENSOR).messages({
    'any.only': `Role type must be one of: ${Object.values(RoleType).join(', ')}`
  })
});
