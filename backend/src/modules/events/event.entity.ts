import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Region } from '../regions/region.entity';
import { District } from '../districts/district.entity';
import { Assembly } from '../assemblies/assembly.entity';

@Entity('events')
export class Event extends BaseEntity {
  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'timestamptz' })
  date!: Date;

  @Column({ nullable: true })
  type?: string;

  @ManyToOne(() => Region, (region) => region.events, { nullable: true })
  region?: Region;

  @Column({ name: 'region_id', nullable: true })
  regionId?: string;

  @ManyToOne(() => District, (district) => district.events, { nullable: true })
  district?: District;

  @Column({ name: 'district_id', nullable: true })
  districtId?: string;

  @ManyToOne(() => Assembly, (assembly) => assembly.events, { nullable: true })
  assembly?: Assembly;

  @Column({ name: 'assembly_id', nullable: true })
  assemblyId?: string;
}
