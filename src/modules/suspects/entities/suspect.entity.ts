import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Case } from "@/modules/cases/entities/case.entity";
import { Arrest } from "@/modules/arrests/entities/arrest.entity";
import { ReportSuspect } from "@/modules/reports_suspects/entities/report_suspect.entity";
import { SuspectEvidence } from "@/modules/suspects_evidences/entities/suspect_evidence.entity";
import { ProsecutionSuspect } from "@/modules/prosecutions_suspects/entities/prosecution_suspect.entity";

@Entity("suspects")
export class Suspect {
  @PrimaryColumn()
  suspect_id!: string; 

  @Column()
  case_id!: string;

  @Column()
  fullname!: string;

  @Column()
  national!: string;

  @Column()
  gender!: string;

  @Column({ type: 'timestamp' })
  dob!: Date;

  @Column({ nullable: true })
  identification?: string;

  @Column({ nullable: true })
  phonenumber?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ type: 'timestamp' })
  catch_time!: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  mugshot_url?: string;

  @Column({ nullable: true })
  fingerprints_hash?: string;

  @Column()
  health_status!: string;
  
  @ManyToOne(() => Case, (case_) => case_.suspects)
  @JoinColumn({ name: 'case_id' })
  case!: Case;

  @OneToMany(() => Arrest, (arrest) => arrest.suspect)
  arrests?: Arrest[];

  @OneToMany(() => ReportSuspect, (reportSuspect) => reportSuspect.suspect)
  reportSuspects?: ReportSuspect[];

  @OneToMany(() => SuspectEvidence, (suspectEvidence) => suspectEvidence.suspect)
  suspectEvidences?: SuspectEvidence[];

  @OneToMany(() => ProsecutionSuspect, (prosecutionSuspect) => prosecutionSuspect.suspect)
  prosecutionSuspects?: ProsecutionSuspect[];
}
