import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Witness } from "@/modules/witness/entities/witness.entity";
import { Interview } from "@/modules/interview/entities/interview.entity";

@Entity('witness_interview')
export class WitnessInterview {
  @PrimaryColumn()
  witness_id!: string;

  @PrimaryColumn()
  interview_id!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Witness, (witness) => witness.witnessInterviews)
  @JoinColumn({ name: 'witness_id' })
  witness!: Witness;

  @ManyToOne(() => Interview, (interview) => interview.witnessInterviews)
  @JoinColumn({ name: 'interview_id' })
  interview!: Interview;
}