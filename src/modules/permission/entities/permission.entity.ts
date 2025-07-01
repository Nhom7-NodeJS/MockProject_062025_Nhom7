import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("permission")
export class Permission {
  @PrimaryColumn({ name: "permission_id", type: "varchar" })
  permissionId!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ name: "is_deleted", default: false })
  isDeleted!: boolean;
}