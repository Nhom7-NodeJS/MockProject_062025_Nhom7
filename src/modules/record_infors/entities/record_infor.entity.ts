import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";

@Entity("record_infors")
export class RecordInfor {
  @PrimaryColumn()
  record_info_id!: string;

  @Column()
  evidence_id!: string;

  @Column()
  type_name!: string;

  @Column()
  source!: string;

  @Column({ type: 'timestamp' })
  date_collected!: Date;

  @Column()
  summary!: string;
  
  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Evidence, (evidence) => evidence.recordInfors)
  @JoinColumn({ name: 'evidence_id' })
  evidence!: Evidence;
}
