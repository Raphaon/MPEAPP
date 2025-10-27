export const DEFAULT_ROLES = [
  {
    code: 'ADMIN_NATIONAL',
    name: 'Administrateur National',
    permissions: ['*']
  },
  {
    code: 'SUPERVISEUR_REGIONAL',
    name: 'Superviseur Régional',
    permissions: ['regions:read', 'districts:*', 'assemblies:*', 'members:*', 'announcements:publish']
  },
  {
    code: 'CHEF_DISTRICT',
    name: 'Chef de District',
    permissions: ['districts:*', 'assemblies:*', 'members:*', 'announcements:publish']
  },
  {
    code: 'PASTEUR',
    name: 'Pasteur',
    permissions: ['assemblies:*', 'members:*', 'announcements:publish']
  },
  {
    code: 'LEADER_MINISTERE',
    name: 'Leader de Ministère',
    permissions: ['ministries:*', 'members:read']
  },
  {
    code: 'MEMBRE',
    name: 'Membre',
    permissions: ['members:self', 'chat:access']
  }
] as const;
export type RoleCode = (typeof DEFAULT_ROLES)[number]['code'];
