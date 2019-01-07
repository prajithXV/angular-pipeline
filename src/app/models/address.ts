export function setString(value: string) {
  return value ? value : "";
}

export class Address {
  private _streetAddress1: string;
  private _streetAddress2: string;
  private _streetAddress3: string;
  private _city: string;
  private _stateCode: string;
  private _postalCode: string;

  constructor(streetAddress1?: string, streetAddress2?: string, streetAddress3?: string, city?: string, stateCode?: string, postalCode?:string){
    this._streetAddress1 = setString(streetAddress1);
    this._streetAddress2 = setString(streetAddress2);
    this._streetAddress3 = setString(streetAddress3);
    this._city = setString(city);
    this._stateCode = setString(stateCode);
    this._postalCode = setString(postalCode);
  }

  get streetAddress1(): string {
    return this._streetAddress1;
  }

  set streetAddress1(value: string) {
    this._streetAddress1 = setString(value);
  }

  get streetAddress2(): string {
    return this._streetAddress2;
  }

  set streetAddress2(value: string) {
    this._streetAddress2 = setString(value);
  }

  get streetAddress3(): string {
    return this._streetAddress3;
  }

  set streetAddress3(value: string) {
    this._streetAddress3 = setString(value);
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = setString(value);
  }

  get stateCode(): string {
    return this._stateCode;
  }

  set stateCode(value: string) {
    this._stateCode = setString(value);
  }

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = setString(value);
  }

  isDirty(a?: Address) {
    return a && (
      this.streetAddress1 != a.streetAddress1 ||
      this.streetAddress2 != a.streetAddress2 ||
      this.streetAddress3 != a.streetAddress3 ||
      this.city != a.city ||
      this.stateCode != a.stateCode ||
      this.postalCode != a.postalCode
    );
  }

  clone(): Address {
    return new Address(this.streetAddress1, this.streetAddress2, this.streetAddress3, this.city, this.stateCode, this.postalCode);
  }
}
