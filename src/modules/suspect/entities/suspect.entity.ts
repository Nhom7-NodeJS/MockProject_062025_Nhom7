import { Arrest } from "@/modules/arrest/entities/arrest.entity";
import { Case } from "@/modules/case/entities/case.entity";
import { EvidencesSuspects } from "@/modules/evidences_suspects/entities/evidences_suspects.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { Entity, Column, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity("suspect")
export class Suspect {
  @PrimaryColumn()
  suspect_id!: string;

  @Column()
  fullname!: string;

  @Column()
  national!: string;

  @Column()
  gender!: string;

  @Column({ type: "timestamp" })
  dob!: Date;

  @Column()
  identification!: string;

  @Column()
  phone_number!: string;

  @Column({ type: "text" })
  description!: string;

  @Column()
  address!: string;

  @Column()
  catch_time!: Date;

  @Column({ type: "text", nullable: true })
  notes!: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  mugshot_url!: string;

  @Column()
  fingerprints_hash!: string;

  @Column()
  health_status!: string;

  @ManyToOne(() => Case, (case1) => case1.suspects)
  case!: Case;

  @OneToMany(() => Arrest, (arrest) => arrest.suspect)
  arrests!: Arrest[];

  @ManyToOne(() => Report, (report) => report.suspects)
  report!: Report;

  @OneToMany(
    () => EvidencesSuspects,
    (evidencesSuspects) => evidencesSuspects.suspect
  )
  evidences_suspects!: EvidencesSuspects[];
}
