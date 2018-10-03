import { Pipe, PipeTransform } from '@angular/core';
import {DecimalPipe} from "@angular/common";

@Pipe({
  name: 'coinFixedNumber'
})
export class CoinFixedNumber extends DecimalPipe {

  transform(value: any, digits?: string): any {
    if (!digits) {
      digits = "1.2-2";
    }
    if (value === null || value === undefined || value.toString().trim() == '') {
      return '';
    }
    // return `$ ${value}`;
    return super.transform(value, digits);
  }

}

@Pipe({
  name: 'coinPercentage'
})
export class CoinPercentagePipe extends CoinFixedNumber {

  transform(value: any, args?: any): any {
    if (value === null || value === undefined || value.toString().trim() == '') {
      return '';
    }
    // return `$ ${value}`;
    return super.transform(value) + '%';
  }

}
