import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth-guard';
import { statisticsService } from './statistics.service';

export const statisticsRouter = Router();

statisticsRouter.use(authenticate);

statisticsRouter.get('/membership', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR']), async (_req, res) => {
  const stats = await statisticsService.membershipCounts();
  res.json(stats);
});

statisticsRouter.get('/regional', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL']), async (_req, res) => {
  const stats = await statisticsService.regionalSummary();
  res.json(stats);
});
