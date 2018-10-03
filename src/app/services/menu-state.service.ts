import { Injectable } from '@angular/core';


@Injectable()
export class MenuStateService {

  /*menu array*/
  menu: Array<{ id: string, type: boolean }> = [];

  constructor() {}

  /*
  * when we click on the menu tabs if the data not exist we push it
  *
  * id: string of the section
  * type: true or false
  *
  *
  *
  * */
  private saveMenuState(id:string, type:boolean) {
    if (!this.menu) {
      this.menu = []
    }
      this.menu.push({id,type});
  }

  /*
  * when we click on the menu tabs
  *
  * id: string of the section
  * type: true or false
  *
  * if exists this id on the array (we have been push it/click on the tab)
  *    we modify the type --> if the tab is show (true) and we click on it; now the tab is hide (false)
  *
  * else if not exists (we not click on it) we push this data on the array
  *
  * */
  refreshStateMenu(id:string, type:boolean){
    let index = this.menu.findIndex(i => i.id === id);
    if (index > -1) {
      this.menu[index].type = type;
    }
    else{
      this.saveMenuState(id,type);
    }
  }

  /*
  * this function is called on the html to can put the active class on the tab
  *
  *  - by default = show (true)
  *  - we find the element and if exists change add or remove the class active (true or false)
  *
  *
  * */
  getTypeById(id:string) {
    let status: boolean = true;
    let menuItem = this.menu.find(i => i.id === id);
    if (menuItem) {
      status = menuItem.type;
    }
    return status;
  }


}
