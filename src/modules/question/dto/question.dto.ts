export class CreateQuestionDto {
  questionId!: string;        // PK
  interviewId!: string;       // FK
  createdBy!: string;         // FK
  content!: string;
  answer?: string;
  reliability?: number;       
  isDeleted?: boolean;
}

export interface QuestionResponseDto {
  questionId: string;        // PK
  interviewId: string;       // FK
  createdBy: string;         // FK
  content: string;
  answer?: string;
  reliability?: number;      // Có thể là một số
  isDeleted?: boolean;
}