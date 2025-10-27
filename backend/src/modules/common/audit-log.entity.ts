import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('audit_logs')
export class AuditLog extends BaseEntity {
  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @Column({ name: 'action', length: 150 })
  action!: string;

  @Column({ name: 'context', type: 'jsonb', nullable: true })
  context?: Record<string, unknown>;

  @Column({ name: 'ip_address', length: 45, nullable: true })
  ipAddress?: string;
}
