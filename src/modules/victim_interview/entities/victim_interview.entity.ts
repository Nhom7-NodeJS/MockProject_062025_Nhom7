import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('victim_interview')
export class VictimInterview {
  @PrimaryColumn()
  victim_id!: string;

  @PrimaryColumn()
  interview_id!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
}
