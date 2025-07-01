import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("investigation_plan")
export class InvestigationPlan {
  @PrimaryGeneratedColumn()
  investigation_plan_id!: number;

  @Column()
  created_officer_id!: number;

  @Column()
  case_id!: number;

  @Column()
  deadline_date!: Date;

  @Column({ nullable: true })
  result!: string;

  @Column()
  status!: string;

  @Column()
  create_at!: Date;

  @Column()
  plan_content!: string;

  @Column({ default: false })
  is_deleted!: boolean;
}
