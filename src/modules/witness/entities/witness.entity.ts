import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Case } from "@/modules/cases/entities/case.entity";
import { WitnessInterview } from "@/modules/witness_interview/entities/witness_interview.entity"

@Entity("witness")
export class Witness {
  @PrimaryColumn()
  witness_id!: string;

  @Column()
  case_id!: string;

  @Column()
  fullname!: string;

  @Column()
  contact!: string;

  @Column({ type: 'text' })
  statement!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (case_) => case_.witnesses)
  @JoinColumn({ name: 'case_id' })
  case!: Case;

  @OneToMany(() => WitnessInterview, (witnessInterview) => witnessInterview.witness)
  witnessInterviews!: WitnessInterview[];
}
