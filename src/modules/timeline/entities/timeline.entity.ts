import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({ type: 'jsonb', nullable: true })
  attached_file?: Record<string, any>;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true })
  activity?: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
}
