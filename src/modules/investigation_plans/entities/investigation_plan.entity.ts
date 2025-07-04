import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { Interview } from "@/modules/interviews/entities/interview.entity";
import { User } from "@/modules/users/entities/user.entity";

@Entity("investigation_plans")
export class InvestigationPlan {
  @PrimaryColumn()
  investigation_plan_id!: string;

  @Column({ type: "timestamp" })
  deadline_date!: Date;

  @Column({ nullable: true })
  result?: string;

  @Column()
  status!: string;

  @Column({ type: "timestamp" })
  create_at!: Date;

  @Column({ nullable: true })
  plan_content?: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // OneToMany
  @OneToMany(() => Interview, (interview) => interview.investigationPlan)
  interviews?: Interview[];

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.investigationPlans)
  @JoinColumn({ name: 'case_id' })
  case!: Case;

  @ManyToOne(() => User, (user) => user.investigationPlans)
  @JoinColumn({ name: 'created_officer_id' })
  createdOfficer!: User;
}