import Joi from 'joi';
import { TaskStatus } from '../enums/task.enum';

export const createTaskSchema = Joi.object({
  task_name: Joi.string().required().messages({
    'string.empty': 'Task name is required',
    'any.required': 'Task name is required',
  }),
  
  content: Joi.string().allow('').optional(),

  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .optional()
    .messages({
      'any.only': `Status must be one of: ${Object.values(TaskStatus).join(', ')}`,
    }),
  
  start_date: Joi.date().iso().required().messages({
    'date.base': 'Start date must be a valid date',
    'date.format': 'Start date must be in ISO 8601 format (e.g., YYYY-MM-DDTHH:MM:SSZ)',
    'any.required': 'Start date is required',
  }),
  
  due_date: Joi.date()
    .iso()
    .greater(Joi.ref('start_date'))
    .optional()
    .messages({
      'date.base': 'Due date must be a valid date',
      'date.format': 'Due date must be in ISO 8601 format (e.g., YYYY-MM-DDTHH:MM:SSZ)',
      'date.greater': 'Due date must be after start date',
    }),
  
  case_id: Joi.string().required().messages({
    'string.empty': 'Case ID is required',
    'any.required': 'Case ID is required',
  }),
  
  username: Joi.string().required().messages({
    'string.empty': 'Username is required',
    'any.required': 'Username is required',
  }),
});

export default createTaskSchema;
