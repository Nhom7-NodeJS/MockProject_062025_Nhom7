import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { ReportWitness } from "@/modules/reports_witnesses/entities/report_witness.entity";
import { WitnessInterview } from "@/modules/witnesses_interviews/entities/witness_interview.entity";
import { Gender } from "@/modules/users/enums/user.enum";

@Entity("witnesses")
export class Witness {
  @PrimaryColumn()
  witness_id!: string;

  @Column({ nullable: true })
  fullname?: string;

  @Column({ nullable: true })
  contact?: string;

  @Column({ nullable: true })
  national?: string;

  @Column({ type: "enum", enum: Gender, default: Gender.UNKNOWN })
  gender!: Gender;

  @Column({ nullable: true })
  statement?: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // OneToMany
  @OneToMany(
    () => WitnessInterview,
    (witnessInterview) => witnessInterview.witness
  )
  witnessInterviews!: WitnessInterview[];

  @OneToMany(
    () => ReportWitness,
    (reportWitness) => reportWitness.witness
  )
  reportWitnesses!: ReportWitness[];

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.witnesses)
  @JoinColumn({ name: "case_id" })
  case!: Case;
}
