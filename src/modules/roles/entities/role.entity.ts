import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { User } from "@/modules/users/entities/user.entity";
import { RolePermission } from "@/modules/roles_permissions/entities/role_permission.entity";

@Entity('roles')
export class Role {
  @PrimaryColumn()
  role_id!: string;

  @Column()
  description!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @OneToMany(() => User, (user) => user.role)
  users?: User[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions?: RolePermission[];
}