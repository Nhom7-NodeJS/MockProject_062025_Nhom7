import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";

@Entity("forensics_invests")
export class ForensicInvest {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  lab_name!: string;

  @Column()
  report!: string;

  @Column({ type: "timestamp" })
  received_at!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @OneToOne(() => Evidence)
  @JoinColumn({ name: "evidence_id" })
  evidence!: Evidence;
}
