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
import { Interview } from "@/modules/interviews/entities/interview.entity";
import { InvestigationPlan } from "@/modules/investigations_plans/entities/investigation_plan.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";
import { UsersCases } from "@/modules/users_cases/entities/user_case.entity";
import { Question } from "@/modules/questions/entity/question.entity";
import { ProsecutionsUsers } from "@/modules/prosecutions_users/entities/prosecutions_users.entity";

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

  @Column({ type: "timestamp" })
  dob!: Date;

  @Column({ type: "timestamp" })
  date_attended!: Date;

  @Column()
  status!: string;

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

  @OneToMany(
    () => ProsecutionsUsers,
    (prosecutionsUsers) => prosecutionsUsers.user
  )
  prosecutions_users!: ProsecutionsUsers[];
}
