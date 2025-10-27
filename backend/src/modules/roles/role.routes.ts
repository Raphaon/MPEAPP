import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth-guard';
import { roleService } from './role.service';

export const roleRouter = Router();

roleRouter.use(authenticate);

roleRouter.get('/', authorize(['ADMIN_NATIONAL']), async (_req, res) => {
  const roles = await roleService.findAll();
  res.json(roles);
});
