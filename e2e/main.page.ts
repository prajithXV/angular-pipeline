import {$, $$, browser, by, element} from "protractor";


export class MainPage {

  getButton(buttonText: string, iClass?: string) {
    if (!iClass) {
      return element(by.cssContainingText('app-root button', buttonText));
    } else {
      return $$('app-root button').filter((elem, index) => {
        return elem.getAttribute('class').then((text) => {
          return text == iClass;
        })
      }).first();
    }
  }

  get inputs() {
    return $$('input').map(arr => arr.getAttribute('value'));
  }

  getInputByName(name: string) {
    return $('app-root input[name=' + name + ']');
  }

  get selects() {
    return $$('select').map(v => v.getAttribute('value'));
  }

  getNotification(message: string) {
    return $$('div.toast').filter((elem, index) => {
      return elem.getText().then(text => {
        return text === message;
      });
    }).first();
  }

  getComponent(componentName: string) {
    return $(componentName);
  }

  getTabByClass(tabId: string) {
    return $('a' + tabId).getAttribute('class');
  }

  getTab(tabId: string) {
    return $('a' + tabId);
  }

  getFilter(filterId: string) {
    return $(filterId);
  }

  onClick(buttonText: string, iClass?: string) {
    if (!iClass) {
      this.getButton(buttonText).click();
    } else {
      this.getButton(buttonText, iClass).click();
    }
  }

  onClickTab(tabId: string) {
    this.getTab(tabId).click();
  }

  onCollapseFilter(filterId: string) {
    this.getFilter(filterId).click();
  }

  onCreateCase(tableName: string) {
    $$(tableName + ' tbody tr td i').then(i => {
      i[0].click();
    });
  }

  onModalOptions(option: string) {
    $$('div.modal-dialog button').filter(function (elem, index) {
      return elem.getText().then(function (text) {
        return text === option;
      });
    }).first().click();
  }


  selectProcessCase(processCase: string) {
    $$('tickler-cases-table tbody tr td').filter(function (elem, index) {
      return elem.getText().then(function (text) {
        return text === processCase;
      });
    }).first().click();
  }

  returnToMain() {
    element(by.css('ul li#main')).click();
  }

  changeSelectOptions(optionValue: string, optionName?: string) {
    if (!optionName) {
      element.all(by.css('option[value="' + optionValue + '"]')).click();
    } else {
      element.all(by.css('option[value="' + optionValue + '"]')).filter(i => {
        return i.getText().then(t => {
          return t == optionName;
        })
      }).first().click();
    }
  };


  writeOnInput(name: string, inputText: string) {
    this.getInputByName(name).sendKeys(inputText);
  }


  checkBackToListButton(searchText: string, isBackListButtonPresent: boolean) {
    expect(this.getButton(searchText).isPresent()).toBe(isBackListButtonPresent);
  }

  checkCurrentUrl(currentUrl: string) {
    expect(browser.getCurrentUrl()).toContain(currentUrl);
  }


  checkButtonEnabled(buttonText: string, isEnabled: boolean, iClass?: string) {
    if (!iClass) {
      expect(this.getButton(buttonText).isEnabled()).toEqual(isEnabled);
    }
    else {
      expect(this.getButton(buttonText, iClass).isEnabled()).toEqual(isEnabled);
    }
  }

  checkTablesData(array: Array<string>, tableName: string, index?: number, feedbackMessage?: string) {
    $$(tableName + ' tbody tr').then(arr => {
      if (arr.length != 0) {
        let cellText = arr[index].all(by.tagName('td')).map(elm => elm.getText());
        expect(cellText).toEqual(array);
      } else {
        expect($(tableName).getText()).toEqual(feedbackMessage);
        expect([]).toEqual(array);
      }
    });
  }

  checkModal(isVisible: boolean) {
    expect($('div.modal-dialog').isPresent()).toEqual(isVisible);
  }

  checkNotification(isVisible: boolean, feedbackMessage?: string) {
    expect(this.getNotification(feedbackMessage).isPresent()).toEqual(isVisible);
    if (this.getNotification(feedbackMessage).isPresent() == true) {
      expect(this.getNotification(feedbackMessage).getText()).toEqual(feedbackMessage);
    }
  }

  checkForm(inputArray: Array<string>, selectArray: Array<string>) {
    expect(this.inputs).toEqual(inputArray);
    expect(this.selects).toEqual(selectArray);
  }


  checkComponent(componentName: string, isComponentVisible: boolean) {
    expect(this.getComponent(componentName).isPresent()).toEqual(isComponentVisible)
  }

  checkToggleFilter(filterId: string, isVisible: boolean) {
    expect(this.getFilter(filterId).isPresent()).toEqual(isVisible);
  }

  checkTab(tabId: string, isActive: boolean) {
    isActive ? expect(this.getTabByClass(tabId)).toContain('active') : expect(this.getTabByClass(tabId)).not.toContain('active');
  }

  log(arg) {
    browser.call(function () {
      console.log(arg);
    });
  }

}
