import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Case } from '@/modules/cases/entities/case.entity';
import { Timeline } from '@/modules/timeline/entities/timeline.entity';
import { Sentence } from '@/modules/sentences/entities/sentence.entity';

@Entity('case_result')
export class CaseResult {
  @PrimaryColumn()
  case_result_id!: string;

  @Column()
  case_id!: string;

  @Column({ type: 'timestamp'})
  report_time!: Date;

  @Column({ nullable: true })
  report_analyst?: string;

  @Column({ nullable: true })
  summary?: string;

  @Column()
  identify_motive!: string;

  @Column()
  status!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (case_) => case_.caseResults)
  @JoinColumn({ name: 'case_id' })
  case!: Case;

  @OneToMany(() => Timeline, (timeline) => timeline.caseResult)
  timelines?: Timeline[];

  @OneToMany(() => Sentence, (sentence) => sentence.caseResult)
  sentences?: Sentence[];
}
