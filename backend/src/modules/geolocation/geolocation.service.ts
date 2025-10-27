import { dataSource } from '../../config/typeorm';
import { Assembly } from '../assemblies/assembly.entity';

class GeolocationService {
  async listAssemblies() {
    const assemblies = await dataSource.getRepository(Assembly).find();
    return assemblies
      .filter((assembly) => assembly.location)
      .map((assembly) => ({
        id: assembly.id,
        name: assembly.name,
        location: assembly.location
      }));
  }

  async detectDeadZones() {
    const assemblies = await dataSource.getRepository(Assembly).find();
    return assemblies.filter((assembly) => !assembly.location).map((assembly) => ({
      id: assembly.id,
      name: assembly.name
    }));
  }
}

export const geolocationService = new GeolocationService();
