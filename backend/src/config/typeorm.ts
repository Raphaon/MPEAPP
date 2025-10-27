import { DataSource } from 'typeorm';
import { Region } from '../modules/regions/region.entity';
import { District } from '../modules/districts/district.entity';
import { Assembly } from '../modules/assemblies/assembly.entity';
import { Member } from '../modules/members/member.entity';
import { Ministry } from '../modules/ministries/ministry.entity';
import { User } from '../modules/auth/user.entity';
import { Event } from '../modules/events/event.entity';
import { Message } from '../modules/communications/message.entity';
import { Role } from '../modules/roles/role.entity';
import { AuditLog } from '../modules/common/audit-log.entity';

export const dataSource = new DataSource({
  type: (process.env.DB_TYPE as 'postgres') || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || 'brethren',
  password: process.env.DB_PASSWORD || 'brethren',
  database: process.env.DB_NAME || 'brethren',
  synchronize: false,
  logging: false,
  entities: [Region, District, Assembly, Member, Ministry, User, Event, Message, Role, AuditLog],
  migrations: ['dist/migrations/*.js']
});
