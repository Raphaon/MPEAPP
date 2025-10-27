import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { User } from '../auth/user.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  name!: string;

  @Column({ type: 'jsonb', nullable: true })
  permissions?: string[];

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
