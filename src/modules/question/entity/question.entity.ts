import { Interview } from "@/modules/interview/entities/interview.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

@Entity("question")
export class Question {
  @PrimaryColumn({ name: "question_id", type: "varchar" })
  questionId!: string; // PK

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "text", nullable: true })
  answer?: string;

  @Column({ type: "float", nullable: true })
  reliability?: number;

  @Column({ name: "is_deleted", default: false })
  isDeleted!: boolean;

  @ManyToOne(() => Interview, (interview) => interview.questions)
  interview!: Interview;

  @ManyToOne(() => User, (user) => user.questions)
  user!: User;
}
