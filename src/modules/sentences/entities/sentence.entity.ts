import { CaseResult } from "@/modules/cases_results/entities/case_result.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("sentences")
export class Sentence {
  @PrimaryColumn({ type: "varchar" })
  sentence_id!: string;

  @Column({ type: "varchar" })
  sentence_type!: string;

  @Column({ type: "varchar", nullable: true })
  duration?: string;

  @Column({ type: "varchar", nullable: true })
  condition?: string;

  @Column({ type: "timestamp" })
  sentencing_date!: Date;

  @Column({ default: false })
  is_deleted!: boolean;

  @ManyToOne(() => CaseResult, (caseResult) => caseResult.sentences)
  @JoinColumn({ name: "case_result_id" })
  case_result!: CaseResult;
}
