import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { WarrantResult } from "@/modules/warrant_result/entities/warrant_result.entity";

@Entity("physical_invest")
export class PhysicalInvest {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  image_url!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
  
  @OneToOne(() => Evidence, (evidence) => evidence.physicalInvest)
  @JoinColumn({ name: 'evidence_id' })
  evidence!: Evidence;

  @OneToOne(() => WarrantResult, (warrantResult) => warrantResult.physicalInvest)
  @JoinColumn({ name: 'warrant_result_id' })
  warrantResult?: WarrantResult;
}
