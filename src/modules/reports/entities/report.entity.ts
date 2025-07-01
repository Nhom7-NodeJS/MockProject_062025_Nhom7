import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity('reports')
export class Report {
  @PrimaryColumn()
  report_id!: string;

  @Column()
  case_id!: string

  @Column()
  type_report!: string

  @Column({ nullable: true })
  description?: string
  
  @Column()
  case_location!:string
  
  @Column()
  reported_at!:string
  
  @Column()
  reporter_location!: Date
  
  @Column()
  reporter_fullname!: string

  @Column()
  reporter_email!: string
  
  @Column({ nullable: true })
  reporter_phonenumber?: string

  @Column({ nullable: true })
  office_approve_id?: string

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean
}
