import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth-guard';
import { geolocationService } from './geolocation.service';

export const geolocationRouter = Router();

geolocationRouter.use(authenticate);

geolocationRouter.get(
  '/assemblies',
  authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL', 'CHEF_DISTRICT', 'PASTEUR']),
  async (_req, res) => {
    const assemblies = await geolocationService.listAssemblies();
    res.json(assemblies);
  }
);

geolocationRouter.get('/dead-zones', authorize(['ADMIN_NATIONAL', 'SUPERVISEUR_REGIONAL']), async (_req, res) => {
  const zones = await geolocationService.detectDeadZones();
  res.json(zones);
});
