import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";

import { PermissionRole } from "@/modules/permissions_roles/entities/permission_role.entity";

@Entity("permissions")
export class Permission {
  @PrimaryColumn()
  permission_id!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // OneToMany
  @OneToMany(
    () => PermissionRole,
    (permissionRole) => permissionRole.permission
  )
  permissionRoles!: PermissionRole[];
}
