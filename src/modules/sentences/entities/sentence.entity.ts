import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Case } from "@/modules/cases/entities/case.entity";
import { CaseResult } from "@/modules/case_result/entities/case_result.entity";

@Entity("sentences")
export class Sentence {
  @PrimaryColumn()
  sentence_id!: string;

  @Column()
  case_id!: string;

  @Column()
  case_result_id!: string;

  @Column()
  sentence_type!: string;

  @Column({ nullable: true })
  duration?: string;

  @Column({ nullable: true })
  condition?: string;

  @Column({ type: 'timestamp' })
  sentencing_date!: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (caseEntity) => caseEntity.sentences)
  @JoinColumn({ name: 'case_id' })
  case!: Case;

  @ManyToOne(() => CaseResult, (caseResult) => caseResult.sentences)
  @JoinColumn({ name: 'case_result_id' })
  caseResult!: CaseResult;
}