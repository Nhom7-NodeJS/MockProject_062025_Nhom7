import { Case } from "@/modules/case/entities/case.entity";
import { Suspect } from "@/modules/suspect/entities/suspect.entity";
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";

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

  @ManyToOne(() => Case, (case1) => case1.arrests)
  case!: Case;

  @ManyToOne(() => Suspect, (suspect) => suspect.arrests)
  suspect!: Suspect;
}
