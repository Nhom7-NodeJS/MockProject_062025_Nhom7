import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { User } from "@/modules/users/entities/user.entity";
import { CaseUserRole } from "../enums/case_user.enum";

@Entity("cases_users")
export class CaseUser {
  @PrimaryColumn()
  case_id!: string;

  @PrimaryColumn()
  username!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "timestamp" })
  assigned_at!: Date;

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.caseUsers)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => User, (user) => user.caseUsers)
  @JoinColumn({ name: "username" })
  user!: User;
}
