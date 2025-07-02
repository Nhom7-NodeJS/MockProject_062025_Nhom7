import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Case } from '@/modules/cases/entities/case.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Indictment } from '@/modules/indictments/entities/indictment.entity';
import { ProsecutionSuspect } from '@/modules/prosecutions_suspects/entities/prosecution_suspect.entity';

@Entity({ name: 'prosecution' })
export class Prosecution {
  @PrimaryColumn()
  prosecution_id!: string;

  @Column()
  case_id!: string;

  @Column()
  prosecutor_id!: string;

  @Column()
  decision!: string;

  @Column({ type: 'datetime' })
  decision_date!: Date;

  @Column()
  reason!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (caseEntity) => caseEntity.prosecutions)
  @JoinColumn({ name: 'case_id' })
  case!: Case;

  @ManyToOne(() => User, (user) => user.prosecutions)
  @JoinColumn({ name: 'prosecutor_id' })
  prosecutor!: User;

  @OneToMany(() => Indictment, (indictment) => indictment.prosecution)
  indictments?: Indictment[];

  @OneToMany(() => ProsecutionSuspect, (prosecutionSuspect) => prosecutionSuspect.prosecution)
  prosecutionSuspects?: ProsecutionSuspect[];
}
