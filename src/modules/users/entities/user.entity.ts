import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Interview } from "@/modules/interviews/entities/interview.entity";
import { InvestigationPlan } from "@/modules/investigation_plans/entities/investigation_plan.entity";
import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";
import { ProsecutionUser } from "@/modules/prosecutions_users/entities/prosecution_user.entity";
import { Question } from "@/modules/questions/entity/question.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { Role, UserRole } from "@/modules/roles/entities/role.entity";
import { CaseUser } from "@/modules/cases_users/entities/case_user.entity";
import { Gender, UserStatus } from "../enums/user.enum";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";

@Entity("users")
export class User {
  @PrimaryColumn()
  username!: string;

  @Column()
  password_hash!: string;

  @Column()
  fullname!: string;

  @Column({ nullable: true })
  avatar_url?: string;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ type: "enum", enum: Gender, default: Gender.UNKNOWN, nullable: true })
  gender?: Gender;

  @Column({ type: "timestamp" })
  dob!: Date;

  @Column({ type: "timestamp" })
  date_attended!: Date;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @Column({ type: "timestamp" })
  create_at!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @Column({ nullable: true })
  refresh_token?: string;

  @Column({nullable: true})
  email?: string;
  // OneToMany
  @OneToMany(() => CaseUser, (caseUser) => caseUser.user)
  caseUsers!: CaseUser[];

  @OneToMany(() => Evidence, (evidence) => evidence.user)
  evidences!: Evidence[];

  @OneToMany(
    () => InvestigationPlan,
    (investigationPlan) => investigationPlan.createdOfficer
  )
  investigationPlans!: InvestigationPlan[];

  @OneToMany(() => Interview, (interview) => interview.interviewer)
  interviews!: Interview[];

  @OneToMany(() => Prosecution, (prosecution) => prosecution.user)
  prosecutions!: Prosecution[];

  @OneToMany(() => ProsecutionUser, (prosecutionUser) => prosecutionUser.user)
  prosecutionUsers!: ProsecutionUser[];

  @OneToMany(() => Question, (question) => question.user)
  questions!: Question[];

  @OneToMany(() => Report, (report) => report.user)
  reports!: Report[];

  @OneToMany(() => Warrant, (warrant) => warrant.user)
  warrants!: Warrant[];

  // ManyToOne
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role!: Role;}
