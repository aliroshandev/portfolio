import {ExperienceInterface, SkillsInterface} from '../constants/types';

export class HeadingContent {
  #data: any;

  constructor(...args: any[]) {
    this.#data = args[0];
  }

  get data() {
    if (this.isArrayOfExperience()) {
      return this.#data as Array<ExperienceInterface>;
    } else if (this.isString()) {
      return this.#data as string;
    } else if (this.isSkills()) {
      return this.#data as SkillsInterface;
    } else {
      return null;
    }
  }

  set data(data: any) {
    this.#data = data;
  }

  isArrayOfExperience(): this is HeadingContent & { data: Array<ExperienceInterface> } {
    return (Array.isArray(this.#data) && this.#data.length > 0 && this.#data[0].companyName.length > 0);
  }

  isString(): this is HeadingContent & { data: string } {
    return typeof this.#data === "string";
  }

  isSkills(): this is HeadingContent & { data: SkillsInterface } {
    return this.#data satisfies SkillsInterface;
  }

}
