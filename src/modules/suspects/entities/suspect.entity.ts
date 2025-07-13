import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { Arrest } from "@/modules/arrests/entities/arrest.entity";
import { EvidenceSuspect } from "@/modules/evidences_suspects/entities/evidence_suspect.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { Gender } from "@/modules/users/enums/user.enum";

@Entity("suspects")
export class Suspect {
  @PrimaryColumn()
  suspect_id!: string;

  @Column({ nullable: true })
  fullname?: string;

  @Column({ nullable: true })
  national?: string;

  @Column({ type: "enum", enum: Gender, default: Gender.UNKNOWN })
  gender!: Gender;

  @Column({ type: "timestamp", nullable: true })
  dob?: Date;

  @Column({ nullable: true })
  identification?: string;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ type: "timestamp", nullable: true } )
  catch_time?: Date;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  mugshot_url?: string;

  @Column({ nullable: true })
  fingerprints_hash?: string;

  @Column({ nullable: true })
  health_status?: string;

  // OneToMany
  @OneToMany(() => Arrest, (arrest) => arrest.suspect)
  arrests!: Arrest[];

  @OneToMany(
    () => EvidenceSuspect,
    (evidenceSuspect) => evidenceSuspect.suspect
  )
  evidenceSuspects!: EvidenceSuspect[];

  // ManyToOne
  @ManyToOne(() => Report, (report) => report.suspects)
  @JoinColumn({ name: "report_id" })
  report!: Report;
}
