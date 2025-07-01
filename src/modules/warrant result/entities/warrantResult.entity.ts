import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'warrant_result' })
export class WarrantResult {
  @PrimaryGeneratedColumn()
  warrant_result_id!: string;

  @Column()
  warrant_id!: string;

  @Column()
  police_response!: string;

  @Column()
  location!: string;

  @Column()
  notes!: string;

  @Column({ type: 'datetime' })
  time_active!: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
}
