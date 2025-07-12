import Joi from 'joi';
import { CaseStatus } from '../enums/case.enum';

const caseStatusValues = Object.values(CaseStatus) as string[];

export const getAllCasesSchema = Joi.object({
  status: Joi.string()
    .valid(...caseStatusValues)
    .optional()
    .messages({
      'string.base': 'Status must be a string',
      'any.only': `Status must be one of: ${caseStatusValues.join(', ')}`
    }),
});

export const getPaginatedCasesSchema = Joi.object({
  status: Joi.string()
    .valid(...caseStatusValues)
    .optional()
    .messages({
      'string.base': 'Status must be a string',
      'any.only': `Status must be one of: ${caseStatusValues.join(', ')}`
    }),
  page: Joi.string()
    .pattern(/^\d+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Page must be a positive integer',
      'string.base': 'Page must be a string'
    }),
  limit: Joi.string()
    .pattern(/^\d+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Limit must be a positive integer',
      'string.base': 'Limit must be a string'
    }),
});