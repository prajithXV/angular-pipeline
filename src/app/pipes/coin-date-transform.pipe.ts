import {Pipe, PipeTransform} from '@angular/core';

import * as moment from 'moment';

//deprecated errors
// const m = require('moment');
// m.suppressDeprecationWarnings = true;

@Pipe({
  name: 'coinDateTransform'
})
export class CoinDateTransformPipe implements PipeTransform {

  /*
  *
  * We pass 3 values:
  * 1. String Date from the Json
  * 2. dPattern: the form to be our date
  * 3. oPattern: the format that is our date
  *
  * - if not oPattern --> we parse our date without pattern
  *    - if this moment date is not valid we return the dateStr that how is it
  *
  * - else we pars our date with our pattern
  *
  * in the switch case we can choose our dPattern
  *
  *
  * !!important: coinDateTransform : "" : "YYYY/MM/DD"
  *  in this example we call our pipe, it is not necessary a dPattern, but to
  *  use our oPattern the format must to be in its Json pattern
  *
  * */
  transform(dateStr: string, dPattern?: string, oPattern?: string): any {
    if (!dateStr) {
      return "";
    }

    let ret = "";
    let today: moment.Moment = null;


    if (!oPattern || oPattern == "") {
      today = moment(dateStr);

    } else {

      today = moment(dateStr, oPattern);
    }


    if(!today.isValid()){
      return ret = dateStr
    }

    switch (dPattern) {
      case "STD_DATE":
        ret = today.format('MM/DD/YYYY');
        break;
      case "STD_TIME":
        ret = today.format("hh:mm A");
        break;
      default:
        ret = today.format('MM/DD/YYYY hh:mm A');
        break;
    }
    return ret;
  }

}
