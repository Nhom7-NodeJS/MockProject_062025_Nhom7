export class TaskDetailResponseDto {
  taskId?: string;
  taskName?: string;
  deadline?: Date;
  status?: string;
  content?: string;
  evidences?: ITaskEvidenceDto;
  invest?: ITaskInvestDto;
}

export interface ITaskEvidenceDto {
  evidenceId: string;
  description: string;
  attachFile: string;
}

export interface ITaskInvestDto {
  summary?: string;
  attachFile?: string[];
}
