import { Router } from 'express';
import { authenticate } from '../../middlewares/auth-guard';
import { auditLogService } from '../common/audit-log.service';
import { messageSchema } from './message.dto';
import { messageService } from './message.service';

export const messageRouter = Router();

messageRouter.use(authenticate);

messageRouter.get('/', async (req, res) => {
  const { page, pageSize } = req.query;
  const result = await messageService.list((req as any).user.sub, {
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined
  });
  res.json(result);
});

messageRouter.post('/', async (req, res) => {
  const payload = messageSchema.parse(req.body);
  const message = await messageService.create((req as any).user.sub, payload);
  await auditLogService.record('message.sent', (req as any).user.sub, {
    messageId: message.id,
    recipientId: message.recipientId,
    type: message.type
  });
  res.status(201).json(message);
});
