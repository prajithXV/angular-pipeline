import {LoginPage} from './login.page';
import {browser, protractor} from "protractor";

describe('inspinia App', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();

  });

  it('should display message saying welcome', () => {
    page.navigateTo('/#/app/login');
    expect(page.getParagraphText()).toEqual('Welcome to Collections Optimization Application');
  });

  it('login button should be disabled', () => {
    page.navigateTo('/#/app/login');
    expect(page.getLoginButton()).not.toBeNull();
    expect(page.getLoginButton().isEnabled()).toBe(false);
  });

  it('login navigation', () => {
    page.navigateTo('/#/app/login');
    page.getUserInput().sendKeys('usr');
    page.getPwdInput().sendKeys('pwd');
    expect(page.getLoginButton().isEnabled()).toBe(true);
    page.getLoginButton().click();
    let expUrl = '/#/app/main';
    browser.getCurrentUrl().then(url => expect(url.substr(url.length - expUrl.length)).toEqual(expUrl));
  });

  it('login navigation: not logged', () => {
    let EC = protractor.ExpectedConditions;
    page.navigateTo('/#/app/account/1123461/L/232');
    page.checkCurrentUrl('/#/app/login');

    page.navigateTo('/#/app/main');
    page.checkCurrentUrl('/#/app/login');

    page.navigateTo('#/admin/processes');
    page.checkCurrentUrl('/#/app/login');

    page.navigateTo('/#/admin/attributes');
    page.checkCurrentUrl('/#/app/login');

    page.navigateTo('#/admin/lovs');
    page.checkCurrentUrl('/#/app/login');

    browser.wait(EC.visibilityOf(page.getUserInput()));

  });

});
