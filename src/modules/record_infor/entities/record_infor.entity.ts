import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

@Entity("record_info")
export class RecordInfo {
  @PrimaryColumn()
  record_info_id!: string;

  @Column()
  type_name!: string;

  @Column()
  source!: string;

  @Column({ type: "timestamp" })
  date_collected!: Date;

  @Column()
  summary!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Evidence, (evidence) => evidence.record_infos)
  evidence!: Evidence;
}
