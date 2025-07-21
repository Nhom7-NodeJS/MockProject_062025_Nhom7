import { Repository } from "typeorm";

import { AppDataSource } from "@/config/database.config";
import { WarrantStatus } from "@/modules/financial_invests/enums/financial_invest.enum";

import { Warrant } from "./entities/warrant.entity";
import { CreateWarrantDto } from "./dto/warrant.create.dto";
import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";

export class WarrantService {
  private warrantRepository: Repository<Warrant>;

  constructor() {
    this.warrantRepository = AppDataSource.getRepository(Warrant);
  }

  async getAllWarrants(status?: WarrantStatus): Promise<Warrant[]> {
    const query = this.warrantRepository
      .createQueryBuilder("warrant")
      .where("warrant.is_deleted = :isDeleted", { isDeleted: false })
      .orderBy("warrant.time_publish", "DESC");
    if (status) {
      query.andWhere("warrant.status = :status", { status });
    }
    return query.getMany();
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
    const warrant = await this.warrantRepository.find({
      where: {
        warrant_name: name,
      },
    });
    if (!warrant || warrant.length === 0) {
      throw new AppError(
        ErrorMessages.WARRANT_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.WARRANT_NOT_FOUND
      );
    }
    return warrant;
  }

  async getWarrantById(warrantId: string) {
    try {
      const warrant = await this.warrantRepository.findOne({
        where: {
          warrant_id: warrantId,
        },
      });

      if (!warrant) {
        throw new AppError(
          ErrorMessages.WARRANT_NOT_FOUND,
          HttpStatusCode.NOT_FOUND,
          ErrorCode.WARRANT_NOT_FOUND
        );
      }

      return warrant;
    } catch (err) {
      console.error("Error getting warrant by ID:", err);
      throw err;
    }
  }
}

export default new WarrantService();
