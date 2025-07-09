import { AppDataSource } from "@/config/config-database";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { WarrantStatus } from "@/modules/financial_invests/enums/financial_invest.enum";
import { CreateWarrantDto } from "@/modules/warrants/dto/warrant.create.dto";
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
          status: WarrantStatus.COMPLETED,
        },
      });

    } catch (err) {
    console.error(err);
    throw err; 
    }
  },
 createNewWarrant: async ( warrantData: CreateWarrantDto) => {
  try {
    // Tạo đối tượng warrant từ dữ liệu đầu vào
    const newWarrant = warrantRepository.create({
      warrant_id: warrantData.warrant_id,
      warrant_name: warrantData.warrant_name,
      police_response: warrantData.police_response,
      attached_file: warrantData.attached_file ?? [],
      time_publish: new Date(warrantData.time_publish),
      is_deleted: warrantData.is_deleted ?? false,
      deadline: new Date(warrantData.deadline),
      status: warrantData.status ?? WarrantStatus.WAITING_EXECUTING,
      case: { case_id: warrantData.case_id },
    });

    return await warrantRepository.save(newWarrant);
  } catch (err) {
    console.error("Error creating new warrant:", err);
    throw err;
  }
}

};

export default WarrantService;