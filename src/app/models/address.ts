export class Address {
  private _streetAddress1: string;
  private _streetAddress2: string;
  private _streetAddress3: string;
  private _city: string;
  private _stateCode: string;
  private _postalCode: string;

  constructor(streetAddress1?: string, streetAddress2?: string, streetAddress3?: string, city?: string, stateCode?: string, postalCode?:string ){

    this.streetAddress1 = streetAddress1;
    this.streetAddress2 = streetAddress2;
    this.streetAddress3 = streetAddress3;
    this.city = city;
    this.stateCode = stateCode;
    this.postalCode = postalCode;
  }

  get streetAddress1(): string {
    return this._streetAddress1;
  }

  set streetAddress1(value: string) {
    this._streetAddress1 = value;
  }

  get streetAddress2(): string {
    return this._streetAddress2;
  }

  set streetAddress2(value: string) {
    this._streetAddress2 = value;
  }

  get streetAddress3(): string {
    return this._streetAddress3;
  }

  set streetAddress3(value: string) {
    this._streetAddress3 = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get stateCode(): string {
    return this._stateCode;
  }

  set stateCode(value: string) {
    this._stateCode = value;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }
}
