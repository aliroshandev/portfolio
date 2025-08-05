import {DeployTargetEnumType} from './deploy-target.enum';
import {HeadingContent} from '../models/heading-content';
import {ExperienceContent} from '../models/experience-content';

export interface HeadingInterface {
  id: string;
  text: string;
}

export interface EnvironmentInterface {
  deployTarget: DeployTargetEnumType;
  production: boolean;
}

export interface LinkInterface {
  href: string;
  iconName?: string;
  text: string;
  target?: LinkTarget;
  className: string;
}

export type LinkTarget = '_blank' | '_self' | '_top' | '_parent';

export interface HeadingContentInterface {
  title: string;
  content: HeadingContent;
}

export interface ExperienceInterface {
  workFromToDate: [string, string];
  companyName: string;
  experienceDetails: ExperienceContentInterface;
}

export interface ExperienceContentInterface {
  title: string;
  href: string,
  content: ExperienceContent;
}

export interface SkillsInterface {
  languages: string;
  frameworks: string;
  tools: string;
  concepts: string;
}
