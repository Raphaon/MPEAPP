import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth-guard';
import { auditLogService } from '../common/audit-log.service';
import { assemblySchema } from './assembly.dto';
import { assemblyService } from './assembly.service';

export const assemblyRouter = Router();

assemblyRouter.use(authenticate);

assemblyRouter.get('/', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR']), async (req, res) => {
  const { districtId, page, pageSize } = req.query;
  const assemblies = await assemblyService.list(
    typeof districtId === 'string' ? districtId : undefined,
    {
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined
    }
  );
  res.json(assemblies);
});

assemblyRouter.post('/', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT']), async (req, res) => {
  const payload = assemblySchema.parse(req.body);
  const assembly = await assemblyService.create(payload);
  await auditLogService.record('assembly.created', (req as any).user?.sub, {
    assemblyId: assembly.id
  });
  res.status(201).json(assembly);
});

assemblyRouter.get('/:id', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR']), async (req, res) => {
  const assembly = await assemblyService.findById(req.params.id);
  res.json(assembly);
});

assemblyRouter.put('/:id', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT']), async (req, res) => {
  const payload = assemblySchema.partial().parse(req.body);
  const assembly = await assemblyService.update(req.params.id, payload);
  await auditLogService.record('assembly.updated', (req as any).user?.sub, {
    assemblyId: req.params.id
  });
  res.json(assembly);
});

assemblyRouter.delete('/:id', authorize(['ADMIN_NATIONAL']), async (req, res) => {
  await assemblyService.remove(req.params.id);
  await auditLogService.record('assembly.deleted', (req as any).user?.sub, {
    assemblyId: req.params.id
  });
  res.status(204).send();
});
