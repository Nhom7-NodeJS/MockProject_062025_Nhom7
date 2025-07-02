import { Case } from "@/modules/case/entities/case.entity";
import { WitnessesInterviews } from "@/modules/witnesses_interviews/entities/witnesses_interviews.entity";
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";

@Entity("witness")
export class Witness {
  @PrimaryColumn()
  witness_id!: string;

  @Column()
  fullname!: string;

  @Column()
  contact!: string;

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
}
