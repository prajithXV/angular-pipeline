import {$, $$, by, element} from "protractor";

export class ProcessesPage{

  getComponent(componentName: string) {
    return $(componentName);
  }

  getButton(buttonText: string, index?:number, iButton?: string, iClass?: string) {
    if (!iClass && !index) {
        return element(by.cssContainingText('button', buttonText));
      }else if(!iClass && index){
        return element.all(by.cssContainingText('app-root button', buttonText)).get(index);

    } else {
      return $$(iButton).filter((elem, index) => {
        return elem.getAttribute('class').then((text) => {
          return text == iClass;
        })
      }).get(index);
    }
  }

  getNotification(message: string) {
    return $$('div.toast').filter((elem, index) => {
      return elem.getText().then(text => {
        return text === message;
      });
    }).first();
  }


  getInputByName(name: string) {
    return $('app-root input[name=' + name + ']');
  }

  get inputs() {
    return $$('input').filter(elem=>{
      return elem.getAttribute('value').then(value=>{
        return value != 'Y';
      })
    }).getAttribute('value');
  }

  get selects() {
    return $$('select').map(v => v.getAttribute('value'));
  }

  get checkboxes() {
    return $$('input').filter(t=>{
      return t.getAttribute('value').then(value=>{
        return value === "Y";
      })
    }).getAttribute('checked');
  }

  onClick(buttonText: string, index?: number, iButton?: string, iClass?: string) {
    if (!iClass) {
      this.getButton(buttonText, index).click();
    } else {
      this.getButton(buttonText, index, iButton, iClass).click();
    }
  }

  selectProcess(id: string) {
    $$('tickler-process-table tbody tr td').filter(function (elem, index) {
      return elem.getText().then(function (text) {
        return text === id;
      });
    }).first().click();
  }


  onEvent(event: string, elementName: string){
    event == 'focus' ? $('app-root input[name=' + elementName + ']').click() : $(elementName).click();
  }

  writeOnInput(name: string, inputText: string) {
    this.getInputByName(name).sendKeys(inputText);
  }

  get textArea(){
    return $$('textarea').map(t=>t.getAttribute('value'));
  }

  checkModal(isVisible: boolean) {
    expect($('div.modal-dialog').isPresent()).toEqual(isVisible);
  }

  checkButtonEnabled(buttonText: string, isEnabled: boolean, index?: number, iClass?: string) {
    if (!iClass) {
      expect(this.getButton(buttonText, index).isEnabled()).toEqual(isEnabled);
    }
    else {
      expect(this.getButton(buttonText,index, 'i', iClass).isEnabled()).toEqual(isEnabled);
    }
  }

  checkButtonClass(iClass?: string,index?: number,) {
    expect(this.getButton('', index, 'i', iClass).getAttribute('class')).toEqual(iClass);
  }

  checkComponent(componentName: string, isComponentVisible: boolean) {
    expect(this.getComponent(componentName).isPresent()).toEqual(isComponentVisible);
  }

  checkTablesData(array: Array<string>, tableName: string, index: number, active?: boolean) {
    $$(tableName + ' tbody tr').then(arr => {
      let cellText = arr[index].all(by.tagName('td')).map(elm => elm.getText());
      let cellActive = arr[index].getAttribute('class');
      expect(cellText).toEqual(array);
      if(active!=null){
        active ? expect(cellActive).not.toContain('disabled-tr') : expect(cellActive).toContain('disabled-tr');
      }
    });
  }

  checkForm(inputArray: Array<string>, selectArray: Array<string>, checkBoxArray: Array<string>, textAreaArray: Array<string>) {
    expect(this.inputs).toEqual(inputArray);
    expect(this.selects).toEqual(selectArray);
    expect(this.checkboxes).toEqual(checkBoxArray);
    expect(this.textArea).toEqual(textAreaArray);
  }

  checkNotification(isVisible: boolean, feedbackMessage?: string) {
    expect(this.getNotification(feedbackMessage).isPresent()).toEqual(isVisible);
    if (this.getNotification(feedbackMessage).isPresent() == true) {
      expect(this.getNotification(feedbackMessage).getText()).toEqual(feedbackMessage);
    }
  }


}
