import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Evidence } from '@/modules/evidences/entities/evidence.entity';

@Entity('digital_inverts')
export class DigitalInvert {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  device_type!: string;

  @Column()
  analyst_tool!: string;

  @Column({ nullable: true })
  result?: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @OneToOne(() => Evidence, (evidence) => evidence.digitalInvert)
  @JoinColumn({ name: 'evidence_id' })
  evidence!: Evidence;
}
