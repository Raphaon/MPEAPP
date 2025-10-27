import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth-guard';
import { auditLogService } from '../common/audit-log.service';
import { eventSchema } from './event.dto';
import { eventService } from './event.service';

export const eventRouter = Router();

eventRouter.use(authenticate);

eventRouter.get('/', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR', 'LEADER_MINISTERE']), async (req, res) => {
  const { regionId, districtId, assemblyId, page, pageSize } = req.query;
  const events = await eventService.list(
    {
      regionId: typeof regionId === 'string' ? regionId : undefined,
      districtId: typeof districtId === 'string' ? districtId : undefined,
      assemblyId: typeof assemblyId === 'string' ? assemblyId : undefined
    },
    {
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined
    }
  );
  res.json(events);
});

eventRouter.post('/', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR']), async (req, res) => {
  const payload = eventSchema.parse(req.body);
  const event = await eventService.create(payload);
  await auditLogService.record('event.created', (req as any).user?.sub, { eventId: event.id });
  res.status(201).json(event);
});

eventRouter.put('/:id', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR']), async (req, res) => {
  const payload = eventSchema.partial().parse(req.body);
  const event = await eventService.update(req.params.id, payload);
  await auditLogService.record('event.updated', (req as any).user?.sub, { eventId: req.params.id });
  res.json(event);
});

eventRouter.delete('/:id', authorize(['ADMIN_NATIONAL']), async (req, res) => {
  await eventService.remove(req.params.id);
  await auditLogService.record('event.deleted', (req as any).user?.sub, { eventId: req.params.id });
  res.status(204).send();
});
