import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { PermissionRole } from "@/modules/permissions_roles/entities/permission_role.entity";
import { User } from "@/modules/users/entities/user.entity";
import { UserRole } from "@/modules/roles/enums/role.enum";

// No enums, roles_id is this
// export enum UserRole {
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

  @Column({ type: "enum", enum: UserRole })
  description!: UserRole;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // OneToMany
  @OneToMany(() => User, (user) => user.role)
  users!: User[];

  @OneToMany(() => PermissionRole, (permissionRole) => permissionRole.role)
  permissionRoles!: PermissionRole[];
}
