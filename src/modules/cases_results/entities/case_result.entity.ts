import { Case } from "@/modules/cases/entities/case.entity";
import { Sentence } from "@/modules/sentences/entities/sentence.entity";
import { Timeline } from "@/modules/timelines/entities/timeline.entity";
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

@Entity("cases_results")
export class CaseResult {
  @PrimaryColumn()
  case_result_id!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  report_time!: Date;

  @Column()
  report_analyst!: string;

  @Column()
  summary!: string;

  @Column()
  identify_motive!: string;

  @Column()
  status!: string;

  @Column({ default: false, type: "boolean" })
  is_deleted!: boolean;

  @OneToMany(() => Timeline, (timeline) => timeline.caseResult)
  timelines!: Timeline[];

  @ManyToOne(() => Case, (case_) => case_.caseResults)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @OneToMany(() => Sentence, (sentence) => sentence.caseResult)
  sentences!: Sentence[];
}
