import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'warrant' })
export class Warrant {
  @PrimaryColumn()
  warrant_id!: string;

  @Column()
  case_id!: string;

  @Column()
  warrant_name!: string;

  @Column()
  attached_file!: string;

  @Column({ type: 'datetime' })
  time_pulish!: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
}
