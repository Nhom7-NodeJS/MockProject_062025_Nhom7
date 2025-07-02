import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Role } from "@/modules/roles/entities/role.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { Interview } from "@/modules/interview/entities/interview.entity";
import { InvestigationPlan } from "@/modules/investigation_plans/entities/investigation_plan.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";
import { UserCase } from "@/modules/users_cases/entities/user_case.entity";
import { Question } from "@/modules/questions/entity/question.entity";

@Entity('users')
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
  phonenumber!: string;

  @CreateDateColumn()
  create_at!: Date;

  @Column()
  role_id!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Role, (role) => role.users, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @OneToMany(() => Report, (report) => report.user)
  reports?: Report[];

  @OneToMany(() => Interview, (interview) => interview.interviewer)
  interviews?: Interview[];

  @OneToMany(() => InvestigationPlan, (investigationPlan) => investigationPlan.createdBy)
  investigationPlans?: InvestigationPlan[];

  @OneToMany(() => Evidence, (evidence) => evidence.collectedBy)
  collectedEvidences?: Evidence[];

  @OneToMany(() => Prosecution, (prosecution) => prosecution.prosecutor)
  prosecutions?: Prosecution[];

  @OneToMany(() => UserCase, (userCase) => userCase.user)
  userCases?: UserCase[];

  @OneToMany(() => Question, (question) => question.createdBy)
  questions?: Question[];
}
