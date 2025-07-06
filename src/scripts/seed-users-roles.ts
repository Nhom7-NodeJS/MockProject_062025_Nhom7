import { AppDataSource } from "@/config/config-database";
import { User } from "@/modules/users/entities/user.entity";
import { Role } from "@/modules/roles/entities/role.entity";
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

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
    const sheriffRole = roleRepository.create({
      role_id: 'SHERIFF',
      description: 'Sheriff - Head of the department',
      is_deleted: false
    });

    const officerRole = roleRepository.create({
      role_id: 'OFFICER',
      description: 'Officer - Regular law enforcement officer',
      is_deleted: false
    });

    const savedRoles = await roleRepository.save([sheriffRole, officerRole]);
    console.log('Created roles:', savedRoles.map(r => r.role_id).join(', '));

    // Create users
    const hashedPassword = await hashPassword('Password123!');
    
    const sheriffUser = userRepository.create({
      username: 'sheriff.john',
      password_hash: hashedPassword,
      fullname: 'John Smith',
      dob: new Date('1980-05-15'),
      date_attended: new Date('2005-07-10'),
      status: 'active',
      create_at: new Date(),
      is_deleted: false,
      role: savedRoles[0] // Sheriff role
    });

    const officer1 = userRepository.create({
      username: 'officer.jane',
      password_hash: hashedPassword,
      fullname: 'Jane Doe',
      dob: new Date('1990-08-22'),
      date_attended: new Date('2018-03-15'),
      status: 'active',
      create_at: new Date(),
      is_deleted: false,
      role: savedRoles[1] // Officer role
    });

    const officer2 = userRepository.create({
      username: 'officer.mike',
      password_hash: hashedPassword,
      fullname: 'Mike Johnson',
      dob: new Date('1988-11-05'),
      date_attended: new Date('2016-09-20'),
      status: 'active',
      create_at: new Date(),
      is_deleted: false,
      role: savedRoles[1] // Officer role
    });

    const savedUsers = await userRepository.save([sheriffUser, officer1, officer2]);
    console.log('Created users:', savedUsers.map(u => u.username).join(', '));
    
    console.log('Successfully seeded users and roles!');
  } catch (error) {
    console.error('Error seeding users and roles:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

seedUsersAndRoles();
