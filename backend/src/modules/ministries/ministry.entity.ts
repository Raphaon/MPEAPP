import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Member } from '../members/member.entity';

@Entity('ministries')
export class Ministry extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ name: 'leader_name', nullable: true })
  leaderName?: string;

  @OneToMany(() => Member, (member) => member.ministry)
  members!: Member[];
}
