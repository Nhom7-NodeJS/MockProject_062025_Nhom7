export class CreatePermissionDto {
  permissionId!: string;
  description?: string;
}

export interface PermissionResponseDto {
  permissionId: string;
  description?: string;
}