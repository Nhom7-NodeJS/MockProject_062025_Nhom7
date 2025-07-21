export class FinancialTaskDetailDto {
  task_id!: string;
  task_name!: string;
  deadline!: Date;
  status!: string;
  case_name!: string;
  content!: string;
  evidence_id?: string;
  evidence_description?: string;
  attach_file?: string;
}

export class UpdateFinancialTaskDto {
  summary!: string;
  note?: string;
  attach_file?: string; 
}