import { Repository } from 'typeorm';
import { dataSource } from '../../config/typeorm';
import { buildPagination, PaginationQuery, toPaginatedResponse } from '../../utils/pagination';
import { District } from './district.entity';
import { DistrictInput } from './district.dto';

class DistrictService {
  private repository: Repository<District> = dataSource.getRepository(District);

  create(payload: DistrictInput) {
    const district = this.repository.create(payload);
    return this.repository.save(district);
  }

  async update(id: string, payload: Partial<DistrictInput>) {
    await this.repository.update({ id }, payload);
    return this.findById(id);
  }

  findById(id: string) {
    return this.repository.findOne({ where: { id }, relations: ['assemblies', 'region'] });
  }

  async list(regionId: string | undefined, pagination: PaginationQuery) {
    const { skip, take, page, pageSize } = buildPagination(pagination);
    const [data, total] = await this.repository.findAndCount({
      where: regionId ? { regionId } : {},
      relations: ['region'],
      skip,
      take
    });
    return toPaginatedResponse(data, total, page, pageSize);
  }

  async remove(id: string) {
    await this.repository.delete({ id });
  }
}

export const districtService = new DistrictService();
