// Input DTO (from req.body)
export class CreateArrestDto {
  suspectId!: string;
  caseId!: string;
  officerId!: string;
  suspectMirandaSignature?: string;
  arrestStartTime!: Date;
  arrestEndTime?: Date;
}

// Output DTO (for response)
export class UpdateArrestDto {
  officerId?: string;
  suspectMirandaSignature?: string;
  arrestStartTime?: Date;
  arrestEndTime?: Date;
  isDeleted?: boolean;
}
