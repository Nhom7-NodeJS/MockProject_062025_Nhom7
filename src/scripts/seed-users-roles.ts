<<<<<<< HEAD
=======
import * as bcrypt from 'bcryptjs';

>>>>>>> origin/dev3
import { AppDataSource } from "@/config/database.config";
import { User } from "@/modules/users/entities/user.entity";
import { Role } from "@/modules/roles/entities/role.entity";
import { Gender, UserStatus } from "@/modules/users/enums/user.enum";

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function seedUsersAndRoles() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    const roleRepository = AppDataSource.getRepository(Role);
    const userRepository = AppDataSource.getRepository(User);

    // Clear existing data
    await userRepository.createQueryBuilder().delete().where('1 = 1').execute();
    await roleRepository.createQueryBuilder().delete().where('1 = 1').execute();
    console.log('Cleared existing users and roles data');

    // Create roles
    const censorRole = roleRepository.create({
      role_id: 'CENSOR',
      description: 'Censor',
      is_deleted: false
    });

    const investigatorRole = roleRepository.create({
      role_id: 'INVESTIGATOR',
      description: 'Investigator',
      is_deleted: false
    });

    const policeChiefRole = roleRepository.create({
      role_id: 'POLICE_CHIEF',
      description: 'Police Chief',
      is_deleted: false
    });

    const forensicOfficerRole = roleRepository.create({
      role_id: 'FORENSIC_OFFICER',
      description: 'Forensic Officer',
      is_deleted: false
    });

    const financialInvestigatorRole = roleRepository.create({
      role_id: 'FINANCIAL_INVESTIGATOR',
      description: 'Financial Investigator',
      is_deleted: false
    });

    const savedRoles = await roleRepository.save([censorRole, investigatorRole, policeChiefRole, forensicOfficerRole, financialInvestigatorRole]);
    console.log('Created roles:', savedRoles.map(r => r.role_id).join(', '));

    // Create users
    const hashedPassword = await hashPassword('Password123!');
    
    const sheriffUser = userRepository.create({
      username: 'sheriff.john',
      password_hash: hashedPassword,
      email: "Gx0kW@example.com",
      fullname: 'John Smith',
      gender: Gender.MALE,
      dob: new Date('1980-05-15'),
      date_attended: new Date('2005-07-10'),
      status: UserStatus.ACTIVE,
      create_at: new Date(),
      is_deleted: false,
      role: savedRoles[2] // Police Chief role
    });

    const officer1 = userRepository.create({
      username: 'officer.jane',
      password_hash: hashedPassword,
      email: "tWcM4@example.com",
      fullname: 'Jane Doe',
      gender: Gender.FEMALE,
      dob: new Date('1990-08-22'),
      date_attended: new Date('2018-03-15'),
      status: UserStatus.ACTIVE,
      create_at: new Date(),
      is_deleted: false,
      role: savedRoles[1] // Investigator role
    });

    const officer2 = userRepository.create({
      username: 'officer.mike',
      password_hash: hashedPassword,
      fullname: 'Mike Johnson',
      gender: Gender.MALE,
      dob: new Date('1988-11-05'),
      date_attended: new Date('2016-09-20'),
      status: UserStatus.ACTIVE,
      create_at: new Date(),
      is_deleted: false,
      role: savedRoles[1] // Investigator role
    });

    const savedUsers = await userRepository.save([sheriffUser, officer1, officer2]);
    console.log('Created users:', savedUsers.map(u => u.username).join(', '));
    
    console.log('Successfully seeded users and roles!');
  } catch (error) {
    console.error('Error seeding users and roles:', error);
  } finally {
    await AppDataSource.destroy();
    process.exit(0);
  }
}

seedUsersAndRoles();
