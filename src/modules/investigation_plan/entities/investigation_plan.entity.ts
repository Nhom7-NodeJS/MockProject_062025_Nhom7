import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("investigation_plan")
export class InvestigationPlan {
  @PrimaryColumn({ name: "investigation_plan_id", type: "varchar" })
  investigationPlanId!: string;   // PK

  @Column({ name: "created_officer_id", type: "varchar" })
  createdOfficerId!: string;       // FK

  @Column({ name: "case_id", type: "varchar" })
  caseId!: string;                 // FK

  @Column({ name: "deadline_date", type: "date" })
  deadlineDate!: Date;

  @Column({ type: "text", nullable: true })
  result?: string;

  @Column({ type: "varchar", nullable: true })
  status?: string;

  @Column({ name: "create_at", type: "timestamp" })
  createAt!: Date;

  @Column({ name: "plan_content", type: "text" })
  planContent!: string;

  @Column({ name: "is_deleted", default: false })
  isDeleted!: boolean;
}