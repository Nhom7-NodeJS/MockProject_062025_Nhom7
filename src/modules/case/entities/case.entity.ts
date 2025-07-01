import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("case")
export class Case {
  @PrimaryGeneratedColumn()
  case_id!: number;

  @Column()
  case_number!: number;

  @Column()
  type_case!: string;

  @Column()
  severity!: string;

  @Column()
  status!: string;

  @Column()
  summary!: string;

  @Column()
  create_at!: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
}
