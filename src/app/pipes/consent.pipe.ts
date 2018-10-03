import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consent'
})
export class ConsentPipe implements PipeTransform {

  transform(value: boolean): string {
    if(value == true){
      return "Yes";

    }else if(value == false){
      return "No";

    }else{
      return "No data";
    }
  }

}

export class ConsentPipeCorrectConversion implements PipeTransform{
  transform(value: boolean): string {
    if(value == true){
      return "Y";

    }else if(value == false){
      return "N";

    }else{
      return null
    }
  }
}
