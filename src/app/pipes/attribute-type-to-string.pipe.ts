import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attributeTypeToString'
})
export class AttributeTypeToStringPipe implements PipeTransform {

  transform(value: any, args?:boolean): string {
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
        value = "Date and time";
        break;

      case 4:
        if(args){
          value = "LOV";
        }else{
          value = "List of values";
        }
        break;

      default:
        value = "Unknown";
    }
    return value;
  }

}
