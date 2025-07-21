import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Interview } from "@/modules/interviews/entities/interview.entity";
import { Witness } from "@/modules/witnesses/entities/witness.entity";

@Entity("witnesses_interviews")
export class WitnessInterview {
  @PrimaryColumn()
  interview_id!: string;

  @PrimaryColumn()
  witness_id!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // ManyToOne
  @ManyToOne(() => Witness, (witness) => witness.witnessInterviews)
  @JoinColumn({ name: "witness_id" })
  witness!: Witness;

  @ManyToOne(() => Interview, (interview) => interview.witnessInterviews)
  @JoinColumn({ name: "interview_id" })
  interview!: Interview;
}
