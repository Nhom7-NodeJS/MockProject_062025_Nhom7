import {Entity, PrimaryColumn, Column} from "typeorm";


@Entity("inmate")
export class Inmate {
  @PrimaryColumn()
  inmate_id!: string;

  @Column()
  fullname!: string;

  @Column()
  assigned_facility!: string;

  @Column()
  start_date!: Date;

  @Column()
  expected_release!: Date;

  @Column()
  health_status!: string;

  @Column()
  status!: string;

  @Column({ type: 'boolean', default: false })
   is_deleted!: boolean
}
