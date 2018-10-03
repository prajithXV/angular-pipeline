import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(values: Array<any>, args?: any, defaultOrder?: boolean): any {
    if(!args.defaultOrder) {
      return values.sort(function (a, b) {


        a[args.property] = a[args.property] == null ? "" : a[args.property];
        b[args.property] = b[args.property] == null ? "" : b[args.property];

        if (a[args.property].toLowerCase() < b[args.property].toLowerCase()) {
          return -1 * args.direction;
        }
        else if (a[args.property].toLowerCase() > b[args.property].toLowerCase()) {
          return 1 * args.direction;
        }
        else {
          return 0;
        }

      });
    }
    return values;
  };

}
