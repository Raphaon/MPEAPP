import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Region } from '../regions/region.entity';
import { Assembly } from '../assemblies/assembly.entity';
import { Event } from '../events/event.entity';

@Entity('districts')
export class District extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  headquarters?: string;

  @Column({ type: 'jsonb', nullable: true })
  leadership?: { superintendent?: string; secretary?: string; treasurer?: string };

  @ManyToOne(() => Region, (region) => region.districts)
  region!: Region;

  @Column({ name: 'region_id' })
  regionId!: string;

  @OneToMany(() => Assembly, (assembly) => assembly.district)
  assemblies!: Assembly[];

  @OneToMany(() => Event, (event) => event.district)
  events!: Event[];
}
