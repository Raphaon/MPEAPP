import { Repository } from 'typeorm';
import { dataSource } from '../../config/typeorm';
import { buildPagination, PaginationQuery, toPaginatedResponse } from '../../utils/pagination';
import { Event } from './event.entity';
import { EventInput } from './event.dto';

class EventService {
  private get repository(): Repository<Event> {
    if (!dataSource.isInitialized) {
      throw new Error('Data source is not initialised yet');
    }
    return dataSource.getRepository(Event);
  }

  async create(payload: EventInput) {
    const event = this.repository.create(payload);
    return this.repository.save(event);
  }

  async update(id: string, payload: Partial<EventInput>) {
    await this.repository.update({ id }, payload);
    return this.findById(id);
  }

  findById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async list(filters: { regionId?: string; districtId?: string; assemblyId?: string }, pagination: PaginationQuery) {
    const { skip, take, page, pageSize } = buildPagination(pagination);
    const query = this.repository.createQueryBuilder('event').skip(skip).take(take);

    if (filters.regionId) {
      query.andWhere('event.regionId = :regionId', { regionId: filters.regionId });
    }
    if (filters.districtId) {
      query.andWhere('event.districtId = :districtId', { districtId: filters.districtId });
    }
    if (filters.assemblyId) {
      query.andWhere('event.assemblyId = :assemblyId', { assemblyId: filters.assemblyId });
    }

    const [data, total] = await query.getManyAndCount();
    return toPaginatedResponse(data, total, page, pageSize);
  }

  async remove(id: string) {
    await this.repository.delete({ id });
  }
}

export const eventService = new EventService();
