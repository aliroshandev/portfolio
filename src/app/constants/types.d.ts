import {DeployTargetEnumType} from './deploy-target.enum';

export interface HeadingInterface {
  id: string;
  text: string;
}

export interface EnvironmentInterface {
  deployTarget: DeployTargetEnumType;
  production: boolean;
}
