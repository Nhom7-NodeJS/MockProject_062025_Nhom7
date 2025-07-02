import { Case } from "@/modules/case/entities/case.entity";
import { WitnessesInterviews } from "@/modules/witnesses_interviews/entities/witnesses_interviews.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity("witness")
export class Witness {
  @PrimaryGeneratedColumn()
  witness_id!: string;

  @Column()
  fullname!: string;

  @Column()
  contact!: string;

  @Column({ type: "text" })
  statement!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (case1) => case1.witnesses)
  case!: Case;

  @OneToMany(
    () => WitnessesInterviews,
    (witnessesInterviews) => witnessesInterviews.witness
  )
  witnesses_interviews!: WitnessesInterviews[];
}
