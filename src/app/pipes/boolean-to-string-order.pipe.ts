import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToStringOrder'
})
export class BooleanToStringOrderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value == true ? 'DESC': 'ASC';
  }

}

export class BooleanToStringDuePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == true){
      return 'DueDescending';

    }else if(value == false){
      return 'DueAscending';

    }else{
      return null;
    }

  }

}
