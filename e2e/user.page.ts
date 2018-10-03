import {$$, by, element} from "protractor";

export class UserPage{

  getButton(iButton?: string, iClass?: string) {
      return $$(iButton).filter((elem, index) => {
        return elem.getAttribute('class').then((text) => {
          return text == iClass;
        })
      }).first();
  }

  onClick(iButton?: string, iClass?: string) {
      this.getButton(iButton, iClass).click();
  }



  checkButtonClass(iClass?: string,index?: number,) {
      expect(this.getButton('i', iClass).getAttribute('class')).toEqual(iClass);
  }

  selectUser(agentUsername: string) {
    $$('agents-table tbody tr td').filter(function (elem, index) {
      return elem.getText().then(function (text) {
        return text === agentUsername;
      });
    }).first().click();
  }

  checkTablesData(array: Array<string>, tableName: string, index: number) {
    $$(tableName + ' tbody tr').then(arr => {
      let cellText = arr[index].all(by.tagName('td')).map(elm => elm.getText());
      expect(cellText).toEqual(array);
    });
  }


}
