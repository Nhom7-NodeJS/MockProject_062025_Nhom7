import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";

@Entity("forensic_invest")
export class ForensicInvest {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  lab_name!: string;

  @Column()
  report!: string;

  @Column()
  result_summary!: string;

  @Column({ type: "timestamp" })
  received_at!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @OneToOne(() => Evidence, (evidence) => evidence.forensicInvest)
  @JoinColumn({ name: 'evidence_id' })
  evidence!: Evidence;
}
