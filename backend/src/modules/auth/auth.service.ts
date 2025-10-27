import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { dataSource } from '../../config/typeorm';
import { auditLogService } from '../common/audit-log.service';
import { RegisterInput } from './auth.dto';
import { User } from './user.entity';

class AuthService {
  private repository: Repository<User> = dataSource.getRepository(User);

  async register(payload: RegisterInput) {
    const existing = await this.repository.findOne({ where: { email: payload.email } });
    if (existing) {
      throw new Error('Email already registered');
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    const user = this.repository.create({
      email: payload.email,
      passwordHash,
      roleId: payload.roleId,
      assemblyId: payload.assemblyId,
      active: false
    });

    const saved = await this.repository.save(user);
    await auditLogService.record('user.registered', saved.id, { pendingActivation: true });
    return saved;
  }

  async activate(userId: string) {
    await this.repository.update({ id: userId }, { active: true });
    const user = await this.repository.findOne({ where: { id: userId } });
    await auditLogService.record('user.activated', userId);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.repository.findOne({ where: { email }, relations: ['role'] });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    if (!user.active) {
      throw new Error('Compte inactif. En attente de validation.');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role.code
      },
      process.env.JWT_SECRET || 'super-secret',
      { expiresIn: '12h' }
    );

    await auditLogService.record('user.logged_in', user.id);

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role.code
      }
    };
  }
}

export const authService = new AuthService();
