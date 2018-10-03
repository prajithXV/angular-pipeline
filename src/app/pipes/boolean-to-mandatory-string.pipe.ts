import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToMandatoryString'
})
export class BooleanToMandatoryStringPipe implements PipeTransform {

  transform(value: boolean): any {
    return value == true? "Mandatory": "Not Mandatory";
  }

}
