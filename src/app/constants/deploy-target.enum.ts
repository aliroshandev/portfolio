export const DeployTargetEnum = {
  LOCAL: 'LOCAL',
  PRODUCTION: 'PRODUCTION',
}

export type DeployTargetEnumType = typeof DeployTargetEnum[keyof typeof DeployTargetEnum];
