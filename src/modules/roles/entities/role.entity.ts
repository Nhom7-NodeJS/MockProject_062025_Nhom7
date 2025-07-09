import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { PermissionRole } from "@/modules/permissions_roles/entities/permission_role.entity";
import { User } from "@/modules/users/entities/user.entity";

// No enum type in database, roles_id is this
// export enum RoleType {
//   CENSOR = "Censor",
//   INVESTIGATOR = "Investigator",
//   POLICE_CHIEF = "Police Chief",
//   FORENSIC_OFFICER = "Forensic Officer",
//   FINANCIAL_INVESTIGATOR = "Financial Investigator",
// }

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

  @OneToMany(() => PermissionRole, (permissionRole) => permissionRole.role)
  permissionRoles!: PermissionRole[];
}
