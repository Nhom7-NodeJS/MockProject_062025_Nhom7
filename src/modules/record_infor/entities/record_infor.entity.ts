import {Entity, PrimaryColumn, Column} from "typeorm"
@Entity("finacal_invest")
export class Physical_invest {
  @PrimaryColumn()
  record_info_id!: string;

  @Column()
  type_name!: string;

  @Column()
  source!: string;

  @Column()
  date_collected!: Date;

  @Column()
  summary!: string;
  
  @Column({ type: 'boolean', default: false })
   is_deleted!: boolean
}
