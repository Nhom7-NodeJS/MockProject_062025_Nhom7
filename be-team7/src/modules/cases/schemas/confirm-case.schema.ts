import Joi from 'joi';

// Request body schema
export const confirmCaseBodySchema = Joi.object({
  investigators: Joi.array()
    .items(Joi.string()
      .required()
      .messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username is required',
        'any.required': 'Username is required'
      }))
    .min(1)
    .required()
    .messages({
      'array.base': 'Investigators must be an array of usernames',
      'array.min': 'At least one investigator is required',
      'any.required': 'Investigators are required'
    }),
  notes: Joi.string()
    .allow('')
    .optional()
    .messages({
      'string.base': 'Case notes must be a string'
    })
});

// Path parameters schema
export const confirmCaseParamsSchema = Joi.object({
  caseId: Joi.string()
    .required()
    .messages({
      'string.base': 'Case ID must be a string',
      'string.empty': 'Case ID is required',
      'any.required': 'Case ID is required'
    })
});
