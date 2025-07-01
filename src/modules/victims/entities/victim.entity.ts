import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("victims")
export class Victim {
  @PrimaryColumn()
  victim_id!: string;

  @Column()
  case_id!: string;

  @Column()
  fullname!: string;

  @Column()
  contact!: string;

  @Column()
  injuries!: string;

  @Column()
  status!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
