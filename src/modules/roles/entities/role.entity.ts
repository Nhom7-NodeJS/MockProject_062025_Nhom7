import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { User } from "@/modules/users/entities/user.entity";
import { RolesPermissions } from "@/modules/permissions_roles/entities/permission_role.entity";

@Entity("roles")
export class Role {
  @PrimaryColumn()
  role_id!: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];

  @Column()
  description!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @OneToMany(
    () => RolesPermissions,
    (rolesPermissions) => rolesPermissions.role
  )
  roles_permissions!: RolesPermissions[];
}
