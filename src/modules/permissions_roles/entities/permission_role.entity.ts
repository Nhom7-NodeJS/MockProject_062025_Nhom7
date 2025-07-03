import { Permission } from "@/modules/permissions/entities/permission.entity";
import { Role } from "@/modules/roles/entities/role.entity";
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from "typeorm";

@Entity("roles_permissions")
export class RolesPermissions {
  @PrimaryColumn()
  role_id!: string;

  @PrimaryColumn()
  permission_id!: string;

  @ManyToOne(() => Role, (role) => role.roles_permissions)
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @ManyToOne(() => Permission, (permission) => permission.roles_permissions)
  @JoinColumn({ name: "permission_id" })
  permission!: Permission;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
