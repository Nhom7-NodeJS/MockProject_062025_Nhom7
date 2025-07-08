import { AppDataSource } from "@/config/config-database";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";

const warrantRepository = AppDataSource.getRepository(Warrant);

export const WarrantService = {
    getAllWarrants: async () =>{
        try{
        console.log("Run Service to get all warrants");
        return await warrantRepository.find();
         } catch (err) {
      console.error("❌ WarrantService error:", err);
      throw err; // <-- để controller bắt được lỗi
    }
    }
};

export default WarrantService;