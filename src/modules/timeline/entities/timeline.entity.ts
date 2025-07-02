import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CaseResult } from '@/modules/case_result/entities/case_result.entity';

@Entity('timelines')
export class Timeline {
  @PrimaryColumn()
  timeline_id!: string;

  @Column()
  case_result_id!: string;

  @CreateDateColumn()
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

  @ManyToOne(() => CaseResult, (caseResult) => caseResult.timelines)
  @JoinColumn({ name: 'case_result_id' })
  caseResult!: CaseResult;
}
