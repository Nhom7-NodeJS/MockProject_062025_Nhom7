import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";

@Entity("arrests")
export class Arrest {
  @PrimaryColumn()
  case_id!: string;

  @PrimaryColumn()
  suspect_id!: string;

  @Column({ nullable: true })
  suspect_miranda_signature?: string;

  @Column({ type: "timestamp" })
  arrest_start_time!: Date;

  @Column({ type: "timestamp", nullable: true })
  arrest_end_time?: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.arrests)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => Suspect, (suspect) => suspect.arrests)
  @JoinColumn({ name: "suspect_id" })
  suspect!: Suspect;
}
