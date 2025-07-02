import { Prosecution } from "@/modules/prosecution/entities/prosecution.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("indictments")
export class Indictment {
  @PrimaryColumn()
  indictment_id!: string;

  @Column()
  content!: string;

  @Column({ type: "timestamp" })
  issued_at!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Prosecution, (prosecution) => prosecution.indictments)
  prosecution!: Prosecution;
}
