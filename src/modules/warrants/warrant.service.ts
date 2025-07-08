import { AppDataSource } from "@/config/config-database";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { WarrantStatus } from "@/modules/financial_invests/enums/financial_invest.enum";
const warrantRepository = AppDataSource.getRepository(Warrant);

export const WarrantService = {
    getAllWarrants: async () =>{
        try{
        return await warrantRepository.find();
         } catch (err) {
      console.error( err);
      throw err; // <-- để controller bắt được lỗi
    }
    },
    getExecutingWarrants: async () => {
    try {
    
      return await warrantRepository.find({
        where: {
          status: WarrantStatus.EXECUTING,
        },
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  getCompletedWarrants: async () => {
    try{

 return await warrantRepository.find({
        where: {
          status: WarrantStatus.EXECUTING,
        },
      });
    } catch (err) {
    console.error(err);
    throw err; 
    }
}
};

export default WarrantService;