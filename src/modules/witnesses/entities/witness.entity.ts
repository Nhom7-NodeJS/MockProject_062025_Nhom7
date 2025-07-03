import { Case } from "@/modules/cases/entities/case.entity";
import { ReportsWitnesses } from "@/modules/reports_witnesses/entities/reports_witnesses.entity";
import { WitnessesInterviews } from "@/modules/witnesses_interviews/entities/witnesses_interviews.entity";
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";

@Entity("witnesses")
export class Witness {
  @PrimaryColumn()
  witness_id!: string;

  @Column()
  fullname!: string;

  @Column()
  contact!: string;

  @Column({ nullable: true })
  national?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ type: "text" })
  statement!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (case_) => case_.witnesses)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @OneToMany(
    () => WitnessesInterviews,
    (witnessesInterviews) => witnessesInterviews.witness
  )
  witnesses_interviews!: WitnessesInterviews[];

  @OneToMany(
    () => ReportsWitnesses,
    (reportsWitnesses) => reportsWitnesses.witness
  )
  reports_witnesses!: ReportsWitnesses[];
}
