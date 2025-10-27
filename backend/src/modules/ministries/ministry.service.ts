import { Repository } from 'typeorm';
import { dataSource } from '../../config/typeorm';
import { buildPagination, PaginationQuery, toPaginatedResponse } from '../../utils/pagination';
import { Ministry } from './ministry.entity';
import { MinistryInput } from './ministry.dto';

class MinistryService {
  private repository: Repository<Ministry> = dataSource.getRepository(Ministry);

  create(payload: MinistryInput) {
    const ministry = this.repository.create(payload);
    return this.repository.save(ministry);
  }

  async update(id: string, payload: Partial<MinistryInput>) {
    await this.repository.update({ id }, payload);
    return this.findById(id);
  }

  findById(id: string) {
    return this.repository.findOne({ where: { id }, relations: ['members'] });
  }

  async list(pagination: PaginationQuery) {
    const { skip, take, page, pageSize } = buildPagination(pagination);
    const [data, total] = await this.repository.findAndCount({ skip, take });
    return toPaginatedResponse(data, total, page, pageSize);
  }

  async remove(id: string) {
    await this.repository.delete({ id });
  }
}

export const ministryService = new MinistryService();
