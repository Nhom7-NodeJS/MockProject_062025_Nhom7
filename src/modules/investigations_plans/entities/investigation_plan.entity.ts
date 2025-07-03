import { Case } from "@/modules/cases/entities/case.entity";
import { Interview } from "@/modules/interviews/entities/interview.entity";
import { User } from "@/modules/users/entities/user.entity";
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

@Entity("investigations_plans")
export class InvestigationPlan {
  @PrimaryColumn({ type: "varchar" })
  investigation_plan_id!: string; // PK

  @Column({ type: "timestamp" })
  deadline_date!: Date;

  @Column({ type: "text", nullable: true })
  result?: string;

  @Column({ type: "varchar", nullable: true })
  status?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  create_at!: Date;

  @Column({ type: "text" })
  plan_content!: string;

  @Column({ name: "is_deleted", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (case_) => case_.investigation_plans)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => User, (user) => user.investigation_plans)
  @JoinColumn({ name: "user_id" })
  created_officer_id!: User;

  @OneToMany(() => Interview, (interview) => interview.investigationPlan)
  interviews!: Interview[];
}
