import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Evidence } from '@/modules/evidences/entities/evidence.entity';

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

  @OneToMany(() => Evidence, (evidence) => evidence.measureSurvey)
  evidences?: Evidence[];
}
