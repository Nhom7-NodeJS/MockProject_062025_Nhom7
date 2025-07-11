<<<<<<< HEAD
import { plainToInstance } from 'class-transformer';
import { validate , ValidationError} from 'class-validator';
import {  CreateWarrantDto } from './dto/warrant.create.dto';
import{ SearchWarrantDto} from './dto/warrant.search.dto';
=======
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

import { CreateWarrantDto } from "./dto/warrant.create.dto";
import { SearchWarrantDto } from "./dto/warrant.search.dto";

>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
type ValidationResult =
  | { valid: true }
  | { valid: false; errors: ValidationError[] };

// It uses the CreateWarrantDto class to define the validation rules
<<<<<<< HEAD
export async function validateCreateWarrant(input: any): Promise<ValidationResult> {
=======
export async function validateCreateWarrant(
  input: any
): Promise<ValidationResult> {
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
  const dto = plainToInstance(CreateWarrantDto, input);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true };
}
// It uses the SearchWarrantDto class to define the validation rules
<<<<<<< HEAD
export async function validateSearchWarrantByName(input: any): Promise<ValidationResult> {
=======
export async function validateSearchWarrantByName(
  input: any
): Promise<ValidationResult> {
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
  const dto = plainToInstance(SearchWarrantDto, input);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true };
}
<<<<<<< HEAD


=======
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
