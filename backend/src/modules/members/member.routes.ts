import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth-guard';
import { auditLogService } from '../common/audit-log.service';
import { memberSchema } from './member.dto';
import { memberService } from './member.service';

export const memberRouter = Router();

memberRouter.use(authenticate);

memberRouter.get('/', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR', 'LEADER_MINISTERE']), async (req, res) => {
  const { regionId, districtId, assemblyId, page, pageSize } = req.query;
  const members = await memberService.list(
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
  res.json(members);
});

memberRouter.post('/', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR']), async (req, res) => {
  const payload = memberSchema.parse(req.body);
  const member = await memberService.create(payload);
  await auditLogService.record('member.created', (req as any).user?.sub, {
    memberId: member.id
  });
  res.status(201).json(member);
});

memberRouter.get('/:id', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR']), async (req, res) => {
  const member = await memberService.findById(req.params.id);
  res.json(member);
});

memberRouter.put('/:id', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR']), async (req, res) => {
  const payload = memberSchema.partial().parse(req.body);
  const member = await memberService.update(req.params.id, payload);
  await auditLogService.record('member.updated', (req as any).user?.sub, {
    memberId: req.params.id
  });
  res.json(member);
});

memberRouter.post('/:id/transfer', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT']), async (req, res) => {
  const { targetAssemblyId } = req.body as { targetAssemblyId: string };
  const member = await memberService.transfer(req.params.id, targetAssemblyId);
  await auditLogService.record('member.transferred', (req as any).user?.sub, {
    memberId: req.params.id,
    targetAssemblyId
  });
  res.json(member);
});

memberRouter.delete('/:id', authorize(['ADMIN_NATIONAL']), async (req, res) => {
  await memberService.remove(req.params.id);
  await auditLogService.record('member.deleted', (req as any).user?.sub, {
    memberId: req.params.id
  });
  res.status(204).send();
});
