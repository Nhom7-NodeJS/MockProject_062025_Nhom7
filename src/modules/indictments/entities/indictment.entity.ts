import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("indictments")
export class Indictment {
  @PrimaryColumn()
  indictment_id!: string;

  @Column()
  prosecution_id!: string;

  @Column()
  content!: string;

  @Column()
  issued_at!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
