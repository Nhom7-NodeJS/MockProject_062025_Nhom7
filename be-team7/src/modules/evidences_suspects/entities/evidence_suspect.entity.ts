import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from "typeorm";

import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";

@Entity("evidences_suspects")
export class EvidenceSuspect {
  @PrimaryColumn()
  evidence_id!: string;

  @PrimaryColumn()
  suspect_id!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // ManyToOne
  @ManyToOne(() => Evidence, (evidence) => evidence.evidenceSuspects)
  @JoinColumn({ name: "evidence_id" })
  evidence!: Evidence;

  @ManyToOne(() => Suspect, (suspect) => suspect.evidenceSuspects)
  @JoinColumn({ name: "suspect_id" })
  suspect!: Suspect;
}
