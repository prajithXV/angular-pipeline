import {$, $$, by, element} from "protractor";

export class LovsPage {

  getButton(buttonText: string, index?:number, iButton?: string, iClass?: string) {
    if (!iClass) {
      if(!index){
        return element(by.cssContainingText('app-root button', buttonText));
      }else{
        return element.all(by.cssContainingText('app-root button', buttonText)).get(index);
      }
    } else {
      return $$(iButton).filter((elem, index) => {
        return elem.getAttribute('class').then((text) => {
          return text == iClass;
        })
      }).first();
    }
  }

  getComponent(componentName: string) {
    return $(componentName);
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

  get textArea(){
    return $$('textarea').map(t=>t.getAttribute('value'));
  }

  onClick(buttonText: string, index?: number, iButton?: string, iClass?: string) {
    if (!iClass) {
      this.getButton(buttonText, index).click();
    } else {
      this.getButton(buttonText, index, iButton, iClass).click();
    }
  }

  onEvent(event: string, elementName: string){
    event == 'focus' ? $('app-root input[name=' + elementName + ']').click() : $(elementName).click();
  }

  writeOnInput(name: string, inputText: string) {
    this.getInputByName(name).sendKeys(inputText);
  }


  checkButtonEnabled(buttonText: string, isEnabled: boolean, index?: number, iClass?: string) {
    if (!iClass) {
      expect(this.getButton(buttonText, index).isEnabled()).toEqual(isEnabled);
    }
    else {
      expect(this.getButton(buttonText,index, iClass).isEnabled()).toEqual(isEnabled);
    }
  }

  checkTablesData(array: Array<string>, active: boolean, tableName: string, index: number) {
    $$(tableName + ' tbody tr').then(arr => {
      let cellText = arr[index].all(by.tagName('td')).map(elm => elm.getText());
      let cellActive = arr[index].getAttribute('class');
      expect(cellText).toEqual(array);
      active ? expect(cellActive).not.toContain('disabledTr') : expect(cellActive).toContain('disabledTr');
    });
  }


  checkComponent(componentName: string, isComponentVisible: boolean) {
    expect(this.getComponent(componentName).isPresent()).toEqual(isComponentVisible);
  }


  checkNotification(isVisible: boolean, feedbackMessage?: string) {
    expect(this.getNotification(feedbackMessage).isPresent()).toEqual(isVisible);
    if (this.getNotification(feedbackMessage).isPresent() == true) {
      expect(this.getNotification(feedbackMessage).getText()).toEqual(feedbackMessage);
    }
  }

  checkForm(inputArray: Array<string>, selectArray: Array<string>, checkBoxArray: Array<string>, textArea:  Array<string>) {
    expect(this.inputs).toEqual(inputArray);
    expect(this.selects).toEqual(selectArray);
    expect(this.checkboxes).toEqual(checkBoxArray);
    expect(this.textArea).toEqual(textArea);
  }

}
