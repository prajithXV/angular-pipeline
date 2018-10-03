import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyPipe} from "@angular/common";

@Pipe({
  name: 'coinCurrency'
})
export class CoinCurrencyPipe extends CurrencyPipe {
  // constructor(private _currencyPipe: CurrencyPipe) {}

  transform(value: any) {
    if (value === null || value === undefined || value.toString().trim() == '') {
      return '';
    }
    // return `$ ${value}`;

    /*
    *
    * Angular 5 --> value: 1234.56
    *               currencyCode: USD
    *               code: USD | symbol: US$ | symbol-narrow: $ (NEW)
    *               digits: 1.2-2
    * */

    return super.transform(value, 'USD', 'symbol-narrow', "1.2-2")
  }
}
