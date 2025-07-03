import { Interview } from "@/modules/interviews/entities/interview.entity";
import { Witness } from "@/modules/witnesses/entities/witness.entity";
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from "typeorm";

@Entity("witnesses_interviews")
export class WitnessesInterviews {
  @PrimaryColumn()
  interview_id!: string;

  @PrimaryColumn()
  witness_id!: string;

  @ManyToOne(() => Witness, (witness) => witness.witnesses_interviews)
  @JoinColumn({ name: "witness_id" })
  witness!: Witness;

  @ManyToOne(() => Interview, (interview) => interview.witnesses_interviews)
  @JoinColumn({ name: "interview_id" })
  interview!: Interview;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
