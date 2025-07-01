import {Entity, PrimaryColumn, Column} from "typeorm"
@Entity("physical_invest")
export class Physical_invest {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  image_url!: string;

  @Column({ type: 'boolean', default: false })
   is_deleted!: boolean
}
