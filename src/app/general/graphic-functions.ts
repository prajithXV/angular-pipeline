import {Injectable} from "@angular/core";

// @Injectable()
export class GraphicFunctions {

 static generateNull(arr:Array<any>) {
    let array = [];
    for (let i in arr) {
      array.push(0);
    }
    return array;
  }

  /*
  * we pass an hour
  * - if is 12 or greater: PM
  * - else AM
  * - if the hour that we pass is 1 PM we transform 13 substrate 13-12
  * */
  static getDate(hours: number) {
    let ampm = (hours >= 12) ? "PM" : "AM";
    let pmh = (hours > 12) ? hours - 12 : hours;
    return pmh + " " + ampm;

  }
}


