import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'prosecution' })
export class Prosecution {
  @PrimaryColumn()
  prosecution_id!: string;

  @Column()
  case_id!: string;

  @Column()
  prosecutor_id!: string;

  @Column()
  decision!: string;

  @Column({ type: 'datetime' })
  decision_date!: Date;

  @Column()
  reason!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
}
