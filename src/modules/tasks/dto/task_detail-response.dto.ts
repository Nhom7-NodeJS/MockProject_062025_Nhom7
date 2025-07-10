export class TaskDetailResponseDto {
  taskId?: string;
  taskName?: string;
  deadline?: Date;
  status?: string;
  summary?: string;
  content?: string;
  evidences?: TaskEvidenceDto[];
}

export interface TaskEvidenceDto {
  evidenceId: string;
  description: string;
  attachFile: string;
  summary: string | null;
}
