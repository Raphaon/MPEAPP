import { dataSource } from '../../config/typeorm';
import { Assembly } from '../assemblies/assembly.entity';
import { District } from '../districts/district.entity';
import { Member } from '../members/member.entity';
import { Region } from '../regions/region.entity';

class StatisticsService {
  async membershipCounts() {
    const memberRepository = dataSource.getRepository(Member);

    const byGender = await memberRepository
      .createQueryBuilder('member')
      .select('member.gender', 'gender')
      .addSelect('COUNT(member.id)', 'count')
      .groupBy('member.gender')
      .getRawMany();

    const byStatus = await memberRepository
      .createQueryBuilder('member')
      .select('member.status', 'status')
      .addSelect('COUNT(member.id)', 'count')
      .groupBy('member.status')
      .getRawMany();

    return { byGender, byStatus };
  }

  async regionalSummary() {
    const regionRepository = dataSource.getRepository(Region);
    const results = await regionRepository
      .createQueryBuilder('region')
      .leftJoin(District, 'district', 'district.regionId = region.id')
      .leftJoin(Assembly, 'assembly', 'assembly.districtId = district.id')
      .leftJoin(Member, 'member', 'member.assemblyId = assembly.id')
      .select('region.id', 'regionId')
      .addSelect('region.name', 'regionName')
      .addSelect('COUNT(DISTINCT district.id)', 'districts')
      .addSelect('COUNT(DISTINCT assembly.id)', 'assemblies')
      .addSelect('COUNT(DISTINCT member.id)', 'members')
      .groupBy('region.id')
      .getRawMany();
    return results;
  }
}

export const statisticsService = new StatisticsService();
