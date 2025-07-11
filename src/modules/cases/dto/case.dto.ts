import { CaseStatus, CaseType, CaseSeverity } from '../enums/case.enum';

// Input DTO (from req.body)
export interface CreateCaseDto {
  case_name: string;
  type_case: CaseType;
  severity: CaseSeverity;
  summary?: string;
}

// Input DTO for update (from req.body)
export interface UpdateCaseDto extends Partial<CreateCaseDto> {
  status?: CaseStatus;
}

// Input DTO for query parameters
export interface QueryCaseDto {
  status?: CaseStatus;
  type_case?: CaseType;
  severity?: CaseSeverity;
  search?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'ASC' | 'DESC';
}

// Output DTO (for response)
export interface CaseResponseDto {
  case_id: string;
  case_name: string;
  type_case: CaseType;
  severity: CaseSeverity;
  status: CaseStatus;
  summary?: string;
  create_at: Date;
  update_at?: Date;
}
