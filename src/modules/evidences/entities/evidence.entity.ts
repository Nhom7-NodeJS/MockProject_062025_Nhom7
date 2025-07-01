import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("evidences")
export class Evidence {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  measure_survey_id!: string;

  @Column()
  warrant_result_id!: string;

  @Column()
  report_id!: string;

  @Column()
  collected_by!: string;

  @Column()
  description!: string;

  @Column()
  collect_at!: Date;

  @Column()
  current_location!: string;

  @Column()
  attach_file!: string;

  @Column()
  status!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
