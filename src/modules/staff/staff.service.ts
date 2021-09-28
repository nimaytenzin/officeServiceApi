import { Injectable, Inject } from '@nestjs/common';
import { Staff } from './staff.entity';
import { STAFF_REPOSITORY,  } from '../../core/constants';
import { Department } from '../departments/department.entity';
import { Division } from '../divisions/division.entity';
import { Section } from '../sections/section.entity';
import { StaffDto } from './dto/staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @Inject(STAFF_REPOSITORY) private readonly staffRepository: typeof Staff,
  ) {}

  async create(user: StaffDto): Promise<Staff> {
    return await this.staffRepository.create<Staff>(user);
  }

  async findAll(): Promise<Staff[]> {
    return this.staffRepository.findAll<Staff>({
      include: [Department, Division, Section],
    });
  }

  async findOneByEmail(email: string): Promise<Staff> {
    return await this.staffRepository.findOne<Staff>({ where: { email } });
  }

  async findOneById(id: number): Promise<Staff> {
    return await this.staffRepository.findOne<Staff>({ where: { id } });
  }

  async update(id, data) {
    const [numRows, num] = await this.staffRepository.update(
      { ...data },
      {
        where: { id },
        returning: true,
      },
    );
    return { numRows, num };
  }

  async delete(id) {
    return await this.staffRepository.destroy({
      where: { id },
    });
  }
}