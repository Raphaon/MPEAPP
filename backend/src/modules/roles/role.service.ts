import { Repository } from 'typeorm';
import { dataSource } from '../../config/typeorm';
import { Role } from './role.entity';
import { DEFAULT_ROLES } from './role.constants';

class RoleService {
  private repository: Repository<Role> = dataSource.getRepository(Role);

  async bootstrapDefaults() {
    for (const role of DEFAULT_ROLES) {
      const exists = await this.repository.findOne({ where: { code: role.code } });
      if (!exists) {
        await this.repository.save(this.repository.create(role));
      }
    }
  }

  findAll() {
    return this.repository.find();
  }
}

export const roleService = new RoleService();
