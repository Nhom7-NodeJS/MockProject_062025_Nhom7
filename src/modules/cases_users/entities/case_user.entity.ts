import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { User } from "@/modules/users/entities/user.entity";

@Entity("cases_users")
export class CaseUser {
  @PrimaryColumn()
  case_id!: string;

  @PrimaryColumn()
  user_id!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.caseUsers)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => User, (user) => user.caseUsers)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
