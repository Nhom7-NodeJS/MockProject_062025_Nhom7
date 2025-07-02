import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { WarrantResult } from '@/modules/warrant_result/entities/warrant_result.entity';
import { Case } from '@/modules/cases/entities/case.entity';
import { WarrantEvidence } from '@/modules/warrant_evidences/entities/warrant_evidence.entity';

@Entity('warrant')
export class Warrant {
  @PrimaryColumn()
  warrant_id!: string;

  @Column()
  case_id!: string;

  @Column()
  warrant_name!: string;

  @Column()
  attached_file!: string;

  @Column({ type: 'timestamp' })
  time_pulish!: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @OneToMany(() => WarrantResult, (warrantResult) => warrantResult.warrant)
  warrantResults?: WarrantResult[];

  @ManyToOne(() => Case, (caseEntity) => caseEntity.warrants)
  @JoinColumn({ name: 'case_id' })
  case!: Case;

  @OneToMany(() => WarrantEvidence, (warrantEvidence) => warrantEvidence.warrant)
  warrantEvidences?: WarrantEvidence[];
}
