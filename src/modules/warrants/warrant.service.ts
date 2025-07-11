<<<<<<< HEAD
import { AppDataSource } from "@/config/database.config";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { WarrantStatus } from "@/modules/financial_invests/enums/financial_invest.enum";
import { CreateWarrantDto } from "@/modules/warrants/dto/warrant.create.dto";
import { get } from "http";
const warrantRepository = AppDataSource.getRepository(Warrant);

export const WarrantService = {
  getAllWarrants: async () => {
    try {
      return await warrantRepository.find();
=======
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
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
    } catch (err) {
      console.error(err);
      throw err; // <-- để controller bắt được lỗi
    }
<<<<<<< HEAD
  },
  getExecutingWarrants: async () => {
    try {
      return await warrantRepository.find({
=======
  }

  async getExecutingWarrants(): Promise<Warrant[]> {
    try {
      return await this.warrantRepository.find({
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
        where: {
          status: WarrantStatus.EXECUTING,
        },
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
<<<<<<< HEAD
  },
  getCompletedWarrants: async () => {
    try {
      return await warrantRepository.find({
=======
  }

  async getCompletedWarrants(): Promise<Warrant[]> {
    try {
      return await this.warrantRepository.find({
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
        where: {
          status: WarrantStatus.COMPLETED,
        },
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
<<<<<<< HEAD
  },
  createNewWarrant: async (warrantData: CreateWarrantDto) => {
    try {
      const newWarrant = warrantRepository.create({
=======
  }

  async createNewWarrant(warrantData: CreateWarrantDto) {
    try {
      const newWarrant = this.warrantRepository.create({
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
        warrant_name: warrantData.warrant_name,
        police_response: warrantData.police_response,
        attached_file: warrantData.attached_file ?? [],
        time_publish: new Date(warrantData.time_publish),
        is_deleted: warrantData.is_deleted ?? false,
        status: warrantData.status ?? WarrantStatus.WAITING_EXECUTING,
        case: { case_id: warrantData.case_id },
      });

<<<<<<< HEAD
      return await warrantRepository.save(newWarrant);
=======
      return await this.warrantRepository.save(newWarrant);
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
    } catch (err) {
      console.error("Error creating new warrant:", err);
      throw err;
    }
<<<<<<< HEAD
  },
  searchWarrantByName: async (Name: string) => {
    try {
      return await warrantRepository.find({
        where: {
          warrant_name: Name,
=======
  }

  async searchWarrantByName(name: string) {
    try {
      return await this.warrantRepository.find({
        where: {
          warrant_name: name,
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
        },
      });
    } catch (err) {
      console.error("Error searching warrant by name:", err);
      throw err;
    }
<<<<<<< HEAD
  },
  getWarrantById: async (warrantId: string) => {
    try {
      const warrant = await warrantRepository.findOne({
=======
  }

  async getWarrantById(warrantId: string) {
    try {
      const warrant = await this.warrantRepository.findOne({
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
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
<<<<<<< HEAD
  },
};

export default WarrantService;
=======
  }
}

export default new WarrantService;
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
