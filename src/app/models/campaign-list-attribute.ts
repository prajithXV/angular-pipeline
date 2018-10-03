export class CampaignListAttribute {
  private _code: string;
  private _values: any[];

  // Values can be an array or a single value
  constructor(cod?: string, values?) {
    this.code = cod;
    if (values instanceof Array) {
      for (let v of values) {
        this.addValue(v);
      }
    } else {
      this.addValue(values);
    }
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  resetValues() {
    this._values = [];
  }

  get values() {
    return this._values;
  }

  addValue(val: any) {
    if (!this.values) {
      this.resetValues();
    }
    this._values.push(val);
  }

  get plainValues() {
    if (!this.values) {
      return "";
    }
    return this._values.reduce(((last, val) => last ? last + ", " + val.toString() : val.toString()), null);
  }
}
