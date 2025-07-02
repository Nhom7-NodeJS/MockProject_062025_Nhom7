import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
@Entity("physical_invest")
export class PhysicalInvest {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  image_url!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @OneToOne(() => Evidence)
  @JoinColumn({ name: "evidence_id" })
  evidence!: Evidence;
}
