import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coinDate'
})
export class CoinDatePipe implements PipeTransform {
  // Takes a string with date / time and returns the date
  transform(value: any, separator = ' ', showTime = false) {
    if (!value) {
      return '';
    }
    let ind = value.indexOf(separator);
    if (ind == -1) {
      return value;
    }
    let ret = value.substr(0, ind);
    if (showTime) {
      ret += " " + value.substr(ind + 1, 5);
    }
    return ret;
  }
}
