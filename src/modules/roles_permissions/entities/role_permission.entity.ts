import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "@/modules/roles/entities/role.entity";
import { Permission } from "@/modules/permission/entities/permission.entity";

@Entity('roles_permissions')
export class RolePermission {
  @PrimaryColumn()
  role_id!: string;

  @PrimaryColumn()
  permission_id!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Role, (role) => role.rolePermissions)
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
  @JoinColumn({ name: 'permission_id' })
  permission!: Permission;
}