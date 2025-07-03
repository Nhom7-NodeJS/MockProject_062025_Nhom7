import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Role } from "@/modules/roles/entities/role.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { Interview } from "@/modules/interview/entities/interview.entity";
import { InvestigationPlan } from "@/modules/investigation_plan/entities/investigation_plan.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Prosecution } from "@/modules/prosecution/entities/prosecution.entity";
import { UsersCases } from "@/modules/user_case/entities/user_case.entity";
import { Question } from "@/modules/question/entity/question.entity";

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

  @Column()
  email!: string;

  @Column()
  phone_number!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  create_at!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @OneToMany(() => Report, (report) => report.user, { nullable: true })
  reports!: Report[];

  @OneToMany(() => Interview, (interview) => interview.interviewer)
  interviews!: Interview[];

  @OneToMany(
    () => InvestigationPlan,
    (investigationPlan) => investigationPlan.created_officer_id
  )
  investigation_plans!: InvestigationPlan[];

  @OneToMany(() => Evidence, (evidence) => evidence.user)
  evidences!: Evidence[];

  @OneToMany(() => Prosecution, (prosecution) => prosecution.user)
  prosecutions!: Prosecution[];

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @OneToMany(() => UsersCases, (usersCases) => usersCases.user)
  users_cases!: UsersCases[];

  @OneToMany(() => Question, (question) => question.user)
  questions!: Question[];
}
