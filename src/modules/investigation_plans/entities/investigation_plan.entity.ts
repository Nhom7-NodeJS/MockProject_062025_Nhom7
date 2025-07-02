import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from "typeorm";
import { Case } from "@/modules/cases/entities/case.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Interview } from "@/modules/interview/entities/interview.entity";

@Entity("investigation_plans")
export class InvestigationPlan {
  @PrimaryColumn()
  investigation_plan_id!: string;

  @Column()
  created_officer_id!: string;

  @Column()
  case_id!: string;

  @Column({ type: "timestamp" })
  deadline_date!: Date;

  @Column({ nullable: true })
  result?: string;

  @Column({ nullable: true })
  status?: string;

  @CreateDateColumn()
  create_at!: Date;

  @Column({ type: "text" })
  plan_content!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (case_) => case_.investigationPlans)
  @JoinColumn({ name: 'case_id' })
  case!: Case;

  @ManyToOne(() => User, (user) => user.investigationPlans)
  @JoinColumn({ name: 'created_officer_id' })
  createdBy!: User;

  @OneToMany(() => Interview, (interview) => interview.investigationPlan)
  interviews?: Interview[];
}