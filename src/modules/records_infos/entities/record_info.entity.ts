import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Evidence } from "@/modules/evidences/entities/evidence.entity";

@Entity("records_infos")
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

  // ManyToOne
  @ManyToOne(() => Evidence, (evidence) => evidence.recordInfos)
  @JoinColumn({ name: "evidence_id" })
  evidence!: Evidence;
}
