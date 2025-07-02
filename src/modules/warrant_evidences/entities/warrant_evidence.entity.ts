import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Warrant } from "@/modules/warrant/entities/warrant.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";

@Entity('warrant_evidences')
export class WarrantEvidence {
  @PrimaryColumn()
  warrant_id!: string;

  @PrimaryColumn()
  evidence_id!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Warrant, (warrant) => warrant.warrantEvidences)
  @JoinColumn({ name: 'warrant_id' })
  warrant!: Warrant;

  @ManyToOne(() => Evidence, (evidence) => evidence.warrantEvidences)
  @JoinColumn({ name: 'evidence_id' })
  evidence!: Evidence;
}