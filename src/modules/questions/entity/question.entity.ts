import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Interview } from "@/modules/interviews/entities/interview.entity";
import { User } from "@/modules/users/entities/user.entity";

@Entity("questions")
export class Question {
  @PrimaryColumn()
  question_id!: string;

  @Column()
  content!: string;

  @Column({ nullable: true })
  answer?: string;

  @Column({ nullable: true })
  reliability?: number;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // ManyToOne
  @ManyToOne(() => Interview, (interview) => interview.questions)
  @JoinColumn({ name: "interview_id" })
  interview!: Interview;

  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
