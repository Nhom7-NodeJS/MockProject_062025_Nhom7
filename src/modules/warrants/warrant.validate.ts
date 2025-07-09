import { plainToInstance } from 'class-transformer';
import { validate , ValidationError} from 'class-validator';
import {  CreateWarrantDto } from './dto/warrant.create.dto';
import{ SearchWarrantDto} from './dto/warrant.search.dto';
type ValidationResult =
  | { valid: true }
  | { valid: false; errors: ValidationError[] };

export async function validateCreateWarrant(input: any): Promise<ValidationResult> {
  const dto = plainToInstance(CreateWarrantDto, input);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true };
}
export async function validateSearchWarrantByName(input: any): Promise<ValidationResult> {
  const dto = plainToInstance(SearchWarrantDto, input);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true };
}


