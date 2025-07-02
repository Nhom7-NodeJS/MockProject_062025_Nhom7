import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Warrant } from '@/modules/warrant/entities/warrant.entity';
import { PhysicalInvest } from '@/modules/physical_invest/entities/physical_invest.entity';

@Entity('warrant_result')
export class WarrantResult {
  @PrimaryColumn()
  warrant_result_id!: string;

  @Column()
  warrant_id!: string;

  @Column()
  police_response!: string;

  @Column()
  location!: string;

  @Column()
  notes!: string;

  @Column({ type: 'timestamp' })
  time_active!: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
  
  @ManyToOne(() => Warrant, (warrant) => warrant.warrantResults)
  @JoinColumn({ name: 'warrant_id' })
  warrant!: Warrant;

  @OneToOne(() => PhysicalInvest, (physicalInvest) => physicalInvest.warrantResult)
  physicalInvest?: PhysicalInvest;
}
