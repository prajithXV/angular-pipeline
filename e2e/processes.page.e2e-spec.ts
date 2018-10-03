import {LoginPage} from "./login.page";
import {ProcessesPage} from "./processes.page";
import {NavPage} from "./nav.page";
import {browser, protractor} from "protractor";

describe('inspinia App', () => {
  let loginPage: LoginPage;
  let processesPage: ProcessesPage;
  let navPage: NavPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    processesPage = new ProcessesPage();
    navPage = new NavPage();
    loginPage.enterToMainPage();
    navPage.onClickBar('#admin li', 'Processes');

  });


  it('Processes navigation: loaded data', () => {

    processesPage.checkTablesData(['','1', 'SPOC', 'SPOC name', 'vsharapo', '03/15/2018'],'tickler-process-table', 0 );
    processesPage.checkTablesData(['','2', 'SPAC', 'SPAC name', 'vsharapo', '03/15/2018'],'tickler-process-table', 1 );
    processesPage.checkTablesData(['','3', 'SPUC', 'SPUC name', 'vsharapo', '03/15/2018'],'tickler-process-table', 2 );
    processesPage.checkTablesData(['','4', 'SPIC', 'SPIC name', 'vsharapo', '03/15/2018'],'tickler-process-table', 3 );
    processesPage.checkTablesData(['','5', 'SPEC', 'SPEC name', 'vsharapo', '03/15/2018'],'tickler-process-table', 4 );
    processesPage.checkTablesData(['','6', 'EXTENSION', 'EXTENSION name', 'vsharapo', '03/15/2018'],'tickler-process-table', 5 );

  });

  it('Processes navigation: tickler types', () => {

    processesPage.checkTablesData(['','1', 'SPOC', 'SPOC name', 'vsharapo', '03/15/2018'],'tickler-process-table', 0 );
    processesPage.checkTablesData(['','2', 'SPAC', 'SPAC name', 'vsharapo', '03/15/2018'],'tickler-process-table', 1 );
    processesPage.checkTablesData(['','3', 'SPUC', 'SPUC name', 'vsharapo', '03/15/2018'],'tickler-process-table', 2 );
    processesPage.checkTablesData(['','4', 'SPIC', 'SPIC name', 'vsharapo', '03/15/2018'],'tickler-process-table', 3 );
    processesPage.checkTablesData(['','5', 'SPEC', 'SPEC name', 'vsharapo', '03/15/2018'],'tickler-process-table', 4 );
    processesPage.checkTablesData(['','6', 'EXTENSION', 'EXTENSION name', 'vsharapo', '03/15/2018'],'tickler-process-table', 5 );

    processesPage.selectProcess('2');

    processesPage.checkTablesData(['2', 'SPOC CONTACT WITH CUSTOMER', 'SPOC contact with customer','','1','0', '', '', '', '', '', 'vsharapo',
      '04/21/2018', '', '' ],'tickler-types-table', 0, true );

    processesPage.checkTablesData(['3', 'LOSS MIT PKG SENT', 'Loss mitigation package sent','','2','5', '', '', '', '', '', 'vsharapo',
      '03/21/2018', '', '' ],'tickler-types-table', 1, false );

    processesPage.checkTablesData(['4', 'LOSS MIT PKG REC COMPLETE', 'loss mit pkg rec complete','','3','2', '', '', '', '', '', 'vsharapo',
      '03/21/2018', '', '' ],'tickler-types-table', 2, true );

    processesPage.checkTablesData(['5', 'LOSS MIT PKG INCOMPLETE', 'loss mit pkg incomplete','','4','3', '', '', '', '', '', 'vsharapo',
      '03/21/2018', '', '' ],'tickler-types-table', 3, true );

    processesPage.checkTablesData(['6', 'LOSS MIT PKG INFO RECEIVED', 'loss mit pkg info received','','5','3', '', '', '', '', '', 'vsharapo',
      '03/21/2018', '', '' ],'tickler-types-table', 4, true );

    processesPage.checkTablesData(['7', 'TEST', 'test','test','6','2', '', '', '', '', '', 'vsharapo',
      '03/28/2018', '', '' ],'tickler-types-table', 5, false );

    processesPage.checkTablesData(['8', 'TEST2', 'test2','test','7','2', '', '', '', '', '', 'vsharapo',
      '03/28/2018', '', '' ],'tickler-types-table', 6, false );

    processesPage.checkTablesData(['9', 'TEST3', 'test3','test','8','2', '', '', '', '', '', 'vsharapo',
      '03/28/2018', '', '' ],'tickler-types-table', 7, false );

  });


  it('Processes navigation: new tickler type not mandatory fields', () => {

    processesPage.selectProcess('2');
    processesPage.checkButtonEnabled('New', true);

    processesPage.onClick('New');

    processesPage.checkButtonEnabled('New', false);

    processesPage.onEvent('focus', 'ticklerCode');
    processesPage.onEvent('blur', 'div.table');

    processesPage.checkButtonEnabled('Add', false);

    processesPage.onEvent('focus', 'ticklerName');
    processesPage.onEvent('blur', 'div.table');

    processesPage.checkButtonEnabled('Add', false);

  });


  it('Processes navigation: new tickler type mandatory fields', () => {

    processesPage.selectProcess('2');
    processesPage.checkButtonEnabled('New', true);

    processesPage.onClick('New');

    processesPage.checkButtonEnabled('New', false);

    processesPage.onEvent('focus', 'ticklerCode');
    processesPage.onEvent('blur', 'div.table');

    processesPage.writeOnInput('ticklerCode', 'Tickler code');

    processesPage.checkButtonEnabled('Add', false);

    processesPage.onEvent('focus', 'ticklerName');
    processesPage.onEvent('blur', 'div.table');

    processesPage.writeOnInput('ticklerName', 'Tickler name');

    processesPage.checkButtonEnabled('Add', true);

  });

  it('Processes navigation: new tickler type (ADD)', () => {

    processesPage.selectProcess('2');
    processesPage.checkButtonEnabled('New', true);

    processesPage.onClick('New');

    processesPage.checkButtonEnabled('New', false);

    processesPage.onEvent('focus', 'ticklerCode');
    processesPage.onEvent('blur', 'div.table');

    processesPage.writeOnInput('ticklerCode', 'Tickler code');

    processesPage.checkButtonEnabled('Add', false);

    processesPage.onEvent('focus', 'ticklerName');
    processesPage.onEvent('blur', 'div.table');

    processesPage.writeOnInput('ticklerName', 'Tickler name');

    processesPage.checkButtonEnabled('Add', true);

    processesPage.onClick('Add');

    processesPage.checkNotification(true, 'Tickler type added');
    processesPage.checkButtonEnabled('New', true);

  });

  it('Processes navigation: edit (general)', () => {

    processesPage.selectProcess('2');


    processesPage.onClick('', 1, 'i', 'edit fas fa-edit');

    processesPage.checkForm(['LOSS MIT PKG SENT', 'Loss mitigation package sent', '2', '5' ], ["0: Object", "0: Object"],
      [null, 'true', null, 'true', null], ['']);

    });

  it('Processes navigation: edit (general - SAVE)', () => {

    processesPage.selectProcess('2');


    processesPage.onClick('', 1, 'i', 'edit fas fa-edit');

    processesPage.checkForm(['LOSS MIT PKG SENT', 'Loss mitigation package sent', '2', '5' ], ["0: Object", "0: Object"],
      [null, 'true', null, 'true', null], ['']);

    processesPage.onClick('Save');

    processesPage.checkNotification(true, 'Tickler type updated');

  });

  it('Processes navigation: edit (general - CANCEL)', () => {

    processesPage.selectProcess('2');


    processesPage.onClick('', 1, 'i', 'edit fas fa-edit');

    processesPage.checkForm(['LOSS MIT PKG SENT', 'Loss mitigation package sent', '2', '5' ], ["0: Object", "0: Object"],
      [null, 'true', null, 'true', null], ['']);

    processesPage.onClick('Cancel');

    processesPage.checkNotification(false);

  });

  it('Processes navigation: tickler type delete (DELETE)', () => {

    processesPage.selectProcess('2');


    processesPage.onClick('', 1, 'i', 'trash fas fa-trash-alt ng-star-inserted');

    processesPage.checkModal(true);

    processesPage.onClick('Delete');

    processesPage.checkNotification(true, 'Tickler type removed');
    processesPage.checkModal(false);

  });

  it('Processes navigation: tickler type delete (CANCEL)', () => {

    processesPage.selectProcess('2');


    processesPage.onClick('', 1, 'i', 'trash fas fa-trash-alt ng-star-inserted');

    processesPage.checkModal(true);

    processesPage.onClick('Cancel');

    processesPage.checkNotification(false);
    processesPage.checkModal(false);

  });

  it('Processes navigation: change mandatory attribute', () => {

    let EC = protractor.ExpectedConditions;

    processesPage.selectProcess('2');

    processesPage.onClick('', 1, 'i', 'edit fas fa-edit');

    processesPage.checkButtonClass('fa fa-times text-danger', 1);

    processesPage.onClick('', 1, 'i', 'fa fa-times text-danger');

    browser.wait(EC.visibilityOf(processesPage.getButton('', 1,'i', 'fa fa-check text-info')));

    processesPage.checkButtonClass('fa fa-check text-info', 1);

  });

  it('Processes navigation: delete attribute', () => {

    processesPage.selectProcess('2');

    processesPage.onClick('', 1, 'i', 'edit fas fa-edit');
    processesPage.onClick('', 2, 'i', 'fas fa-trash-alt pull-right');
    processesPage.checkNotification(true, 'Tickler attribute map deleted');

  });

  it('Processes navigation: add attribute', () => {

    processesPage.selectProcess('2');

    processesPage.onClick('', 1, 'i', 'edit fas fa-edit');
    processesPage.onClick('', 0, 'i', 'green fas fa-plus-circle pull-right ng-star-inserted');
    processesPage.checkNotification(true, 'Tickler attribute map added');

  });

  it('Processes navigation: add map', () => {

    processesPage.selectProcess('2');

    processesPage.onClick('', 1, 'i', 'edit fas fa-edit');
    processesPage.onClick('', 1, 'i', 'green fas fa-plus-circle pull-right ng-star-inserted');
    processesPage.checkNotification(true, 'Tickler type map added');
  });


  it('Processes navigation: delete map', () => {

    processesPage.selectProcess('2');

    processesPage.onClick('', 1, 'i', 'edit fas fa-edit');
    processesPage.onClick('', 7, 'i', 'fas fa-trash-alt pull-right');
    processesPage.checkNotification(true, 'Tickler type map deleted');

  });


});
