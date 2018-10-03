export class Person {
  private _completeName: string;
  private _firstName: string;
  private _lastName: string;


  constructor(completeName?: string, firstName?: string, lastName?: string){
    this.completeName = completeName;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get completeName(): string {
    return this._completeName;
  }

  set completeName(value: string) {
    this._completeName = value;
  }
  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }
  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }
}
