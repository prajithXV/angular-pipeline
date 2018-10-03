import {browser, by, element} from "protractor";

export class LoginPage {
  navigateTo(url:string) {
    return browser.get(url);
  }

  getParagraphText() {
    return element(by.css('app-root h3')).getText();
  }

  getLoginButton() {
    return element(by.css('app-root button'));
  }

  getUserInput() {
    return element(by.css('app-root input[name=username]'));
  }

  getPwdInput() {
    return element(by.css('app-root input[name=password]'));
  }

  enterToMainPage(){
    this.navigateTo('/#/app/login');
    this.getUserInput().sendKeys('usr');
    this.getPwdInput().sendKeys('pwd');
    this.getLoginButton().click();
    browser.getCurrentUrl();
  }

  checkCurrentUrl(expUrl: string){
    browser.getCurrentUrl().then(url => expect(url.substr(url.length - expUrl.length)).toEqual(expUrl));
  }



}
