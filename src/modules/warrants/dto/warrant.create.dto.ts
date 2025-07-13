import { WarrantStatus } from "@/modules/financial_invests/enums/financial_invest.enum";

// DTO (Data Transfer Object) for creating a new warrant
export class CreateWarrantDto {
  warrant_name!: string;

  police_response!: string;

  attached_file?: string[];

  time_publish!: string;

  is_deleted?: boolean;

  status?: WarrantStatus;

  case_id!: string;
}
