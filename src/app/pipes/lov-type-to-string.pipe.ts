import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lovTypeToString'
})
export class LovTypeToStringPipe implements PipeTransform {

  transform(value: any): any {
    switch (value){

      case 0:
        value = "String";
        break;

      case 1:
        value = "Number";
        break;

      case 2:
        value = "Date";
        break;

      case 3:
        value = "Date";
        break;

      case 4:
        value = "List of values";
        break;

      default:
        value = "Unknown";
    }
    return value;
  }

}
