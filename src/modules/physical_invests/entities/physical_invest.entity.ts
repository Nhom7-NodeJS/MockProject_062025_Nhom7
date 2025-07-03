import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";

@Entity("physical_invests")
export class PhysicalInvest {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  image_url!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
  
  // OneToOne
  // @OneToOne(() => Evidence, (evidence) => evidence.physicalInvest)
  // @JoinColumn({ name: 'evidence_id' })
  // evidence!: Evidence;

  @OneToOne(() => Evidence)
  @JoinColumn({ name: "evidence_id" })
  evidence!: Evidence;
}
