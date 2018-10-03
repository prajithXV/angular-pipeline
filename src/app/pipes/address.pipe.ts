import { Pipe, PipeTransform } from '@angular/core';
import {Address} from "../models/address";

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  private static addToken(ret: string, token: string) {
    if (!token || token == "") {
      return ret;
    }
    return ret == "" ? token : `${ret}, ${token}`;
  }

  transform(value: Address, format: string): any {
    let ret = "";
    switch(format) {
      case 'oneLine':
      default:
        ret = AddressPipe.addToken(ret, value.streetAddress1);
        ret = AddressPipe.addToken(ret, value.streetAddress2);
        ret = AddressPipe.addToken(ret, value.streetAddress3);
        ret = AddressPipe.addToken(ret, value.postalCode);
        ret = AddressPipe.addToken(ret, value.city);
        ret = AddressPipe.addToken(ret, value.stateCode);

    }
    return ret;
  }

}
