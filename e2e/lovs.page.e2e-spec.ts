import {LoginPage} from "./login.page";
import {NavPage} from "./nav.page";
import {browser, protractor} from "protractor";
import {LovsPage} from "./lovs.page";

describe('inspinia App', () => {
  let loginPage: LoginPage;
  let navPage: NavPage;
  let lovsPage: LovsPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    navPage = new NavPage();
    lovsPage = new LovsPage();
    loginPage.enterToMainPage();
    navPage.onClickBar('#admin li', 'LOVs');
  });


  it('LOVs navigation: loaded data', () => {

    lovsPage.checkButtonEnabled('New', true);

    lovsPage.checkTablesData(['CLOSE_CASE3','test closeable tickler type2', 'test closing', 'String', '', '', ''], false, 'lov-types-table', 0);
    lovsPage.checkTablesData(['CLOSE_CASE4','test closeable tickler type3', 'test closing', 'Number', '', '', ''], true, 'lov-types-table', 1);
    lovsPage.checkTablesData(['CLOSE_CASE1','test closeable tickler type4', 'test closing', 'Date', '', '', ''], false, 'lov-types-table', 2);
    lovsPage.checkTablesData(['CLOSE_CASE5','test closeable tickler type5', 'test closing', 'Date and time', '', '', ''], false, 'lov-types-table', 3);
    lovsPage.checkTablesData(['CLOSE_CASE6','test closeable tickler type6', 'test closing', 'String', '', '', ''], true, 'lov-types-table', 4);

  });


  it('LOVs navigation: new LOV type - not write on mandatory fields', () => {

    lovsPage.checkButtonEnabled('New', true);

    lovsPage.onClick('New');

    lovsPage.checkButtonEnabled('New', false);
    lovsPage.checkButtonEnabled('Add', false);

    lovsPage.onEvent('focus', 'lovName');
    lovsPage.onEvent('blur','div.ibox-content');

    lovsPage.checkButtonEnabled('Add', false);

    lovsPage.onEvent('focus', 'lovCode');
    lovsPage.onEvent('blur','div.ibox-content');

    lovsPage.checkButtonEnabled('Add', false);
    lovsPage.checkButtonEnabled('New', false);

  });

  it('LOVs navigation: new LOV type - write on mandatory fields', () => {

    lovsPage.checkButtonEnabled('New', true);

    lovsPage.onClick('New');

    lovsPage.checkButtonEnabled('New', false);
    lovsPage.checkButtonEnabled('Add', false);

    lovsPage.onEvent('focus', 'lovName');
    lovsPage.onEvent('blur','div.ibox-content');

    lovsPage.writeOnInput('lovName', 'LOV name');

    lovsPage.checkButtonEnabled('Add', false);

    lovsPage.onEvent('focus', 'lovCode');
    lovsPage.onEvent('blur','div.ibox-content');

    lovsPage.writeOnInput('lovCode', 'LOV code');

    lovsPage.checkButtonEnabled('Add', true);
    lovsPage.checkButtonEnabled('New', false);

  });

  it('LOVs navigation: new LOV type - ADD', () => {

    lovsPage.checkButtonEnabled('New', true);

    lovsPage.onClick('New');

    lovsPage.writeOnInput('lovCode', 'LOV code');
    lovsPage.writeOnInput('lovName', 'LOV name');

    lovsPage.checkButtonEnabled('Add', true);

    lovsPage.onClick('Add');

    lovsPage.checkNotification(true, 'LOV type added');

    });

  it('LOVs navigation: new LOV type - CANCEL', () => {

    lovsPage.checkButtonEnabled('New', true);

    lovsPage.onClick('New');

    lovsPage.writeOnInput('lovCode', 'LOV code');
    lovsPage.writeOnInput('lovName', 'LOV name');

    lovsPage.checkButtonEnabled('Add', true);

    lovsPage.onClick('Cancel');

    lovsPage.checkNotification(false);

  });

  it('LOVs navigation: edit - General (same data)', () => {
    let EC = protractor.ExpectedConditions;

    lovsPage.checkComponent('lov-types-table', true);
    lovsPage.checkComponent('new-lov-type', false);

    lovsPage.checkButtonEnabled('New', true);

    lovsPage.onClick('', null,'i','edit fas fa-edit');

    lovsPage.checkForm(['CLOSE_CASE3', 'test closeable tickler type2'], ['0: 0'], [null], ['test closing']);

    lovsPage.onClick('', null,'i','edit fas fa-edit');

    lovsPage.onClick('', null,'i','edit fas fa-edit orange');
    browser.wait(EC.visibilityOf(lovsPage.getButton('', null,'i','edit fas fa-edit orange')));

    lovsPage.checkForm(['CLOSE_CASE4', 'test closeable tickler type3'], ['1: 1'], ['true'], ['test closing']);

  });

  it('LOVs navigation: edit - General (SAVE)', () => {


    lovsPage.checkComponent('lov-types-table', true);
    lovsPage.checkComponent('new-lov-type', false);

    lovsPage.checkButtonEnabled('New', true);

    lovsPage.onClick('', null,'i','edit fas fa-edit');

    lovsPage.checkForm(['CLOSE_CASE3', 'test closeable tickler type2'], ['0: 0'], [null], ['test closing']);

    lovsPage.onClick('Save');

    lovsPage.checkNotification(true, 'LOV type updated');


  });

  it('LOVs navigation: edit - Values (NEW)', () => {


    lovsPage.checkComponent('lov-types-table', true);
    lovsPage.checkComponent('new-lov-type', false);

    lovsPage.checkButtonEnabled('New', true);

    lovsPage.onClick('', null,'i','edit fas fa-edit');

    lovsPage.onClick('New', 1);

    lovsPage.writeOnInput('valueText', 'Value text');
    lovsPage.writeOnInput('valueName', 'Value name');

    lovsPage.checkButtonEnabled('Add', true);

    lovsPage.onClick('Add');

    lovsPage.checkNotification(true, 'LOV value added');

    lovsPage.checkButtonEnabled('New', true, 1);

  });


  it('LOVs navigation: edit - Values (same data)', () => {


    lovsPage.checkComponent('lov-types-table', true);
    lovsPage.checkComponent('new-lov-type', false);

    lovsPage.checkButtonEnabled('New', true);

    lovsPage.onClick('', null,'i','edit fas fa-edit');
    lovsPage.onClick('', null,'i','edit fas fa-edit ng-star-inserted');

    lovsPage.checkForm(['CLOSE_CASE3', 'test closeable tickler type2', 'V4.2 code', 'Value 4.2 name'], ['0: 0'],
      [null, 'true'], ['test closing', 'Desc value 4.2' ]);


    lovsPage.checkButtonEnabled('Save', true, 1);

  });


  it('LOVs navigation: edit - Values (SAVE)', () => {


    lovsPage.checkComponent('lov-types-table', true);
    lovsPage.checkComponent('new-lov-type', false);

    lovsPage.checkButtonEnabled('New', true);

    lovsPage.onClick('', null,'i','edit fas fa-edit');
    lovsPage.onClick('', null,'i','edit fas fa-edit ng-star-inserted');

    lovsPage.checkForm(['CLOSE_CASE3', 'test closeable tickler type2', 'V4.2 code', 'Value 4.2 name'], ['0: 0'],
      [null, 'true'], ['test closing', 'Desc value 4.2' ]);


    lovsPage.checkButtonEnabled('Save', true, 1);

    lovsPage.onClick('Save', 1);
    lovsPage.checkNotification(true, 'LOV value updated');

    lovsPage.checkButtonEnabled('New', true, 0);
    lovsPage.checkButtonEnabled('New', true, 1);

  });

});
