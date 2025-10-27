import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Assembly } from '../assemblies/assembly.entity';
import { Role } from '../roles/role.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column({ name: 'password_hash' })
  passwordHash!: string;

  @Column({ default: false })
  active!: boolean;

  @ManyToOne(() => Assembly, { nullable: true })
  assembly?: Assembly;

  @Column({ name: 'assembly_id', nullable: true })
  assemblyId?: string;

  @ManyToOne(() => Role, (role) => role.users)
  role!: Role;

  @Column({ name: 'role_id' })
  roleId!: string;
}
