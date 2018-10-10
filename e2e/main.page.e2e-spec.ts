import {LoginPage} from './login.page';
import {MainPage} from "./main.page";

fdescribe('inspinia App', () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    mainPage = new MainPage();
    loginPage.enterToMainPage();
  });

  it('Next call navigation', () => {

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);

    mainPage.checkForm(["", "", ""], ["DIRECT", "0: null"] );

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);

    mainPage.onClick('Next call');
    mainPage.checkBackToListButton("Back to list", false);
    mainPage.checkCurrentUrl('/#/app/account/');
    mainPage.returnToMain();
    mainPage.checkCurrentUrl('/#/app/main');

    mainPage.checkForm(["", "", ""], ["DIRECT", "0: null"] );

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);


    // browser.enterRepl();

  //todo: comprobar vacio, no resultados, primera pestaña
  });

  it('View CL campaign processing navigation: Back to list', () => {

    //check tab selected
    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);

    //click view cl
    mainPage.onClick('View CL');


    //check visible components
    mainPage.checkComponent('campaign-list-accounts-table', true);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);


    mainPage.checkTablesData(["WAA1486","6900551729", "John S.", "vsharapo", "12/20/2017 04:40 AM", "04/20/2010","00/00/0000","73","P", "Go", ""], 'campaign-list-accounts-table',0);
    mainPage.checkTablesData(["S309051","6900554178", "Hayden C.", "", "01/01/2017 01:30 AM", "10/27/2017","00/00/0000","20","P",  "Go", ""], 'campaign-list-accounts-table',1);
    mainPage.checkTablesData(["SAF5712", "6900198695"	, "Harrison F."	,"", "", "10/27/2017",	"00/00/0000", "15", "P", "Go", ""], 'campaign-list-accounts-table',2);
    mainPage.checkTablesData(["PAF1497", "6900193811", "Edward C.",	"" ,"", "11/17/2017", "05/20/2012"	,"18","P",  "Go", ""], 'campaign-list-accounts-table',3);
    mainPage.checkTablesData(["HAG1587",	"6900046001", "Joe M."	, "", "", "08/14/2017",	"00/00/0000",	"68","P", "Go", ""], 'campaign-list-accounts-table',4);
    mainPage.checkTablesData(["TAK0188", "6900483022", "Keanu R." ,"", "", "11/24/2017",	"00/00/0000"	,"13","P", "Go", ""], 'campaign-list-accounts-table',5);
    mainPage.checkTablesData(["WCB4013", "6900399251", "Kate W." ,"",  "", "09/15/2017", "10/20/2011",	"68","P", "Go", ""], 'campaign-list-accounts-table',6);
    mainPage.checkTablesData(["HAD5291",	"6900528164",	"Leo C.", "", "",	"06/20/2011", "00/00/0000",	"32","P", "Go", ""], 'campaign-list-accounts-table',7);
    mainPage.checkTablesData(["D049976",	"6900029585",	"Matthew M.", "", "",	"06/20/2011", "04/20/2012",	"28","P", "Go", ""], 'campaign-list-accounts-table',8);
    mainPage.checkTablesData(["S306953", "6900073021",	"Sarah M.", "", "",	"11/22/2017", "00/00/0000",	"18","P", "Go", ""], 'campaign-list-accounts-table',9);
    mainPage.checkTablesData(["PAD5095",	"6900087955",	"Alyson H.", "", "",	"12/20/2007",	"00/00/0000", "85","P", "Go", ""], 'campaign-list-accounts-table',10);
    mainPage.checkTablesData(["WAI1529",	"6900393817", "James M.", "", "",	"11/16/2017",	"08/20/2012",	"27","P", "Go", ""], 'campaign-list-accounts-table',11);
    mainPage.checkTablesData(["TAK0639", "6900523470", "David B.", "", "", "11/28/2017", "00/00/0000", "11","P", "Go", ""], 'campaign-list-accounts-table',12);
    mainPage.checkTablesData(["FAE5385", "6900140408", "Michael F.", "", "",	"10/19/2017",	"00/00/0000", "42","P", "Go", ""], 'campaign-list-accounts-table',13);
    mainPage.checkTablesData(["AAA1992", "6900119782", "Tom H.", "", "", "10/20/2017",	"00/00/0000",	"14","P", "Go", ""], 'campaign-list-accounts-table',14);
    mainPage.checkTablesData(["TAE0943",	"6900233302",	"Robert D.", "", "", "07/17/2017", "00/00/0000", "23","P", "Go", ""], 'campaign-list-accounts-table',15);
    mainPage.checkTablesData(["BAH3450",	"6900491694",	"Scarlet J.",	"", "",	"10/19/2017", "00/00/0000",	"20","P", "Go", ""], 'campaign-list-accounts-table',16);
    mainPage.checkTablesData(["TAJ5531", "6900254043", "Mark R.", "", "",	"10/26/2017",	"00/00/0000",	"23","P", "Go", ""], 'campaign-list-accounts-table',17);
    mainPage.checkTablesData(["ACB6087",	"6903044631",	"Jeff G.", "", "", "10/18/2017", "07/20/2012", "20","P", "Go", ""], 'campaign-list-accounts-table',18);
    mainPage.checkTablesData(["ZAD1242",	"6900046126",	"Samuel L.", "", "",	"03/20/2011",	"00/00/0000",	"10","P", "Go", ""], 'campaign-list-accounts-table',19);


    //click Go button
    mainPage.onClick('Go');

    //check back to list and url
    mainPage.checkBackToListButton("Back to list", true);
    mainPage.checkCurrentUrl('/#/app/account/');

    //click back to list and check url
    mainPage.onClick('Back to list');
    mainPage.checkCurrentUrl('/#/app/main');

    //check visible components
    mainPage.checkComponent('campaign-list-accounts-table', true);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);

  });


  it('View CL campaign processing navigation: Main menu', () => {
    //check tab selected
    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);

    //click view cl
    mainPage.onClick('View CL');

    //check visible components
    mainPage.checkComponent('campaign-list-accounts-table', true);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);


    mainPage.checkTablesData(["WAA1486","6900551729", "John S.", "vsharapo", "12/20/2017 04:40 AM", "04/20/2010","00/00/0000","73","P", "Go", ""], 'campaign-list-accounts-table',0);
    mainPage.checkTablesData(["S309051","6900554178", "Hayden C.", "", "01/01/2017 01:30 AM", "10/27/2017","00/00/0000","20","P",  "Go", ""], 'campaign-list-accounts-table',1);
    mainPage.checkTablesData(["SAF5712", "6900198695"	, "Harrison F."	,"", "", "10/27/2017",	"00/00/0000", "15", "P", "Go", ""], 'campaign-list-accounts-table',2);
    mainPage.checkTablesData(["PAF1497", "6900193811", "Edward C.",	"" ,"", "11/17/2017", "05/20/2012"	,"18","P",  "Go", ""], 'campaign-list-accounts-table',3);
    mainPage.checkTablesData(["HAG1587",	"6900046001", "Joe M."	, "", "", "08/14/2017",	"00/00/0000",	"68","P", "Go", ""], 'campaign-list-accounts-table',4);
    mainPage.checkTablesData(["TAK0188", "6900483022", "Keanu R." ,"", "", "11/24/2017",	"00/00/0000"	,"13","P", "Go", ""], 'campaign-list-accounts-table',5);
    mainPage.checkTablesData(["WCB4013", "6900399251", "Kate W." ,"",  "", "09/15/2017", "10/20/2011",	"68","P", "Go", ""], 'campaign-list-accounts-table',6);
    mainPage.checkTablesData(["HAD5291",	"6900528164",	"Leo C.", "", "",	"06/20/2011", "00/00/0000",	"32","P", "Go", ""], 'campaign-list-accounts-table',7);
    mainPage.checkTablesData(["D049976",	"6900029585",	"Matthew M.", "", "",	"06/20/2011", "04/20/2012",	"28","P", "Go", ""], 'campaign-list-accounts-table',8);
    mainPage.checkTablesData(["S306953", "6900073021",	"Sarah M.", "", "",	"11/22/2017", "00/00/0000",	"18","P", "Go", ""], 'campaign-list-accounts-table',9);
    mainPage.checkTablesData(["PAD5095",	"6900087955",	"Alyson H.", "", "",	"12/20/2007",	"00/00/0000", "85","P", "Go", ""], 'campaign-list-accounts-table',10);
    mainPage.checkTablesData(["WAI1529",	"6900393817", "James M.", "", "",	"11/16/2017",	"08/20/2012",	"27","P", "Go", ""], 'campaign-list-accounts-table',11);
    mainPage.checkTablesData(["TAK0639", "6900523470", "David B.", "", "", "11/28/2017", "00/00/0000", "11","P", "Go", ""], 'campaign-list-accounts-table',12);
    mainPage.checkTablesData(["FAE5385", "6900140408", "Michael F.", "", "",	"10/19/2017",	"00/00/0000", "42","P", "Go", ""], 'campaign-list-accounts-table',13);
    mainPage.checkTablesData(["AAA1992", "6900119782", "Tom H.", "", "", "10/20/2017",	"00/00/0000",	"14","P", "Go", ""], 'campaign-list-accounts-table',14);
    mainPage.checkTablesData(["TAE0943",	"6900233302",	"Robert D.", "", "", "07/17/2017", "00/00/0000", "23","P", "Go", ""], 'campaign-list-accounts-table',15);
    mainPage.checkTablesData(["BAH3450",	"6900491694",	"Scarlet J.",	"", "",	"10/19/2017", "00/00/0000",	"20","P", "Go", ""], 'campaign-list-accounts-table',16);
    mainPage.checkTablesData(["TAJ5531", "6900254043", "Mark R.", "", "",	"10/26/2017",	"00/00/0000",	"23","P", "Go", ""], 'campaign-list-accounts-table',17);
    mainPage.checkTablesData(["ACB6087",	"6903044631",	"Jeff G.", "", "", "10/18/2017", "07/20/2012", "20","P", "Go", ""], 'campaign-list-accounts-table',18);
    mainPage.checkTablesData(["ZAD1242",	"6900046126",	"Samuel L.", "", "",	"03/20/2011",	"00/00/0000",	"10","P", "Go", ""], 'campaign-list-accounts-table',19);
    //click Go button
    mainPage.onClick('Go');

    //check back to list and url
    mainPage.checkBackToListButton("Back to list", true);
    mainPage.checkCurrentUrl('/#/app/account/');

    mainPage.returnToMain();
    mainPage.checkBackToListButton("Back to list", false);
    mainPage.checkCurrentUrl('/#/app/main');


    //check tabs
    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);

    //check visible components
    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);


  });


  it('View CL campaign processing navigation: toggle filter', () => {


    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);

    //default
    mainPage.checkToggleFilter('#campaignFilter', true);
    mainPage.checkToggleFilter('#search-params', false);
    mainPage.checkToggleFilter('#collapseFilter', false);



    //click view cl
    mainPage.onClick('View CL');

    mainPage.checkToggleFilter('#search-params', true);
    mainPage.checkToggleFilter('#campaignFilter', false);
    mainPage.checkToggleFilter('#collapseFilter', false);

    mainPage.onCollapseFilter('#search-params');

    mainPage.checkToggleFilter('#collapseFilter', true);
    mainPage.checkToggleFilter('#campaignFilter', true);
    mainPage.checkToggleFilter('#search-params', false);


    mainPage.onCollapseFilter('#collapseFilter');
    mainPage.checkToggleFilter('#search-params', true);
    mainPage.checkToggleFilter('#campaignFilter', false);
    mainPage.checkToggleFilter('#collapseFilter', false);

  });

  it('Account search navigation', () => {

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');


    mainPage.onClickTab('#accountSearch');

    mainPage.checkForm(["", "", "", ""], ["0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', true);
    mainPage.checkTab('#ticklerProcesses', false);

    mainPage.writeOnInput('taxId', 'SSN');

    mainPage.onClick('Search');

    mainPage.checkBackToListButton("Back to list", false);
    mainPage.checkCurrentUrl('/app/main');


    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', true);
    mainPage.checkComponent('accounts-table', true);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);

  });

  it('Account search navigation: back to list', () => {

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#accountSearch');

    mainPage.checkForm(["", "", "", ""], ["0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', true);
    mainPage.checkTab('#ticklerProcesses', false);

    mainPage.writeOnInput('taxId', 'SSN');

    mainPage.onClick('Search');

    //check
    mainPage.checkTablesData(['',"ABC1234",	"777778888",	"LUFFY D"	,"7703 SKYPIEA SK, 706154826, HYRULE, HY"], 'customer-summary',0);

    mainPage.checkTablesData(['1116',	'D', '$1,229,910.22',	'Dormant', 'Joint',	'MM',	'Money Market Account', 'Go', ''], 'accounts-table', 0);
    mainPage.checkTablesData(['1123461',	'D',	'-$113,047.44',	'Dormant',	'Primary',	'N1',	'NOW Account', 'Go', ''], 'accounts-table', 1);
    mainPage.checkTablesData(['9879879858',	'D',	'$0.00',	'Active',	'Primary',	'CC', 'Personal Checking Account', 'Go', ''], 'accounts-table', 2);
    mainPage.checkTablesData(['1423',	'L',	'$142,943.00',	'Matured',	'Primary',	'02',	'Commercial Loan', 'Go', ''], 'accounts-table', 3);

    mainPage.onClick('Go');

    mainPage.checkBackToListButton("Back to list", true);
    mainPage.checkCurrentUrl('/app/account');

    mainPage.onClick('Back to list');
    mainPage.checkCurrentUrl('/#/app/main');

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', true);
    mainPage.checkTab('#ticklerProcesses', false);

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', true);
    mainPage.checkComponent('accounts-table', true);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);

  });


  it('Account search navigation: Main menu', () => {

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#accountSearch');

    mainPage.checkForm(["", "", "", ""], ["0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', true);
    mainPage.checkTab('#ticklerProcesses', false);

    mainPage.writeOnInput('taxId', 'SSN');

    mainPage.onClick('Search');

    //check
    mainPage.checkTablesData(['',"ABC1234",	"777778888",	"LUFFY D"	,"7703 SKYPIEA SK, 706154826, HYRULE, HY"], 'customer-summary',0);

    mainPage.checkTablesData(['1116',	'D', '$1,229,910.22',	'Dormant', 'Joint',	'MM',	'Money Market Account', 'Go', ''], 'accounts-table', 0);
    mainPage.checkTablesData(['1123461',	'D',	'-$113,047.44',	'Dormant',	'Primary',	'N1',	'NOW Account', 'Go', ''], 'accounts-table', 1);
    mainPage.checkTablesData(['9879879858',	'D',	'$0.00',	'Active',	'Primary',	'CC', 'Personal Checking Account', 'Go', ''], 'accounts-table', 2);
    mainPage.checkTablesData(['1423',	'L',	'$142,943.00',	'Matured',	'Primary',	'02',	'Commercial Loan', 'Go', ''], 'accounts-table', 3);

    mainPage.onClick('Go');

    mainPage.checkBackToListButton("Back to list", true);
    mainPage.checkCurrentUrl('/app/account');

    mainPage.returnToMain();

    mainPage.checkCurrentUrl('/app/main');

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);




  });


  it('Account search navigation: create case - modal visible', () => {

    mainPage.onClickTab('#accountSearch');

    mainPage.writeOnInput('taxId', 'SSN');

    mainPage.onClick('Search');

    mainPage.onCreateCase( "accounts-table");
    mainPage.checkModal(true);

  });


  it('Account search navigation: create case - Save', () => {

    mainPage.onClickTab('#accountSearch');

    mainPage.writeOnInput('taxId', 'SSN');

    mainPage.onClick('Search');

    mainPage.onCreateCase( "accounts-table");
    mainPage.checkModal(true);
    mainPage.onModalOptions('Save');

    mainPage.checkNotification(true, 'Process case created');

  });


  it('Account search navigation: create case - Cancel', () => {

    mainPage.onClickTab('#accountSearch');

    mainPage.writeOnInput('taxId', 'SSN');

    mainPage.onClick('Search');

    mainPage.onCreateCase( "accounts-table");
    mainPage.checkModal(true);
    mainPage.onModalOptions('Cancel');
    mainPage.checkNotification(false, '');

    mainPage.checkTab('#accountSearch', true);
    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#ticklerProcesses', false);

    mainPage.checkToggleFilter('collapseFilter2', false);
    mainPage.checkToggleFilter('#search-params', true);

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', true);
    mainPage.checkComponent('accounts-table', true);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);

  });



  it('Account search navigation: create case - "X"', () => {

    mainPage.onClickTab('#accountSearch');

    mainPage.writeOnInput('taxId', 'SSN');

    mainPage.onClick('Search');

    mainPage.onCreateCase( "accounts-table");
    mainPage.checkModal(true);
    mainPage.onModalOptions('×');
    mainPage.checkNotification(false, '');

    mainPage.checkTab('#accountSearch', true);
    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#ticklerProcesses', false);

    mainPage.checkToggleFilter('collapseFilter2', false);
    mainPage.checkToggleFilter('#search-params', true);

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', true);
    mainPage.checkComponent('accounts-table', true);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);

  });


  it('Account search navigation: toggle filter', () => {

    //tabs
    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);

    mainPage.onClickTab('#accountSearch');

    mainPage.writeOnInput('taxId', 'SSN');

    mainPage.onClick('Search');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', true);
    mainPage.checkComponent('accounts-table', true);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);

    mainPage.checkToggleFilter('collapseFilter2', false);
    mainPage.checkToggleFilter('#search-params', true);

    mainPage.onCollapseFilter('#search-params');

    mainPage.checkToggleFilter('#search-params', false);
    mainPage.checkToggleFilter('#collapseFilter2', true);


    mainPage.checkForm(['SSN', "", "", "", ], ["0: null", "0: null"]);

  });

  it('Tickler processes navigation: Main menu', () => {

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.checkForm(["", "", "", ""], ['0: null', "0: null", "0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.writeOnInput('accountId', '77777');
    mainPage.writeOnInput('assignedUser', 'user1');
    mainPage.changeSelectOptions('1: SPOC');

    mainPage.onClick('Search');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

    mainPage.checkTablesData(["", "16", "6300104605", "D", "JAA1223", "FirstN LastN", "SPOC contact with customer", "eNavarre", "sdfgsdfg", "SPOC", "NEW", "vsharapo", "03/23/2018", "03/27/2018", "Go"], 'tickler-cases-table', 0 );
    mainPage.checkTablesData(["", "17", "6300104605", "L", "JAA1223", "FirstN LastN", "SPOC contact with customer", "eNavarre", "sdfgsdfg", "SPOC", "NEW", "vsharapo", "03/23/2018", "03/27/2018", "Go"], 'tickler-cases-table', 1 );
    mainPage.checkTablesData(["", "18", "6300104605", "L", "JAA1223", "FirstN LastN", "SPOC contact with customer", "eNavarre", "sdfgsdfg", "SPOC", "CLOSED", "vsharapo", "03/23/2018", "03/27/2018", "Go"], 'tickler-cases-table', 2 );

    mainPage.onClick('Go');
    mainPage.checkCurrentUrl('/process/case/16/D');

    mainPage.returnToMain();

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('app/main');

  });

  it('Tickler processes navigation: Back to list', () => {

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.checkForm(["", "", "", ""], ['0: null', "0: null", "0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.writeOnInput('accountId', '77777');
    mainPage.writeOnInput('assignedUser', 'user1');
    mainPage.changeSelectOptions('1: SPOC');


    mainPage.onClick('Search');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

    mainPage.checkTablesData(["", "16", "6300104605", "D", "JAA1223", "FirstN LastN", "SPOC contact with customer", "eNavarre", "sdfgsdfg", "SPOC", "NEW", "vsharapo", "03/23/2018", "03/27/2018", "Go"], 'tickler-cases-table', 0 );
    mainPage.checkTablesData(["", "17", "6300104605", "L", "JAA1223", "FirstN LastN", "SPOC contact with customer", "eNavarre", "sdfgsdfg", "SPOC", "NEW", "vsharapo", "03/23/2018", "03/27/2018", "Go"], 'tickler-cases-table', 1 );
    mainPage.checkTablesData(["", "18", "6300104605", "L", "JAA1223", "FirstN LastN", "SPOC contact with customer", "eNavarre", "sdfgsdfg", "SPOC", "CLOSED", "vsharapo", "03/23/2018", "03/27/2018", "Go"], 'tickler-cases-table', 2 );


    mainPage.checkTablesData([], 'process-case-tickler-table', null,'Select a process case.');

    mainPage.onClick('Go');
    mainPage.checkCurrentUrl('/process/case/16');

    mainPage.onClick('Back to list');

    mainPage.checkCurrentUrl('/app/main');

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

    mainPage.checkTablesData(["", "16", "6300104605", "D", "JAA1223", "FirstN LastN", "SPOC contact with customer", "eNavarre", "sdfgsdfg", "SPOC", "NEW", "vsharapo", "03/23/2018", "03/27/2018", "Go"], 'tickler-cases-table', 0 );
    mainPage.checkTablesData(["", "17", "6300104605", "L", "JAA1223", "FirstN LastN", "SPOC contact with customer", "eNavarre", "sdfgsdfg", "SPOC", "NEW", "vsharapo", "03/23/2018", "03/27/2018", "Go"], 'tickler-cases-table', 1 );
    mainPage.checkTablesData(["", "18", "6300104605", "L", "JAA1223", "FirstN LastN", "SPOC contact with customer", "eNavarre", "sdfgsdfg", "SPOC", "CLOSED", "vsharapo", "03/23/2018", "03/27/2018", "Go"], 'tickler-cases-table', 2 );

    mainPage.checkToggleFilter('#search-params', true);

  });


  it('Tickler processes navigation: process case selected', () => {

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.checkForm(["", "", "", ""], ['0: null', "0: null", "0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.writeOnInput('accountId', '77777');
    mainPage.writeOnInput('assignedUser', 'user1');
    mainPage.changeSelectOptions('1: SPOC');


    mainPage.onClick('Search');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

    mainPage.checkTablesData(["", "16", "6300104605", "D", "JAA1223", "FirstN LastN", "SPOC contact with customer", "eNavarre", "sdfgsdfg", "SPOC", "NEW", "vsharapo", "03/23/2018", "03/27/2018", "Go"], 'tickler-cases-table', 0 );
    mainPage.checkTablesData(["", "17", "6300104605", "L", "JAA1223", "FirstN LastN", "SPOC contact with customer", "eNavarre", "sdfgsdfg", "SPOC", "NEW", "vsharapo", "03/23/2018", "03/27/2018", "Go"], 'tickler-cases-table', 1 );
    mainPage.checkTablesData(["", "18", "6300104605", "L", "JAA1223", "FirstN LastN", "SPOC contact with customer", "eNavarre", "sdfgsdfg", "SPOC", "CLOSED", "vsharapo", "03/23/2018", "03/27/2018", "Go"], 'tickler-cases-table', 2 );

    mainPage.selectProcessCase('16');

    mainPage.checkTablesData(['1', 'SPOC contact with customer', 'test','vsharapo', '04/19/2018 04:24 PM', '', ''],'process-case-tickler-table', 0);
    mainPage.checkTablesData(['5', 'loss mit pkg info received', 'test','vsharapo', '04/12/2018 04:24 PM', '', ''],'process-case-tickler-table', 1);
    mainPage.checkTablesData(['6', 'test', 'test','vsharapo', '03/19/2018 04:24 PM', '', ''],'process-case-tickler-table', 2);
    mainPage.checkTablesData(['2', 'Loss mitigation package sent', 'test','vsharapo', '02/19/2018 04:24 PM', '', ''],'process-case-tickler-table', 3);
    mainPage.checkTablesData(['3', 'loss mit pkg rec complete', 'test','vsharapo', '01/19/2018 04:24 PM', '', ''],'process-case-tickler-table', 4);
    mainPage.checkTablesData(['4', 'loss mit pkg incomplete', 'test','vsharapo', '12/19/2017 04:24 PM', '', ''],'process-case-tickler-table', 5);

  });

  it('Tickler processes navigation: process case selected - CLOSED status', () => {


    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.checkForm(["", "", "", ""], ['0: null', "0: null", "0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.writeOnInput('accountId', '77777');
    mainPage.writeOnInput('assignedUser', 'user1');
    mainPage.changeSelectOptions('1: SPOC');


    mainPage.onClick('Search');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

    mainPage.selectProcessCase('18');

    mainPage.checkButtonEnabled('New', false);
    mainPage.onClick('New');

    mainPage.checkComponent('new-tickler-case', false);

  });


  it('Tickler processes navigation: process case selected - not CLOSED status', () => {


    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.checkForm(["", "", "", ""], ['0: null', "0: null", "0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.writeOnInput('accountId', '77777');
    mainPage.writeOnInput('assignedUser', 'user1');
    mainPage.changeSelectOptions('1: SPOC');

    mainPage.onClick('Search');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

    mainPage.selectProcessCase('17');

    mainPage.checkButtonEnabled('New', true);
    mainPage.onClick('New');

    mainPage.checkComponent('new-tickler-case', true);
    mainPage.checkButtonEnabled('New', false);

  });


  it('Tickler processes navigation: new tickler case: correct mandatory fields', () => {


    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.checkForm(["", "", "", ""], ['0: null', "0: null", "0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.writeOnInput('accountId', '77777');
    mainPage.writeOnInput('assignedUser', 'user1');
    mainPage.changeSelectOptions('1: SPOC');


    mainPage.onClick('Search');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

    mainPage.selectProcessCase('17');

    mainPage.checkButtonEnabled('New', true);
    mainPage.onClick('New');

    mainPage.checkComponent('new-tickler-case', true);
    mainPage.checkButtonEnabled('New', false);
    mainPage.checkButtonEnabled('Add', false);
    mainPage.checkButtonEnabled('', false,'btn btn-white');


    mainPage.changeSelectOptions('1: Object', 'V4.1 code - Value 4.1 name');
    mainPage.writeOnInput('date', '09/20/2018');

    mainPage.checkButtonEnabled('', true,'btn btn-success');

    mainPage.onClick('','btn btn-success');
    mainPage.onClick('','btn btn-success');

    mainPage.checkButtonEnabled('', false,'btn btn-white');


    // mainPage.checkButtonEnabled('Add', true);
    mainPage.onClick('Add');

  });

  it('Tickler processes navigation: new tickler case: not correct mandatory fields', () => {


    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.checkForm(["", "", "", ""], ['0: null', "0: null", "0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.writeOnInput('accountId', '77777');
    mainPage.writeOnInput('assignedUser', 'user1');
    mainPage.changeSelectOptions('1: SPOC');


    mainPage.onClick('Search');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

    mainPage.selectProcessCase('17');

    mainPage.checkButtonEnabled('New', true);
    mainPage.onClick('New');

    mainPage.checkComponent('new-tickler-case', true);
    mainPage.checkButtonEnabled('New', false);
    mainPage.checkButtonEnabled('Add', false);
    mainPage.checkButtonEnabled('', false,'btn btn-white');


    mainPage.changeSelectOptions('1: Object', 'V4.1 code - Value 4.1 name');
    mainPage.writeOnInput('date', '0/20/2018');

    mainPage.onClick('','btn btn-success');
    mainPage.onClick('','btn btn-success');

    mainPage.checkButtonEnabled('', false,'btn btn-danger');
    mainPage.checkButtonEnabled('', false,'btn btn-white');

    mainPage.checkButtonEnabled('Add', false);
    mainPage.onClick('Add');


  });


  it('Tickler processes navigation: new tickler case - Case tickler added (Add)', () => {

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.checkForm(["", "", "", ""], ['0: null', "0: null", "0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.writeOnInput('accountId', '77777');
    mainPage.writeOnInput('assignedUser', 'user1');
    mainPage.changeSelectOptions('1: SPOC');


    mainPage.onClick('Search');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

    mainPage.selectProcessCase('17');

    mainPage.checkButtonEnabled('New', true);
    mainPage.onClick('New');

    mainPage.checkComponent('new-tickler-case', true);
    mainPage.checkButtonEnabled('New', false);
    mainPage.checkButtonEnabled('Add', false);
    mainPage.checkButtonEnabled('', false,'btn btn-white');


    mainPage.changeSelectOptions('1: Object', 'V4.1 code - Value 4.1 name');
    mainPage.writeOnInput('date', '09/20/2018');

    mainPage.checkButtonEnabled('', true,'btn btn-success');

    mainPage.onClick('','btn btn-success');
    mainPage.onClick('','btn btn-success');

    mainPage.checkButtonEnabled('', false,'btn btn-white');


    // mainPage.checkButtonEnabled('Add', true);
    mainPage.onClick('Add');

    // mainPage.checkNotification(true, 'Case tickler added');


    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.checkComponent('#search-params', true);
    mainPage.checkComponent('#collapseFilter3', false);

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

  });


  it('Tickler processes navigation: process case tickler - toggle attributes', () => {

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.checkForm(["", "", "", ""], ['0: null', "0: null", "0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.writeOnInput('accountId', '77777');
    mainPage.writeOnInput('assignedUser', 'user1');
    mainPage.changeSelectOptions('1: SPOC');


    mainPage.onClick('Search');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

    mainPage.selectProcessCase('17');

    mainPage.checkButtonEnabled('New', true);
    mainPage.onClick('', 'btn btn-xs btn-white btnBorder');

    mainPage.checkTablesData(['Test2', 'Val1, Val2, Val3'], 'process-case-tickler-table', 3);
    mainPage.checkTablesData(['Test3', '111, 222'], 'process-case-tickler-table', 4);
    mainPage.checkTablesData(['Test4', '04/25/2018 12:39'], 'process-case-tickler-table', 5);

  });

  it('Tickler processes navigation: toggle filter', () => {

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.checkForm(["", "", "", ""], ['0: null', "0: null", "0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.writeOnInput('accountId', '77777');
    mainPage.writeOnInput('assignedUser', 'user1');
    mainPage.changeSelectOptions('1: SPOC');

    mainPage.onClick('Search');

    mainPage.checkToggleFilter('#search-params', true);
    mainPage.checkToggleFilter('#collapseFilter3', false);

    mainPage.onCollapseFilter('#search-params');

    mainPage.checkToggleFilter('#collapseFilter3', true);
    mainPage.checkToggleFilter('#search-params', false);

    mainPage.checkForm(['', '77777', '', 'user1'], ['1: SPOC', '0: null', '0: null']);

  });

  it('Tickler processes navigation: reset filter', () => {

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.checkForm(["", "", "", ""], ['0: null', "0: null", "0: null"] );

    mainPage.checkTab('#campaignProcessing', false);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', true);

    mainPage.writeOnInput('accountId', '77777');
    mainPage.writeOnInput('assignedUser', 'user1');
    mainPage.changeSelectOptions('1: SPOC');

    mainPage.onClick('Search');

    mainPage.checkToggleFilter('#search-params', true);
    mainPage.checkToggleFilter('#collapseFilter3', false);

    mainPage.onCollapseFilter('#search-params');

    mainPage.checkToggleFilter('#collapseFilter3', true);
    mainPage.checkToggleFilter('#search-params', false);

    mainPage.checkForm(['', '77777', '', 'user1'], ['1: SPOC', '0: null', '0: null']);

    mainPage.onClick('Reset');

    mainPage.checkForm(["", "", "", ""], ['0: null', "0: null", "0: null"] );

  });

  fit('Tickler processes navigation: changing tabs with filter', () => {

    mainPage.checkTab('#campaignProcessing', true);
    mainPage.checkTab('#accountSearch', false);
    mainPage.checkTab('#ticklerProcesses', false);
    mainPage.checkCurrentUrl('/app/main');

    mainPage.checkForm(["", "", ""], ["DIRECT", "0: null"] );


    mainPage.onClick('View CL');

    mainPage.checkComponent('campaign-list-accounts-table', true);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);


    mainPage.onClickTab('#accountSearch');

    mainPage.checkForm(['', '', '', ''], ['0: null']);

    mainPage.checkComponent('campaign-list-accounts-table', true);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);


    mainPage.writeOnInput('taxId', 'SSN');
    mainPage.onClick('Search');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', true);
    mainPage.checkComponent('accounts-table', true);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);

    mainPage.onCollapseFilter('#search-params');

    mainPage.checkForm(['SSN', '', '', '',], ['0: null', '0: null']);

    mainPage.onClickTab('#campaignProcessing');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', true);
    mainPage.checkComponent('accounts-table', true);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);

    mainPage.checkForm(["", "", ""], ["DIRECT", "0: null", '0: null'] );

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.checkForm(['', '', '', ''], ['0: null', '0: null', '0: null', "0: null"]);

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', true);
    mainPage.checkComponent('accounts-table', true);
    mainPage.checkComponent('tickler-cases-table', false);
    mainPage.checkComponent('process-case-tickler-table', false);

    mainPage.writeOnInput('cifId', '1234 cif');
    mainPage.changeSelectOptions('1: DUE');

    mainPage.onClick('Search');

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

    mainPage.onClickTab('#accountSearch');

    mainPage.checkForm(['', '', '', '',], ['0: null']);

    mainPage.onClickTab('#ticklerProcesses');

    mainPage.onCollapseFilter('#search-params');

    mainPage.checkForm(['', '', '1234 cif', ''], ['0: null', '0: null', '0: null']);

    mainPage.checkComponent('campaign-list-accounts-table', false);
    mainPage.checkComponent('customer-summary', false);
    mainPage.checkComponent('accounts-table', false);
    mainPage.checkComponent('tickler-cases-table', true);
    mainPage.checkComponent('process-case-tickler-table', true);

  });

});
