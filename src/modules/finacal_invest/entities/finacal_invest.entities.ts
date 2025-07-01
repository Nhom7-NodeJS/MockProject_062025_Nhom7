import {Entity, PrimaryColumn, Column} from "typeorm"
@Entity("finacal_invest")
export class Physical_invest {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  summary!: string;
  
  @Column({ type: 'boolean', default: false })
   is_deleted!: boolean
}
