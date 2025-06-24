import Joi from 'joi';

import { BaseJoiDto } from '@/shared/dto/base.dto';

export class UserParamsDto extends BaseJoiDto {
  id: number = 0;

  static schema = Joi.object({
    id: Joi.number()
      .integer()
      .min(1)
      .required()
      .messages({
        'number.base': 'ID must be an integer',
        'number.integer': 'ID must be an integer',
        'number.min': 'ID must be greater than 0',
        'any.required': 'ID is required',
      }),
  });
}
