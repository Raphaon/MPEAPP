import { Repository } from 'typeorm';
import { dataSource } from '../../config/typeorm';
import { AuditLog } from './audit-log.entity';

class AuditLogService {
  private get repository(): Repository<AuditLog> {
    if (!dataSource.isInitialized) {
      throw new Error('Data source is not initialised yet');
    }
    return dataSource.getRepository(AuditLog);
  }

  async record(action: string, userId?: string, context?: Record<string, unknown>, ipAddress?: string) {
    const entry = this.repository.create({ action, userId, context, ipAddress });
    await this.repository.save(entry);
    return entry;
  }
}

export const auditLogService = new AuditLogService();
