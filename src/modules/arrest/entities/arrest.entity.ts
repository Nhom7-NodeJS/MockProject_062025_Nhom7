import { Case } from "@/modules/case/entities/case.entity";
import { Suspect } from "@/modules/suspect/entities/suspect.entity";
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity("arrest")
export class Arrest {
  @PrimaryColumn()
  arrest_id!: string;

  @Column({ nullable: true })
  suspect_miranda_signature?: string;

  @Column({ type: "timestamp" })
  arrest_start_time!: Date;

  @Column({ type: "timestamp", nullable: true })
  arrest_end_time?: Date;

  @Column({ default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (case_) => case_.arrests)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => Suspect, (suspect) => suspect.arrests)
  @JoinColumn({ name: "suspect_id" })
  suspect!: Suspect;
}
