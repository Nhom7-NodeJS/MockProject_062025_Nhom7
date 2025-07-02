import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";

@Entity('suspects_evidences')
export class SuspectEvidence {
  @PrimaryColumn()
  suspect_id!: string;

  @PrimaryColumn()
  evidence_id!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Suspect, (suspect) => suspect.suspectEvidences)
  @JoinColumn({ name: 'suspect_id' })
  suspect!: Suspect;

  @ManyToOne(() => Evidence, (evidence) => evidence.suspectEvidences)
  @JoinColumn({ name: 'evidence_id' })
  evidence!: Evidence;
}