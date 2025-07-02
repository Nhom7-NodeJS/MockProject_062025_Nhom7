import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { RolePermission } from "@/modules/roles_permissions/entities/role_permission.entity";

@Entity("permission")
export class Permission {
  @PrimaryColumn()
  permission_id!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  is_deleted!: boolean;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
  rolePermissions?: RolePermission[];
}