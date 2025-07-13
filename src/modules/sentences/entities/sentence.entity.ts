import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { CaseResult } from "@/modules/case_results/entities/case_result.entity";

@Entity("sentences")
export class Sentence {
  @PrimaryColumn()
  sentence_id!: string;

  @Column()
  sentence_type!: string;

  @Column({ nullable: true })
  duration?: string;

  @Column({ nullable: true })
  condition?: string;

  @Column({ type: "timestamp" })
  sentencing_date!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // ManyToOne
  @ManyToOne(() => CaseResult, (caseResult) => caseResult.sentences)
  @JoinColumn({ name: "case_result_id" })
  caseResult!: CaseResult;
}
