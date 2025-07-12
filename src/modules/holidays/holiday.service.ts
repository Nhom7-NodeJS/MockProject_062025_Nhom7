import { Repository } from "typeorm";
import { AppDataSource } from "@/config/database.config";
import { Holiday } from "./entities/holiday.entity";
import { CreateHolidayDto } from "./dto/holiday.create.dto";

export class HolidayService {
  private holidayRepository: Repository<Holiday>;

  constructor() {
    this.holidayRepository = AppDataSource.getRepository(Holiday);
  }

  async createHoliday(holidayData: CreateHolidayDto): Promise<Holiday> {
    try {
      const newHoliday = this.holidayRepository.create({
        holiday_name: holidayData.holiday_name,
        type_of_holiday: holidayData.type_of_holiday,
        date_of_holiday: new Date(holidayData.date_of_holiday),
        note: holidayData.note ?? undefined,
        is_deleted: false,
      });

      return await this.holidayRepository.save(newHoliday);
    } catch (err) {
      console.error("Error creating holiday:", err);
      throw err;
    }
  }
  async getAllHolidays(): Promise<Holiday[]> {
    try {
      return await this.holidayRepository.find({
        where: { is_deleted: false },
        order: { date_of_holiday: "DESC" },
      });
    } catch (err) {
      console.error("Error fetching holidays:", err);
      throw err;
    }
  }
}
export default new HolidayService();
