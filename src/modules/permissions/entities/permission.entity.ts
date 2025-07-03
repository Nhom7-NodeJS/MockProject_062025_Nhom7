import { RolesPermissions } from "@/modules/permissions_roles/entities/permission_role.entity";
import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";

@Entity("permissions")
export class Permission {
  @PrimaryColumn({ type: "varchar" })
  permission_id!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ default: false })
  is_deleted!: boolean;

  @OneToMany(
    () => RolesPermissions,
    (rolesPermissions) => rolesPermissions.permission
  )
  roles_permissions!: RolesPermissions[];
}
