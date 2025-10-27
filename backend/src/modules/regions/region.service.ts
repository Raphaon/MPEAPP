import { Repository } from 'typeorm';
import { dataSource } from '../../config/typeorm';
import { buildPagination, PaginationQuery, toPaginatedResponse } from '../../utils/pagination';
import { Region } from './region.entity';
import { RegionInput } from './region.dto';

class RegionService {
  private repository: Repository<Region> = dataSource.getRepository(Region);

  async create(payload: RegionInput) {
    const region = this.repository.create(payload);
    return this.repository.save(region);
  }

  async update(id: string, payload: Partial<RegionInput>) {
    await this.repository.update({ id }, payload);
    return this.findById(id);
  }

  async findById(id: string) {
    return this.repository.findOne({ where: { id }, relations: ['districts'] });
  }

  async list(pagination: PaginationQuery) {
    const { skip, take, page, pageSize } = buildPagination(pagination);
    const [data, total] = await this.repository.findAndCount({
      skip,
      take,
      relations: ['districts']
    });
    return toPaginatedResponse(data, total, page, pageSize);
  }

  async remove(id: string) {
    await this.repository.delete({ id });
  }
}

export const regionService = new RegionService();
