import { Repository } from "typeorm";

import { AppDataSource } from "@/config/database.config";
import { WarrantStatus } from "@/modules/financial_invests/enums/financial_invest.enum";

import { Warrant } from "./entities/warrant.entity";
import { CreateWarrantDto } from "./dto/warrant.create.dto";

export class WarrantService {
  private warrantRepository: Repository<Warrant>;

  constructor() {
    this.warrantRepository = AppDataSource.getRepository(Warrant);
  }

  async getAllWarrants(): Promise<Warrant[]> {
    try {
      return await this.warrantRepository.find();
    } catch (err) {
      console.error(err);
      throw err; // <-- để controller bắt được lỗi
    }
  }

  async getExecutingWarrants(): Promise<Warrant[]> {
    try {
      return await this.warrantRepository.find({
        where: {
          status: WarrantStatus.EXECUTING,
        },
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getCompletedWarrants(): Promise<Warrant[]> {
    try {
      return await this.warrantRepository.find({
        where: {
          status: WarrantStatus.COMPLETED,
        },
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createNewWarrant(warrantData: CreateWarrantDto) {
    try {
      const newWarrant = this.warrantRepository.create({
        warrant_name: warrantData.warrant_name,
        police_response: warrantData.police_response,
        attached_file: warrantData.attached_file ?? [],
        time_publish: new Date(warrantData.time_publish),
        is_deleted: warrantData.is_deleted ?? false,
        status: warrantData.status ?? WarrantStatus.WAITING_EXECUTING,
        case: { case_id: warrantData.case_id },
      });

      return await this.warrantRepository.save(newWarrant);
    } catch (err) {
      console.error("Error creating new warrant:", err);
      throw err;
    }
  }

  async searchWarrantByName(name: string) {
    try {
      return await this.warrantRepository.find({
        where: {
          warrant_name: name,
        },
      });
    } catch (err) {
      console.error("Error searching warrant by name:", err);
      throw err;
    }
  }

  async getWarrantById(warrantId: string) {
    try {
      const warrant = await this.warrantRepository.findOne({
        where: {
          warrant_id: warrantId,
        },
      });

      if (!warrant) {
        throw new Error("Warrant not found");
      }

      return warrant;
    } catch (err) {
      console.error("Error getting warrant by ID:", err);
      throw err;
    }
  }
}

export default new WarrantService;
