import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";
import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";

@Entity('prosecutions_suspects')
export class ProsecutionSuspect {
  @PrimaryColumn()
  prosecution_id!: string;

  @PrimaryColumn()
  suspect_id!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Suspect, (suspect) => suspect.prosecutionSuspects)
  @JoinColumn({ name: 'suspect_id' })
  suspect!: Suspect;

  @ManyToOne(() => Prosecution, (prosecution) => prosecution.prosecutionSuspects)
  @JoinColumn({ name: 'prosecution_id' })
  prosecution!: Prosecution;
}