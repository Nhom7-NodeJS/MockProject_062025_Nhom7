import { Case } from "@/modules/case/entities/case.entity";
import { CaseResult } from "@/modules/case_result/entities/case_result.entity";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

@Entity("sentence")
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

  @ManyToOne(() => Case, (case1) => case1.sentences)
  case!: Case;

  @ManyToOne(() => CaseResult, (caseResult) => caseResult.sentences)
  case_result!: CaseResult;
}
