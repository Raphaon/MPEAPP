import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth-guard';
import { auditLogService } from '../common/audit-log.service';
import { districtSchema } from './district.dto';
import { districtService } from './district.service';

export const districtRouter = Router();

districtRouter.use(authenticate);

districtRouter.get('/', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL']), async (req, res) => {
  const { regionId, page, pageSize } = req.query;
  const result = await districtService.list(
    typeof regionId === 'string' ? regionId : undefined,
    {
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined
    }
  );
  res.json(result);
});

districtRouter.post('/', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL']), async (req, res) => {
  const payload = districtSchema.parse(req.body);
  const district = await districtService.create(payload);
  await auditLogService.record('district.created', (req as any).user?.sub, {
    districtId: district.id
  });
  res.status(201).json(district);
});

districtRouter.get('/:id', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT']), async (req, res) => {
  const district = await districtService.findById(req.params.id);
  res.json(district);
});

districtRouter.put('/:id', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL']), async (req, res) => {
  const payload = districtSchema.partial().parse(req.body);
  const district = await districtService.update(req.params.id, payload);
  await auditLogService.record('district.updated', (req as any).user?.sub, {
    districtId: req.params.id
  });
  res.json(district);
});

districtRouter.delete('/:id', authorize(['ADMIN_NATIONAL']), async (req, res) => {
  await districtService.remove(req.params.id);
  await auditLogService.record('district.deleted', (req as any).user?.sub, {
    districtId: req.params.id
  });
  res.status(204).send();
});
