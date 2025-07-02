import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Suspect } from "@/modules/suspect/entities/suspect.entity";
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from "typeorm";

@Entity("evidences_suspects")
export class EvidencesSuspects {
  @PrimaryColumn()
  evidence_id!: string;

  @PrimaryColumn()
  suspect_id!: string;

  @ManyToOne(() => Evidence, (evidence) => evidence.evidences_suspects)
  @JoinColumn({ name: "evidence_id" })
  evidence!: Evidence;

  @ManyToOne(() => Suspect, (suspect) => suspect.evidences_suspects)
  @JoinColumn({ name: "suspect_id" })
  suspect!: Suspect;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
