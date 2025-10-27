import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Assembly } from '../assemblies/assembly.entity';
import { Ministry } from '../ministries/ministry.entity';

@Entity('members')
export class Member extends BaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true })
  gender?: 'M' | 'F';

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({ nullable: true })
  function?: string;

  @Column({ nullable: true })
  status?: 'active' | 'inactive' | 'visitor';

  @ManyToOne(() => Assembly, (assembly) => assembly.members)
  assembly!: Assembly;

  @Column({ name: 'assembly_id' })
  assemblyId!: string;

  @ManyToOne(() => Ministry, (ministry) => ministry.members, { nullable: true })
  ministry?: Ministry;

  @Column({ name: 'ministry_id', nullable: true })
  ministryId?: string;
}
