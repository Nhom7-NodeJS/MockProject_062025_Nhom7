import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { CaseResult } from '@/modules/case_results/entities/case_result.entity';

@Entity('timelines')
export class Timeline {
  @PrimaryColumn()
  timeline_id!: string;

  @Column({ type: 'timestamp' })
  start_time!: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_time?: Date;

  @Column({ type: 'json', nullable: true })
  attached_file?: string[];

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true })
  activity?: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  // ManyToOne
  @ManyToOne(() => CaseResult, (caseResult) => caseResult.timelines)
  @JoinColumn({ name: 'case_result_id' })
  caseResult!: CaseResult;
}
