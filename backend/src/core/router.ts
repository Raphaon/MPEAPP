import { Router } from 'express';
import { regionRouter } from '../modules/regions/region.routes';
import { districtRouter } from '../modules/districts/district.routes';
import { assemblyRouter } from '../modules/assemblies/assembly.routes';
import { memberRouter } from '../modules/members/member.routes';
import { ministryRouter } from '../modules/ministries/ministry.routes';
import { authRouter } from '../modules/auth/auth.routes';
import { eventRouter } from '../modules/events/event.routes';
import { messageRouter } from '../modules/communications/message.routes';
import { statisticsRouter } from '../modules/statistics/statistics.routes';
import { geolocationRouter } from '../modules/geolocation/geolocation.routes';
import { roleRouter } from '../modules/roles/role.routes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/regions', regionRouter);
apiRouter.use('/districts', districtRouter);
apiRouter.use('/assemblies', assemblyRouter);
apiRouter.use('/members', memberRouter);
apiRouter.use('/ministries', ministryRouter);
apiRouter.use('/events', eventRouter);
apiRouter.use('/messages', messageRouter);
apiRouter.use('/statistics', statisticsRouter);
apiRouter.use('/geolocation', geolocationRouter);
apiRouter.use('/roles', roleRouter);
