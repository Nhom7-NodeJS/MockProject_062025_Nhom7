import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Permission } from "@/modules/permissions/entities/permission.entity";
import { Role } from "@/modules/roles/entities/role.entity";

@Entity("permissions_roles")
export class PermissionRole {
  @PrimaryColumn()
  role_id!: string;

  @PrimaryColumn()
  permission_id!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // ManyToOne
  @ManyToOne(() => Permission, (permission) => permission.permissionRoles)
  @JoinColumn({ name: "permission_id" })
  permission!: Permission;

  @ManyToOne(() => Role, (role) => role.permissionRoles)
  @JoinColumn({ name: "role_id" })
  role!: Role;
}
