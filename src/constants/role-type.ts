export enum RoleType {
  // System role
  ADMIN = 'ADMIN',

  // Application roles
  CENSOR = 'CENSOR',
  INVESTIGATOR = 'INVESTIGATOR',
  POLICE_CHIEF = 'POLICE_CHIEF',
  FORENSIC_OFFICER = 'FORENSIC_OFFICER',
  FINANCIAL_INVESTIGATOR = 'FINANCIAL_INVESTIGATOR',
}

export const RoleHierarchy: Record<RoleType, number> = {
  [RoleType.ADMIN]: 100,
  [RoleType.POLICE_CHIEF]: 90,
  [RoleType.INVESTIGATOR]: 80,
  [RoleType.FINANCIAL_INVESTIGATOR]: 80,
  [RoleType.FORENSIC_OFFICER]: 80,
  [RoleType.CENSOR]: 80,
};

export const hasPermission = (userRole: RoleType, requiredRole: RoleType): boolean => {
  return RoleHierarchy[userRole] >= RoleHierarchy[requiredRole];
};
