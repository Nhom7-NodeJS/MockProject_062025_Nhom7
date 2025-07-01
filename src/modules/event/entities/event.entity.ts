import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'event' })
export class Event {
  @PrimaryColumn()
  event_id!: string;

  @Column()
  suspect_id!: string;

  @Column()
  case_id!: string;

  @Column({ type: 'datetime' })
  time_start!: Date;

  @Column({ type: 'datetime' })
  time_end: Date | undefined

  @Column()
  event_name!: string;

  @Column()
  description!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
}