import {LoginPage} from "./login.page";
import {UserPage} from "./user.page";
import {NavPage} from "./nav.page";

describe('inspinia App', () => {
  let loginPage: LoginPage;
  let userPage: UserPage;
  let navPage: NavPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    navPage = new NavPage();
    userPage = new UserPage();
    loginPage.enterToMainPage();
    navPage.onClickBar('#admin li', 'Users');
  });

  it('Users navigation: loaded data', () => {

    userPage.checkTablesData(['','ajaillet', 'Aaron Jaillet', '12/13/2017 11:34 AM', '', '', '', ''], 'agents-table', 0 );
    userPage.checkTablesData(['','clandry'	,'Claudell Landry',	'11/27/2017 01:15 PM', '', '', '', ''], 'agents-table', 1 );
    userPage.checkTablesData(['','dprosper'	,'',	'', '', '', '', ''], 'agents-table', 2 );
    userPage.checkTablesData(['','jamjones'	, 'Jamie Jones', '10/24/2017 01:41 PM','',	'', '', ''], 'agents-table', 3 );
    userPage.checkTablesData(['','jschmalt',	'James Schmaltz',	'12/15/2017 08:59 AM','',	'', '', ''], 'agents-table', 4 );
    userPage.checkTablesData(['','jsteel',	'',	'','',	'', '', ''], 'agents-table', 5 );
    userPage.checkTablesData(['','mmuratti',	'',	'','','', '', ''], 'agents-table', 6 );
    userPage.checkTablesData(['','nkilchr',	'',	'','',	'', '', ''], 'agents-table', 7 );
    userPage.checkTablesData(['','eNavarre',	 'Etienne Navarre',	'','','', '', ''], 'agents-table', 8 );
    userPage.checkTablesData(['','pblanco', 	'Pau Blanco',	'12/15/2017 10:12 AM','',	'', '', ''], 'agents-table', 9 );
    userPage.checkTablesData(['','vsharapo', 'Vasiliy Sharapov', '12/18/2017 03:57 AM','',	'', '', ''], 'agents-table', 10 );


  });


  it('Users navigation: campaigns', () => {
    userPage.checkButtonClass('fa fa-times text-danger');

    userPage.onClick('i', 'fa fa-times text-danger');

    userPage.checkButtonClass('fa fa-check text-info');

    userPage.selectUser('eNavarre');

    userPage.checkButtonClass('fa fa-times text-danger');

    userPage.selectUser('ajaillet');

    userPage.checkButtonClass('fa fa-check text-info');

  });



});
