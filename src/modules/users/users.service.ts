import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { CreateUserDto} from './dto/CreateUserDto'
import { USER_REPOSITORY } from '../../core/constants';
import { Department } from '../departments/department.entity';
import { Division } from '../divisions/division.entity';
import { Section } from '../sections/section.entity';

@Injectable()
export class UsersService {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(user: CreateUserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async findAll(): Promise<User[]>{
        return this.userRepository.findAll<User>({
            include:[Department, Division, Section]
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { email } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }

    
}