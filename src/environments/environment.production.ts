import {DeployTargetEnum} from '../app/constants/deploy-target.enum';
import {EnvironmentInterface} from '../app/constants/types';

export const environment: EnvironmentInterface = {
  deployTarget: DeployTargetEnum.PRODUCTION,
  production: true,
};
