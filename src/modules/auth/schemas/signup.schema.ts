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
  fullname: Joi.string().required().messages({
    'string.empty': 'Full name is required',
    'any.required': 'Full name is required'
  }),
  dob: Joi.date().iso().required().messages({
    'date.base': 'Date of birth must be a valid date',
    'date.format': 'Date of birth must be in ISO format (YYYY-MM-DD)',
    'any.required': 'Date of birth is required'
  }),
  phone_number: Joi.string().optional().messages({
    'string.base': 'Phone number must be a string'
  }),
  gender: Joi.string().valid(...Object.values(Gender)).optional().messages({
    'any.only': `Gender must be one of: ${Object.values(Gender).join(', ')}`
  }),
  date_attended: Joi.date().iso().required().messages({
    'date.base': 'Date attended must be a valid date',
    'date.format': 'Date attended must be in ISO format (YYYY-MM-DD)',
    'any.required': 'Date attended is required'
  }),
  roleType: Joi.string().valid(...Object.values(RoleType)).default(RoleType.CENSOR).messages({
    'any.only': `Role type must be one of: ${Object.values(RoleType).join(', ')}`
  })
});
