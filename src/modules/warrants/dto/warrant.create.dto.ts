

import {
  IsString,
  IsArray,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
} from "class-validator";
import { WarrantStatus } from "@/modules/financial_invests/enums/financial_invest.enum";

// DTO (Data Transfer Object) for creating a new warrant
export class CreateWarrantDto {
  @IsString()
  @IsNotEmpty()
  warrant_name!: string;

  @IsString()
  @IsNotEmpty()
  police_response!: string;

  @IsOptional()
  @IsArray()
  attached_file?: string[];

  @IsDateString()
  time_publish!: string;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;

  @IsEnum(WarrantStatus)
  @IsOptional()
  status?: WarrantStatus;
 
  @IsNotEmpty()
  @IsString()
  case_id!: string;
}
