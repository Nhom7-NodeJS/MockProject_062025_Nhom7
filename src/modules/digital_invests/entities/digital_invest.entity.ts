import { Entity, Column, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

import { Evidence } from "@/modules/evidences/entities/evidence.entity";

@Entity("digital_invests")
export class DigitalInvest {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  device_type!: string;

  @Column()
  analyst_tool!: string;

  @Column({ nullable: true })
  result?: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // OneToOne
  @OneToOne(() => Evidence, (evidence) => evidence.digitalInvest)
  @JoinColumn({ name: "evidence_id" })
  evidence!: Evidence;
}
