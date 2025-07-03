import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("inmates")
export class Inmate {
  @PrimaryColumn()
  inmate_id!: string;

  @Column()
  fullname!: string;

  @Column()
  assigned_facility!: string;

  @Column({ type: 'timestamp' })
  start_date!: Date;

  @Column({ type: 'timestamp' })
  expected_release!: Date;

  @Column()
  health_status!: string;

  @Column()
  status!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean
}
