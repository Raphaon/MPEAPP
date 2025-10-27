import { Repository } from 'typeorm';
import { dataSource } from '../../config/typeorm';
import { AuditLog } from './audit-log.entity';

class AuditLogService {
  private repository: Repository<AuditLog> = dataSource.getRepository(AuditLog);

  async record(action: string, userId?: string, context?: Record<string, unknown>, ipAddress?: string) {
    const entry = this.repository.create({ action, userId, context, ipAddress });
    await this.repository.save(entry);
    return entry;
  }
}

export const auditLogService = new AuditLogService();
