import { Interview } from "@/modules/interview/entities/interview.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("question")
export class Question {
  @PrimaryColumn({ type: "varchar" })
  question_id!: string; // PK

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "text", nullable: true })
  answer?: string;

  @Column({ type: "float", nullable: true })
  reliability?: number;

  @Column({ name: "is_deleted", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Interview, (interview) => interview.questions)
  @JoinColumn({ name: "interview_id" })
  interview!: Interview;

  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
