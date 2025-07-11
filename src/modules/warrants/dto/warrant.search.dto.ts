<<<<<<< HEAD


=======
>>>>>>> origin/dev3
import {
  IsString,
  IsNotEmpty,
} from "class-validator";

<<<<<<< HEAD

// DTO (Data Transfer Object) for creating a new warrant
export class SearchWarrantDto {

  @IsNotEmpty()
  @IsString()
  warrant_name!: string;

=======
// DTO (Data Transfer Object) for creating a new warrant
export class SearchWarrantDto {
  @IsNotEmpty()
  @IsString()
  warrant_name!: string;
>>>>>>> origin/dev3
}
