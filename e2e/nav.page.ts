import {by, element} from "protractor";

export class NavPage{

  onClickBar(menu: string, submenu: string){
    element.all(by.css('ul '+ menu)).filter(elem=>{
      return elem.getText().then(text=>{
        return text == submenu;
      })
    }).first().click();
  }

}
