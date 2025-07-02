import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Interview } from "@/modules/interview/entities/interview.entity";
import { User } from "@/modules/users/entities/user.entity";

@Entity("questions")
export class Question {
  @PrimaryColumn()
  question_id!: string;

  @Column()
  interview_id!: string;

  @Column()
  created_by!: string;

  @Column()
  content!: string;

  @Column({ nullable: true })
  answer?: string;

  @Column({ nullable: true })
  reliability?: number;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Interview, (interview) => interview.questions)
  @JoinColumn({ name: 'interview_id' })
  interview!: Interview;

  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({ name: 'created_by' })
  createdBy!: User;
}