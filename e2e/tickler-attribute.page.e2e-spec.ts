import {LoginPage} from "./login.page";
import {TicklerAttributePage} from "./tickler-attribute.page";
import {NavPage} from "./nav.page";
import {browser} from "protractor";

describe('inspinia App', () => {
  let loginPage: LoginPage;
  let navPage: NavPage;
  let ticklerAttributePage: TicklerAttributePage;

  beforeEach(() => {
    loginPage = new LoginPage();
    navPage = new NavPage();
    ticklerAttributePage = new TicklerAttributePage();
    loginPage.enterToMainPage();
    navPage.onClickBar('#admin li', 'Attributes')
  });


  it('Attributes navigation: loaded data', () => {
    
    ticklerAttributePage.checkComponent('tickler-attribute-table', true);
    ticklerAttributePage.checkComponent('new-tickler-attribute', false);

    ticklerAttributePage.checkButtonEnabled('New', true);

    ticklerAttributePage.checkTablesData(['1', 'TEST2', 'Test2', 'test', 'String', '', '','vsharapo','03/30/2018', 'vsharapo', '03/30/2018', ''],
      true, 'tickler-attribute-table', 0);


    ticklerAttributePage.checkTablesData(['2', 'TEST3', 'Test3', 'test', 'List of values (CLOSE_CASE3)', '', '','vsharapo','03/30/2018', 'vsharapo', '03/30/2018', ''],
      true, 'tickler-attribute-table', 1);

    ticklerAttributePage.checkTablesData(['6', 'TEST9', 'Test9', 'test', 'Date and time', '', '','vsharapo','03/30/2018', 'vsharapo', '03/30/2018', ''],
      true, 'tickler-attribute-table', 2);

    ticklerAttributePage.checkTablesData(['5', 'TEST5', 'Test5', 'test', 'Date', '', '','vsharapo','03/30/2018', 'vsharapo', '03/30/2018', ''],
      true, 'tickler-attribute-table', 3);

    ticklerAttributePage.checkTablesData(['4', 'TEST4', 'Test4', 'test', 'List of values (CLOSE_CASE4)', '', '','vsharapo','03/30/2018', 'vsharapo', '03/30/2018', ''],
      true, 'tickler-attribute-table', 4);


    ticklerAttributePage.checkTablesData(['7', 'TEST6', 'Test6', 'test', 'Number', '', '','vsharapo','03/30/2018', 'vsharapo', '03/30/2018', ''],
      true, 'tickler-attribute-table', 5);

    ticklerAttributePage.checkTablesData(['8', 'TEST7', 'Test7', 'test', 'List of values (CLOSE_CASE1)', '', '','vsharapo','03/30/2018', 'vsharapo', '03/30/2018', ''],
      true, 'tickler-attribute-table', 6);

    ticklerAttributePage.checkTablesData(['9', 'TEST8', 'Test8', 'test', 'List of values (CLOSE_CASE6)', '', '','vsharapo','03/30/2018', 'vsharapo', '03/30/2018', ''],
      true, 'tickler-attribute-table', 7);

    ticklerAttributePage.checkTablesData(['10', 'TEST10', 'Test10', 'test', 'Date and time', '', '','vsharapo','03/30/2018', 'vsharapo', '03/30/2018', ''],
      false, 'tickler-attribute-table', 8);

  });

  it('Attributes navigation: add tickler attribute - not lov type, not write on mandatory fields ', () => {

    ticklerAttributePage.checkButtonEnabled('New', true);

    ticklerAttributePage.checkComponent('tickler-attribute-table', true);
    ticklerAttributePage.checkComponent('new-tickler-attribute', false);

    ticklerAttributePage.onClick('New');

    ticklerAttributePage.checkComponent('new-tickler-attribute', true);

    ticklerAttributePage.checkButtonEnabled('New', false);

    ticklerAttributePage.onEvent('focus', 'attributeName');
    ticklerAttributePage.onEvent('blur', 'div.container');

    ticklerAttributePage.checkButtonEnabled('Add', false);


    ticklerAttributePage.onEvent('focus', 'attributeCode');
    ticklerAttributePage.onEvent('blur', 'div.container');

    ticklerAttributePage.checkButtonEnabled('Add', false);
    ticklerAttributePage.checkButtonEnabled('New', false);

  });

  it('Attributes navigation: add tickler attribute - not lov type, write on mandatory fields ', () => {

    ticklerAttributePage.checkComponent('tickler-attribute-table', true);
    ticklerAttributePage.checkComponent('new-tickler-attribute', false);

    ticklerAttributePage.checkButtonEnabled('New', true);

    ticklerAttributePage.onClick('New');


    ticklerAttributePage.checkComponent('new-tickler-attribute', true);

    ticklerAttributePage.checkButtonEnabled('New', false);

    ticklerAttributePage.onEvent('focus', 'attributeName');
    ticklerAttributePage.onEvent('blur', 'div.container');

    ticklerAttributePage.checkButtonEnabled('Add', false);

    ticklerAttributePage.writeOnInput('attributeName', 'Attribute name');

    ticklerAttributePage.checkButtonEnabled('Add', false);

    ticklerAttributePage.onEvent('focus', 'attributeCode');
    ticklerAttributePage.onEvent('blur', 'div.container');

    ticklerAttributePage.checkButtonEnabled('Add', false);

    ticklerAttributePage.writeOnInput('attributeCode', 'Attribute code');

    ticklerAttributePage.checkButtonEnabled('Add', true);
    ticklerAttributePage.checkButtonEnabled('New', false);


  });


  it('Attributes navigation: add tickler attribute - lov type, not write on mandatory fields ', () => {

    ticklerAttributePage.checkButtonEnabled('New', true);

    ticklerAttributePage.checkComponent('tickler-attribute-table', true);
    ticklerAttributePage.checkComponent('new-tickler-attribute', false);

    ticklerAttributePage.onClick('New');

    ticklerAttributePage.checkComponent('new-tickler-attribute', true);

    ticklerAttributePage.checkButtonEnabled('New', false);

    ticklerAttributePage.changeSelectOptions('4: 4');

    ticklerAttributePage.onEvent('focus', 'attributeName');
    ticklerAttributePage.onEvent('blur', 'div.container');

    ticklerAttributePage.checkButtonEnabled('Add', false);


    ticklerAttributePage.onEvent('focus', 'attributeCode');
    ticklerAttributePage.onEvent('blur', 'div.container');

    ticklerAttributePage.checkButtonEnabled('Add', false);
    ticklerAttributePage.checkButtonEnabled('New', false);

  });

  it('Attributes navigation: add tickler attribute - lov type, write on mandatory fields ', () => {

    ticklerAttributePage.checkComponent('tickler-attribute-table', true);
    ticklerAttributePage.checkComponent('new-tickler-attribute', false);

    ticklerAttributePage.checkButtonEnabled('New', true);

    ticklerAttributePage.onClick('New');


    ticklerAttributePage.checkComponent('new-tickler-attribute', true);

    ticklerAttributePage.checkButtonEnabled('New', false);

    ticklerAttributePage.changeSelectOptions('4: 4');

    ticklerAttributePage.onEvent('focus', 'attributeName');
    ticklerAttributePage.onEvent('blur', 'div.container');

    ticklerAttributePage.checkButtonEnabled('Add', false);

    ticklerAttributePage.writeOnInput('attributeName', 'Attribute name');

    ticklerAttributePage.checkButtonEnabled('Add', false);

    ticklerAttributePage.onEvent('focus', 'attributeCode');
    ticklerAttributePage.onEvent('blur', 'div.container');

    ticklerAttributePage.checkButtonEnabled('Add', false);

    ticklerAttributePage.writeOnInput('attributeCode', 'Attribute code');

    ticklerAttributePage.checkButtonEnabled('Add', true);
    ticklerAttributePage.checkButtonEnabled('New', false);

  });

  it('Attributes navigation: add tickler attribute - ADD ', () => {

    ticklerAttributePage.checkComponent('tickler-attribute-table', true);
    ticklerAttributePage.checkComponent('new-tickler-attribute', false);

    ticklerAttributePage.checkButtonEnabled('New', true);

    ticklerAttributePage.onClick('New');


    ticklerAttributePage.checkComponent('new-tickler-attribute', true);

    ticklerAttributePage.checkButtonEnabled('New', false);

    ticklerAttributePage.writeOnInput('attributeName', 'Attribute name');
    ticklerAttributePage.writeOnInput('attributeCode', 'Attribute code');

    ticklerAttributePage.checkButtonEnabled('Add', true);
    ticklerAttributePage.checkButtonEnabled('New', false);

    ticklerAttributePage.onClick('Add');

    ticklerAttributePage.checkNotification(true, 'Tickler attribute added');

    ticklerAttributePage.checkComponent('tickler-attribute-table', true);
    ticklerAttributePage.checkComponent('new-tickler-attribute', false);

  });

  it('Attributes navigation: add tickler attribute - CANCEL ', () => {

    ticklerAttributePage.checkComponent('tickler-attribute-table', true);
    ticklerAttributePage.checkComponent('new-tickler-attribute', false);

    ticklerAttributePage.checkButtonEnabled('New', true);

    ticklerAttributePage.onClick('New');


    ticklerAttributePage.checkComponent('new-tickler-attribute', true);

    ticklerAttributePage.checkButtonEnabled('New', false);

    ticklerAttributePage.writeOnInput('attributeName', 'Attribute name');
    ticklerAttributePage.writeOnInput('attributeCode', 'Attribute code');

    ticklerAttributePage.checkButtonEnabled('Add', true);
    ticklerAttributePage.checkButtonEnabled('New', false);

    ticklerAttributePage.onClick('Cancel');

    ticklerAttributePage.checkNotification(false);

    ticklerAttributePage.checkComponent('tickler-attribute-table', true);
    ticklerAttributePage.checkComponent('new-tickler-attribute', false);

  });

  it('Attributes navigation: edit - same data', () => {

    ticklerAttributePage.checkComponent('tickler-attribute-table', true);
    ticklerAttributePage.checkComponent('new-tickler-attribute', false);

    ticklerAttributePage.checkButtonEnabled('New', true);

    ticklerAttributePage.onClick('', 'i','edit fas fa-edit');

    ticklerAttributePage.checkForm(['TEST2', 'Test2'], ['0: 0'], ['true', null], 'test');

  });

  it('Attributes navigation: edit - SAVE', () => {

    ticklerAttributePage.checkComponent('tickler-attribute-table', true);
    ticklerAttributePage.checkComponent('new-tickler-attribute', false);

    ticklerAttributePage.checkButtonEnabled('New', true);

    ticklerAttributePage.onClick('', 'i','edit fas fa-edit');

    ticklerAttributePage.checkForm(['TEST2', 'Test2'], ['0: 0'], ['true', null], 'test');

    ticklerAttributePage.onClick('Save');

    ticklerAttributePage.checkNotification(true, 'Tickler attribute updated');

  });

  it('Attributes navigation: edit - CANCEL', () => {

    ticklerAttributePage.checkComponent('tickler-attribute-table', true);
    ticklerAttributePage.checkComponent('new-tickler-attribute', false);

    ticklerAttributePage.checkButtonEnabled('New', true);

    ticklerAttributePage.onClick('', 'i','edit fas fa-edit');

    ticklerAttributePage.checkForm(['TEST2', 'Test2'], ['0: 0'], ['true', null], 'test');

    ticklerAttributePage.onClick('Cancel');

    ticklerAttributePage.checkNotification(false);




  });





});
