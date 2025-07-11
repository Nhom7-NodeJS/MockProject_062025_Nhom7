export class TaskDetailResponseDto {
  taskId?: string;
  taskName?: string;
  deadline?: Date;
  status?: string;
  content?: string;
  evidences?: TaskEvidenceDto;
  invest?: TaskInvestDto;
}

export interface TaskEvidenceDto {
  evidenceId: string;
  description: string;
  attachFile: string;
}

export interface TaskInvestDto {
  summary?: string;
  attachFile?: string[];
}
