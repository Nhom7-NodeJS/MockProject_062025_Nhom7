import { Case } from "@/modules/case/entities/case.entity";
import { Interview } from "@/modules/interview/entities/interview.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity("investigation_plan")
export class InvestigationPlan {
  @PrimaryColumn({ type: "varchar" })
  investigation_plan_id!: string; // PK

  @Column({ type: "timestamp" })
  deadline_date!: Date;

  @Column({ type: "text", nullable: true })
  result?: string;

  @Column({ type: "varchar", nullable: true })
  status?: string;

  @Column({ type: "timestamp" })
  create_at!: Date;

  @Column({ type: "text" })
  plan_content!: string;

  @Column({ name: "is_deleted", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (case1) => case1.investigation_plans)
  case!: Case;

  @ManyToOne(() => User, (user) => user.investigation_plans)
  created_officer_id!: User;

  @OneToMany(() => Interview, (interview) => interview.investigationPlan)
  interviews!: Interview[];
}
