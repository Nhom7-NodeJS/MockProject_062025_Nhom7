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

  @Column({ type: "enum", enum: Gender })
  gender!: Gender;

  @Column({ type: "timestamp" })
  dob!: Date;

  @Column()
  identification!: string;

  @Column()
  phone_number!: string;

  @Column()
  description!: string;

  @Column()
  address!: string;

  @Column({ type: "timestamp" })
  catch_time!: Date;

  @Column({ nullable: true })
  notes?: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  mugshot_url?: string;

  @Column()
  fingerprints_hash!: string;

  @Column()
  health_status!: string;

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
