import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { District } from '../districts/district.entity';
import { Event } from '../events/event.entity';

@Entity('regions')
export class Region extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  headquarters?: string;

  @Column({ type: 'jsonb', nullable: true })
  executiveOffice?: { president: string; secretary?: string; treasurer?: string };

  @OneToMany(() => District, (district) => district.region)
  districts!: District[];

  @OneToMany(() => Event, (event) => event.region)
  events!: Event[];
}
