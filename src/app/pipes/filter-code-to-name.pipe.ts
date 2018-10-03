import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCodeToName'
})

export class FilterCodeToNamePipe implements PipeTransform {

  transform(array: Array<any>, filterCode: any, isNotCodeType?:boolean): any {

    if(!isNotCodeType){
      return array &&(array.length > 0) ? array.find(i=>i.code == filterCode) ?
             array.find(i=>i.code == filterCode).name : null : null;
    }else{
      return array &&(array.length > 0) ? array.find(i=>i.processCode == filterCode) ?
             array.find(i=>i.processCode == filterCode).processName : null : null;
    }
  }

}
