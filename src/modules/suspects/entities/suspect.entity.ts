import { Arrest } from "@/modules/arrests/entities/arrest.entity";
import { EvidencesSuspects } from "@/modules/evidences_suspects/entities/evidences_suspects.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";

@Entity("suspects")
export class Suspect {
  @PrimaryColumn()
  suspect_id!: string;

  @Column({ nullable: true })
  fullname?: string;

  @Column({ nullable: true })
  national?: string;

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

  @Column({ type: "timestamp" })
  catch_time!: Date;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  mugshot_url?: string;

  @Column()
  fingerprints_hash!: string;

  @Column()
  health_status!: string;

  @OneToMany(() => Arrest, (arrest) => arrest.suspect)
  arrests!: Arrest[];

  @ManyToOne(() => Report, (report) => report.suspects)
  @JoinColumn({ name: "report_id" })
  report!: Report;

  @OneToMany(
    () => EvidencesSuspects,
    (evidencesSuspects) => evidencesSuspects.suspect
  )
  evidences_suspects!: EvidencesSuspects[];
}
