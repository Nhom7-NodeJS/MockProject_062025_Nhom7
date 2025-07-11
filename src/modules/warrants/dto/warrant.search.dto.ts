import {
  IsString,
  IsNotEmpty,
} from "class-validator";

// DTO (Data Transfer Object) for creating a new warrant
export class SearchWarrantDto {
  @IsNotEmpty()
  @IsString()
  warrant_name!: string;
}
