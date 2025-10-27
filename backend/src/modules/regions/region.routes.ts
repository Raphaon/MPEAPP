import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth-guard';
import { auditLogService } from '../common/audit-log.service';
import { regionSchema } from './region.dto';
import { regionService } from './region.service';

export const regionRouter = Router();

regionRouter.use(authenticate);

regionRouter.get('/', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL']), async (req, res) => {
  const { page, pageSize } = req.query;
  const regions = await regionService.list({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined
  });
  res.json(regions);
});

regionRouter.post('/', authorize(['ADMIN_NATIONAL']), async (req, res) => {
  const payload = regionSchema.parse(req.body);
  const region = await regionService.create(payload);
  await auditLogService.record('region.created', (req as any).user?.sub, { regionId: region.id });
  res.status(201).json(region);
});

regionRouter.get('/:id', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL']), async (req, res) => {
  const region = await regionService.findById(req.params.id);
  res.json(region);
});

regionRouter.put('/:id', authorize(['ADMIN_NATIONAL']), async (req, res) => {
  const payload = regionSchema.partial().parse(req.body);
  const region = await regionService.update(req.params.id, payload);
  await auditLogService.record('region.updated', (req as any).user?.sub, {
    regionId: req.params.id
  });
  res.json(region);
});

regionRouter.delete('/:id', authorize(['ADMIN_NATIONAL']), async (req, res) => {
  await regionService.remove(req.params.id);
  await auditLogService.record('region.deleted', (req as any).user?.sub, {
    regionId: req.params.id
  });
  res.status(204).send();
});
