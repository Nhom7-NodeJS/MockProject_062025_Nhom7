import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('arrest')
export class arrest {
  @PrimaryColumn({ name: 'suspect_id' })
  suspectId!: string;

  @PrimaryColumn({ name: 'case_id' })
  caseId!: string;

  @Column({ name: 'officer_id' })
  officerId!: string;

  @Column({ name: 'suspect_miranda_signature', nullable: true })
  suspectMirandaSignature?: string;

  @Column({ name: 'arrest_start_time', type: 'datetime' })
  arrestStartTime!: Date;

  @Column({ name: 'arrest_end_time', type: 'datetime', nullable: true })
  arrestEndTime?: Date;

  @Column({ name: 'is_deleted', default: false })
  isDeleted!: boolean;
}
