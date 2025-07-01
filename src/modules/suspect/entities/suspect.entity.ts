import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("suspect")
export class Suspect {
  @PrimaryGeneratedColumn()
  suspect_id!: number; 

  @Column()
  case_id!: number; 

  @Column()
  fullname!: string;

  @Column()
  national!: string;

  @Column()
  gender!: string;

  @Column()
  dob!: Date;

  @Column()
  identification!: string;

  @Column()
  phonenumber!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  address!: string;

  @Column()
  catch_time!: Date;

  @Column({ type: 'text', nullable: true })
  notes!: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  mugshot_url!: string;

  @Column()
  fingerprints_hash!: string;

  @Column()
  health_status!: string;
}
