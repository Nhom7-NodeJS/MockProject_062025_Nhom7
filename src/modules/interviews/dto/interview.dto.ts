export class CreatePermissionDto {
  permissionId!: string;  // PK
  description!: string;
  isDeleted?: boolean;
}
export interface PermissionResponseDto {
  permissionId: string;  // PK
  description: string;
  isDeleted?: boolean;
}