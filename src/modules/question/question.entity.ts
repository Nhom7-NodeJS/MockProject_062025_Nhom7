import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("question")
export class Question {
  @PrimaryColumn({ name: "question_id", type: "varchar" })
  questionId!: string;        // PK

  @Column({ name: "interview_id", type: "varchar" })
  interviewId!: string;       // FK

  @Column({ name: "created_by", type: "varchar" })
  createdBy!: string;         // FK

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "text", nullable: true })
  answer?: string;

  @Column({ type: "float", nullable: true })
  reliability?: number;      

  @Column({ name: "is_deleted", default: false })
  isDeleted!: boolean;
}