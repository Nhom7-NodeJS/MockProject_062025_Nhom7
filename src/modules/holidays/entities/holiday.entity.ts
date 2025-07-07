import { TypeOfHoliday } from "@/modules/holidays/enums/holiday.enum";
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("holidays")
export class Holiday {
  @PrimaryColumn()
  holiday_id!: string;

  @Column()
  holiday_name!: string;

  @Column({ type: "enum", enum: TypeOfHoliday })
  type_of_holiday!: TypeOfHoliday;

  @Column({ type: "timestamp" })
  date_of_holiday!: Date;

  @Column({ nullable: true })
  note?: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
