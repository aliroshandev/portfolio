import {ExperienceContent} from '../models/experience-content';

export interface ExperienceInterface {
  workFromToDate: [string, string];
  companyName: string;
  companyDescription?: string;
  experienceDetails: ExperienceContentInterface;
}

export interface ExperienceContentInterface {
  title: string;
  href: string,
  content: ExperienceContent;
  tags: Array<string>,
}

export interface SkillsInterface {
  languages: string;
  frameworks: string;
  tools: string;
  concepts: string;
}
