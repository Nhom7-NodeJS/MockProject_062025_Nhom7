import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('measure_surveys')
export class MeasureSurvey {
  @PrimaryColumn()
  measure_survey_id!: string;

  @Column()
  type_name!: string;

  @Column({ nullable: true })
  source?: string;

  @Column({ nullable: true })
  result?: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
}
