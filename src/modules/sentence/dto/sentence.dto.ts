export class CreateSentenceDto {
  sentenceId!: string;
  caseId!: string;
  caseResultId!: string;
  sentenceType!: string;
  duration?: string;
  condition?: string;
  sentencingDate!: Date;
}

export interface SentenceResponseDto {
  sentenceId: string;
  caseId: string;
  caseResultId: string;
  sentenceType: string;
  duration?: string;
  condition?: string;
  sentencingDate: Date;
}