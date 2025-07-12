import { TypeOfHoliday } from "@/modules/holidays/enums/holiday.enum";

// DTO (Data Transfer Object) for creating a new holiday
export class CreateHolidayDto {
 
  holiday_name!: string;

  type_of_holiday!: TypeOfHoliday;

  date_of_holiday!: string; // ISO string (e.g., "2025-09-02T00:00:00.000Z")

  note?: string;

  is_deleted?: boolean;
}
