import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { PermissionRole } from "@/modules/permissions_roles/entities/permission_role.entity"
import { User } from "@/modules/users/entities/user.entity";

@Entity("roles")
export class Role {
  @PrimaryColumn()
  role_id!: string;

  @Column()
  description!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // OneToMany
  @OneToMany(() => User, (user) => user.role)
  users!: User[];

  @OneToMany(
    () => PermissionRole,
    (permissionRole) => permissionRole.role
  )
  permissionRoles!: PermissionRole[];
}
