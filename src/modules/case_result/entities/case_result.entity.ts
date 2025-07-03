import { Case } from "@/modules/case/entities/case.entity";
import { Sentence } from "@/modules/sentence/entities/sentence.entity";
import { Timeline } from "@/modules/timeline/entities/timeline.entity";
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

@Entity("case_result")
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

  @OneToMany(() => Timeline, (timeline) => timeline.case_result)
  timelines!: Timeline[];

  @ManyToOne(() => Case, (case_) => case_.case_results)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @OneToMany(() => Sentence, (sentence) => sentence.case_result)
  sentences!: Sentence[];
}
