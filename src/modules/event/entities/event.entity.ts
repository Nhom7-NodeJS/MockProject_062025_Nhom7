import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'event' })
export class Event {
  @PrimaryGeneratedColumn()
  event_id!: number;

  @Column()
  suspect_id!: number;

  @Column()
  case_id!: number;

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