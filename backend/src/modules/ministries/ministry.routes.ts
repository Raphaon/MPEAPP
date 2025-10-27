import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth-guard';
import { auditLogService } from '../common/audit-log.service';
import { ministrySchema } from './ministry.dto';
import { ministryService } from './ministry.service';

export const ministryRouter = Router();

ministryRouter.use(authenticate);

ministryRouter.get('/', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR', 'LEADER_MINISTERE']), async (req, res) => {
  const { page, pageSize } = req.query;
  const ministries = await ministryService.list({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined
  });
  res.json(ministries);
});

ministryRouter.post('/', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR']), async (req, res) => {
  const payload = ministrySchema.parse(req.body);
  const ministry = await ministryService.create(payload);
  await auditLogService.record('ministry.created', (req as any).user?.sub, {
    ministryId: ministry.id
  });
  res.status(201).json(ministry);
});

ministryRouter.put('/:id', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR']), async (req, res) => {
  const payload = ministrySchema.partial().parse(req.body);
  const ministry = await ministryService.update(req.params.id, payload);
  await auditLogService.record('ministry.updated', (req as any).user?.sub, {
    ministryId: req.params.id
  });
  res.json(ministry);
});

ministryRouter.delete('/:id', authorize(['ADMIN_NATIONAL']), async (req, res) => {
  await ministryService.remove(req.params.id);
  await auditLogService.record('ministry.deleted', (req as any).user?.sub, {
    ministryId: req.params.id
  });
  res.status(204).send();
});
