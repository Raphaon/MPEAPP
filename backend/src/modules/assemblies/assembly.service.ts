import { Repository } from 'typeorm';
import { dataSource } from '../../config/typeorm';
import { buildPagination, PaginationQuery, toPaginatedResponse } from '../../utils/pagination';
import { Assembly } from './assembly.entity';
import { AssemblyInput } from './assembly.dto';

class AssemblyService {
  private repository: Repository<Assembly> = dataSource.getRepository(Assembly);

  create(payload: AssemblyInput) {
    const assembly = this.repository.create(payload);
    return this.repository.save(assembly);
  }

  async update(id: string, payload: Partial<AssemblyInput>) {
    await this.repository.update({ id }, payload);
    return this.findById(id);
  }

  findById(id: string) {
    return this.repository.findOne({ where: { id }, relations: ['district', 'members'] });
  }

  async list(districtId: string | undefined, pagination: PaginationQuery) {
    const { skip, take, page, pageSize } = buildPagination(pagination);
    const [data, total] = await this.repository.findAndCount({
      where: districtId ? { districtId } : {},
      relations: ['district'],
      skip,
      take
    });
    return toPaginatedResponse(data, total, page, pageSize);
  }

  async remove(id: string) {
    await this.repository.delete({ id });
  }
}

export const assemblyService = new AssemblyService();
