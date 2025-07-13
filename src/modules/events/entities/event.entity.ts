import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryColumn()
  event_id!: string;

  @Column()
  suspect_id!: string;

  @Column()
  case_id!: string;

  @Column({ type: 'timestamp' })
  time_start!: Date;

  @Column({ type: 'timestamp', nullable: true })
  time_end?: Date;

  @Column()
  event_name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
}