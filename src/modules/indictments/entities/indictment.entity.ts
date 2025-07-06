import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";

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

  // ManyToOne
  @ManyToOne(() => Prosecution, (prosecution) => prosecution.indictments)
  @JoinColumn({ name: "prosecution_id" })
  prosecution!: Prosecution;
}
