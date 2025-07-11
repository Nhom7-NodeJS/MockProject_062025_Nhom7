<<<<<<< HEAD


=======
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
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
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
}
