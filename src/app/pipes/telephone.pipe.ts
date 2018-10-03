import {Pipe, PipeTransform} from '@angular/core';
import {Phone, PhoneType} from "../models/phone";

@Pipe({
  name: 'telephoneNumber'
})
export class TelephonePipe implements PipeTransform {

  // If isNumber == true => phone is the number
  // If isNumber == false => pone is a Phone object
  transform(phone: any, isNumber = false): any {
    try {
      var tel = isNumber ? phone : (phone as Phone).number;
      let value = tel.toString().trim().replace(/^\+/, '');
      if (!tel) {
        return '';
      }
      if (value.match(/[^0-9]/)) {
        return tel;
      }


      let country, city, number;
      switch (value.length) {
        case 10:
          country = 1;
          city = value.slice(0, 3);
          number = value.slice(3);
          break;

        case 11:
          country = value[0];
          city = value.slice(1, 4);
          number = value.slice(4);
          break;

        case 12:
          country = value.slice(0, 3);
          city = value.slice(3, 5);
          number = value.slice(5);

          break;


        default:
          country = 1;
          city = value.slice(0, 2);
          number = value.slice(2);


      }

      if (country == 1) {
        country = "";
      }

      number = number.slice(0, 3) + '-' + number.slice(3);
      return (country + " (" + city + ") " + number).trim();
    }
    catch (error) {
      return tel;
    }
  }
}

@Pipe({
  name: 'telephoneType'
})
export class TelephoneTypePipe implements PipeTransform {
  transform(phone: Phone, args?: any): any {
    // try {
    //   switch(tel) {
    //     case PhoneType.Home: return "Home Phone";
    //     case PhoneType.Business: return "Business Phone";
    //   }
    // } catch (err) {}
    // return "Phone";
    return phone.typeDescription;
  }
}
