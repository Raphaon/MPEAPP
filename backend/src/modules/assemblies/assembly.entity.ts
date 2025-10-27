import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { District } from '../districts/district.entity';
import { Member } from '../members/member.entity';
import { Event } from '../events/event.entity';

@Entity('assemblies')
export class Assembly extends BaseEntity {
  @Column()
  name!: string;

  @Column({ name: 'meeting_place', nullable: true })
  meetingPlace?: string;

  @Column({ name: 'pastor_name', nullable: true })
  pastorName?: string;

  @Column({ type: 'jsonb', nullable: true })
  preachingPoints?: { name: string; schedule?: string }[];

  @Column({ type: 'jsonb', nullable: true })
  location?: { lat: number; lng: number; address?: string };

  @ManyToOne(() => District, (district) => district.assemblies)
  district!: District;

  @Column({ name: 'district_id' })
  districtId!: string;

  @OneToMany(() => Member, (member) => member.assembly)
  members!: Member[];

  @OneToMany(() => Event, (event) => event.assembly)
  events!: Event[];
}
