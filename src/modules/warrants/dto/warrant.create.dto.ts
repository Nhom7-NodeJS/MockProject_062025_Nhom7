// src/modules/warrants/dto/create-warrant.dto.ts

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

export class CreateWarrantDto {
  @IsString()
  @IsNotEmpty()
  warrant_id!: string;

  @IsString()
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

  @IsDateString()
  deadline!: string;


  @IsEnum(WarrantStatus)
  @IsOptional()
  status?: WarrantStatus;
 
  @IsNotEmpty()
  @IsString()
  case_id!: string;
}
