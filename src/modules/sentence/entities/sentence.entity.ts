import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("sentence")
export class Sentence {
  @PrimaryColumn({ name: "sentence_id", type: "varchar" })
  sentenceId!: string;

  @Column({ name: "case_id", type: "varchar" })
  caseId!: string;

  @Column({ name: "case_result_id", type: "varchar" })
  caseResultId!: string;

  @Column({ name: "sentence_type", type: "varchar" })
  sentenceType!: string;

  @Column({ type: "varchar", nullable: true })
  duration?: string;

  @Column({ type: "varchar", nullable: true })
  condition?: string;

  @Column({ name: "sentencing_date", type: "datetime" })
  sentencingDate!: Date;

  @Column({ name: "is_deleted", default: false })
  isDeleted!: boolean;
}