import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("question")
export class Question {
  @PrimaryGeneratedColumn()
  question_id!: number;

  @Column()
  interview_id!: number;

  @Column()
  created_by!: number;

  @Column()
  content!: string;

  @Column({ nullable: true })
  answer!: string;

  @Column("float", { nullable: true })
  reliability!: number;

  @Column({ default: false })
  is_deleted!: boolean;
}
