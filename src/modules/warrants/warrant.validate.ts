import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

import { CreateWarrantDto } from "./dto/warrant.create.dto";
import { SearchWarrantDto } from "./dto/warrant.search.dto";

type ValidationResult =
  | { valid: true }
  | { valid: false; errors: ValidationError[] };

// It uses the CreateWarrantDto class to define the validation rules
export async function validateCreateWarrant(
  input: any
): Promise<ValidationResult> {
  const dto = plainToInstance(CreateWarrantDto, input);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true };
}
// It uses the SearchWarrantDto class to define the validation rules
export async function validateSearchWarrantByName(
  input: any
): Promise<ValidationResult> {
  const dto = plainToInstance(SearchWarrantDto, input);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true };
}
