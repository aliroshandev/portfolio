export class ExperienceContent {

  #data: any;

  constructor(...args: any[]) {
    this.#data = args[0];
  }

  get data() {
    if (this.isArrayOfBullets()) {
      return this.#data as Array<string>;
    } else if (this.isString()) {
      return this.#data as string;
    } else {
      return null;
    }
  }

  set data(data: any) {
    this.#data = data;
  }

  isString(): this is ExperienceContent & { data: string } {
    return typeof this.#data === "string";
  }

  isArrayOfBullets(): this is ExperienceContent & { data: Array<string> } {
    return typeof this.#data === "object" && Array.isArray(this.#data);
  }
}
