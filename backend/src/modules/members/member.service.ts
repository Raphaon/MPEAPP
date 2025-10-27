import { Repository } from 'typeorm';
import { dataSource } from '../../config/typeorm';
import { buildPagination, PaginationQuery, toPaginatedResponse } from '../../utils/pagination';
import { Member } from './member.entity';
import { MemberInput } from './member.dto';

class MemberService {
  private get repository(): Repository<Member> {
    if (!dataSource.isInitialized) {
      throw new Error('Data source is not initialised yet');
    }
    return dataSource.getRepository(Member);
  }

  create(payload: MemberInput) {
    const member = this.repository.create(payload);
    return this.repository.save(member);
  }

  async update(id: string, payload: Partial<MemberInput>) {
    await this.repository.update({ id }, payload);
    return this.findById(id);
  }

  findById(id: string) {
    return this.repository.findOne({ where: { id }, relations: ['assembly', 'ministry'] });
  }

  async list(filters: { regionId?: string; districtId?: string; assemblyId?: string }, pagination: PaginationQuery) {
    const { skip, take, page, pageSize } = buildPagination(pagination);
    const query = this.repository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.assembly', 'assembly')
      .leftJoinAndSelect('assembly.district', 'district')
      .leftJoinAndSelect('district.region', 'region')
      .leftJoinAndSelect('member.ministry', 'ministry')
      .skip(skip)
      .take(take);

    if (filters.assemblyId) {
      query.andWhere('member.assemblyId = :assemblyId', { assemblyId: filters.assemblyId });
    }
    if (filters.districtId) {
      query.andWhere('district.id = :districtId', { districtId: filters.districtId });
    }
    if (filters.regionId) {
      query.andWhere('region.id = :regionId', { regionId: filters.regionId });
    }

    const [data, total] = await query.getManyAndCount();
    return toPaginatedResponse(data, total, page, pageSize);
  }

  async transfer(memberId: string, targetAssemblyId: string) {
    await this.repository.update({ id: memberId }, { assemblyId: targetAssemblyId });
    return this.findById(memberId);
  }

  async remove(id: string) {
    await this.repository.delete({ id });
  }
}

export const memberService = new MemberService();
