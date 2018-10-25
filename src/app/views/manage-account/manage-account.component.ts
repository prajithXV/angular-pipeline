import {Account, AccountCollection, memoWord} from "../../models/account";

import {
  Component, OnInit, ViewEncapsulation, ViewChild, ViewChildren, QueryList,
  OnDestroy, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef
} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {NewCallRecordComponent} from "../new-call-record/new-call-record.component";
import {GlobalStateService} from "../../services/global-state.service";
import {UFNotification, UserFeedbackService} from "../../services/user-feedback.service";
import {UFSeverity} from "../../services/ufseverity";
import {PublicUrls} from "../../routing-constants";
import {IboxtoolsComponent} from "../../components/common/iboxtools/iboxtools.component";
import {Phone, PhoneType} from "../../models/phone";
import {ModalDismissReasons, NgbModal, NgbTabset, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {PopoverDirective} from "ngx-bootstrap";
import {Subscription} from "rxjs/Subscription";
import {HotkeysSubscriber} from "../../general/hotkeys-subscriber";
import {CancelRecordModel, NewCallRecordModel} from "../../models/new-call-record-model";
import {CoinConstants} from "../../services/coin-constants";
import {Call, CallType} from "../../models/call";
import {callLater, CallRecord} from "../../models/call-record";
import {CancelCampaignCallRecordReason} from "../../models/cancel-campaign-call-record-reason";
import {Customer} from "../../models/customer";
import {TicklerProcess} from "../../models/tickler-processes";
import {ProcessCaseModel} from "../../models/process-case-model";
import {AccountsTableComponent} from "../accounts-table/accounts-table.component";
import {ProcessCase} from "../../models/process-case";
import {SearchTicklerCaseParams} from "../../models/search-tickler-case-params";
import {Pagination} from "../../models/pagination";
import {SortOrder} from "../../models/sort-order";
import {TicklerType} from "../../models/tickler-types";
import {ProcessCaseTickler} from "../../models/process-case-tickler";
import {
  CasesListInfo, CasesListInfoByAccount,
  TemporalStateServiceService
} from "../../services/temporal-state-service.service";
import {ROLE_STANDARD_CODES} from "../../models/role";
import {close} from "fs";
import {MemoNote} from "../../models/memo-note";
import {CallNotesComponent} from "../call-notes/call-notes.component";

enum ResultsMode {
  NEW_CALL_RECORD,
  NEW_PROCESS,
  CANCEL_CALL
}

export class MakeCallEvent {
  phone: Phone;
  isCoBorrower: boolean;
}

const Hotkeys = {
  accBasic: {code: 66, letter: 'B'},
  accCollection: {code: 67, letter: 'C'},
  accLoan: {code: 79, letter: 'O'},
  accLossMitigation: {code: 77, letter: 'M'},
  accBankruptcy: {code: 75, letter: 'K'},
  accForeclosure: {code: 70, letter: 'F'},
  accAddtitional: {code: 68, letter: 'D'},
  accHistory: {code: 72, letter: 'H'},

  addAccounts: {code: 83, letter: 'S'},
  addCoborrowers: {code: 82, letter: 'R'},

  ctCalls: {code: 65, letter: 'A'},
  ctNotes: {code: 69, letter: 'E'},
  ctAlerts: {code: 76, letter: 'L'},

  toggleNewCall: {code: 114, letter: 'F3'}
};


export const closeStatusCode = "CLOSED";


@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  host: {'(window:keydown)': 'hotkeys($event)'},
  styleUrls: ['../homeview.component.css', './manage-account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageAccountComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('newCall') private _newCalliBox: IboxtoolsComponent;
  @ViewChild(NewCallRecordComponent) private _newCallComponent: NewCallRecordComponent;

  @ViewChild('tabSetAccount') private _tsAccount: NgbTabset;
  @ViewChild('tabSetAdditional') private _tsAdditional: NgbTabset;
  @ViewChild('additionalAccounts') private _additionalAccounts: AccountsTableComponent;
  @ViewChild('tabSetContacts') private _tsContacts: NgbTabset;
  @ViewChild('callNotes') private _tCallNotes: CallNotesComponent;

  @Output() onClose = new EventEmitter<boolean>();

  account: Account = null;
  processCases: ProcessCase[] = null;
  private showNotify: boolean = true;
  private memoInText: boolean = false;

  private callLaterNotifyShowed: boolean = false;

  searchingAccountInfo: boolean = true;
  searchingAccountHistory: boolean = true;
  searchingCustomer: boolean = true;
  searchingAccounts: boolean = true;
  searchingNotes: boolean = true;
  searchingTodayContacts: boolean = true;
  searchingAlerts: boolean = true;
  searchingCalls: boolean = true;
  searchingCoborrowers: boolean = false;
  searchingAccountDepInfo: boolean = false;

  private isAutoDial: boolean = false;
  private phoneUsed: Phone = null;
  private isIncomingCall: boolean = false;

  private _resultsMode: ResultsMode = ResultsMode.NEW_CALL_RECORD;

  private cancelReasons: CancelCampaignCallRecordReason[] = null;
  processes: TicklerProcess[] = null;


  private callingFromUIType: PhoneType = null;
  private callingFromUIIsCoBorrower: boolean = null;
  private resultModeText: string = "New Call Record";
  private waitingResponse: boolean = false;
  private _accountStatusCode: string;
  private searchingProcessCases: boolean = false;
  private searchingCaseTicklers: boolean = false;
  private isTicklerVisible: boolean = false;
  private filterProcesses: TicklerProcess = null;
  private isRefreshed: boolean = false;
  private additionalInfoSearched: boolean = false;
  private criteria: SearchTicklerCaseParams = new SearchTicklerCaseParams();
  private searchingCallNotes: boolean = false;
  processCaseTicklers: ProcessCaseTickler[] = null;
  currentProcessCase: ProcessCase = null;
  ticklerTypes: TicklerType[] = null;

  keyCodes = Hotkeys;

  currentMemoNotes: MemoNote[] = [];

  @ViewChildren(PopoverDirective) private _popovers: QueryList<PopoverDirective>;
  private _hkSubscription: HotkeysSubscriber = new HotkeysSubscriber();

  isCampaignRecordCall: boolean = false;
  private isByAccount: boolean = true;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _dataService: DataService,
              private _globalStateService: GlobalStateService,
              private _userFeedbackService: UserFeedbackService,
              private modalService: NgbModal,
              private cdRef: ChangeDetectorRef,
              private _temporalStateService: TemporalStateServiceService) {
  }

  //Hide or show the different components: New call record, cancel call record reason and new process case
  get NEW_RECORD_MODE() {
    return ResultsMode.NEW_CALL_RECORD
  }

  get NEW_PROCESS_MODE() {
    return ResultsMode.NEW_PROCESS
  }

  get CANCEL_CALL_MODE() {
    return ResultsMode.CANCEL_CALL
  }

  get resultsMode() {
    return this._resultsMode;
  }

  set resultsMode(value: ResultsMode) {
    this._resultsMode = value;
  }

  //changes the mode that must to be show and the its title
  createProcessMode() {
    this.resultsMode = this.NEW_PROCESS_MODE;
    this.resultModeText = 'New Process Case';
  }

  cancelCallRecordMode() {
    this.resultsMode = this.CANCEL_CALL_MODE;
    this.resultModeText = 'Cancel Call Record';
  }

  newCallRecordMode() {
    this.resultsMode = this.NEW_RECORD_MODE;
    this.resultModeText = 'New Call record';
  }


  ngOnInit() {
    // Get params from url and load the data
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.showNotify = true;
      this.isAutoDial = false;

      this.searchingAccountInfo = true;
      this.searchingAccountHistory = true;
      this.searchingCustomer = true;
      this.searchingAccounts = true;
      this.searchingNotes = true;
      this.searchingAlerts = true;
      this.searchingCalls = true;
      this.searchingCoborrowers = true;
      this.searchingTodayContacts = true;
      this.searchingAccountDepInfo = true;
      this.searchingCallNotes = true;

      // If an incoming call is in progress, select IC in nextcall
      let call = this._globalStateService.currentCall;
      this.isIncomingCall = call && call.type == CallType.Inbound;

      this.account = null;
      let accId = params.get(PublicUrls.account.accountId);
      let accType = params.get(PublicUrls.account.accountType);
      let campRecId = params.get(PublicUrls.account.campaignRecord);
      this.isCampaignRecordCall = campRecId != CoinConstants.NoCampaignRecordId;


      // Load the operational data
      this._dataService
        .getCompleteInfoForAccount(accId, accType, campRecId, null, true)
        .subscribe(account => {
            // avoid that an error influences other fields
            try {
              this.account = account;
              this.criteria.AccountId = this.account.accountId;

              if(this.account && this.account.accountDep){
                this.searchingAccountDepInfo = false;
              }

              // if (this._newCallComponent) {
              //   this._newCallComponent.resetForm(this.isIncomingCall);
              // }
              if (this.account.customer && this.account.customer.mainContact) {
                this.searchingCustomer = false;
              }

              if(this.account){
                this.searchingAccountInfo = false;
              }

              if (this.account.collection) {
                // this.searchingAccountInfo = false;
                //we pass as a input to the children and load on ngOnInit the function
                this.memoInText = this.isMemoPostProPay();
                if(this.account.loan){
                  this.account.loan.maturityDate = this.account.collection.maturityDate;
                }
              }
              if (this.account.history) {
                this.searchingAccountHistory = false;
              }
              if (this.account.customer && this.account.customer.accounts) {
                this.searchingAccounts = false;
                this.accountStatusCode(accId);
              }
              if (this.account.customer && (this.account.customer.todayContacts || this.account.customer.todayContacts === 0)) {
                this.searchingTodayContacts = false;
              }
              if (this.account.customer && this.account.customer.notes) {
                this.searchingNotes = false;
              }
              if (this.account.customer && this.account.customer.alerts) {
                this.searchingAlerts = false;
              }
              if (this.account.customer && this.account.customer.callRecords) {
                this.searchingCalls = false;
                setTimeout(()=> this.setContactsTab(), 50);
                if (
                  this.account.customer.callRecords.length > 0 &&
                  this.account.customer.callRecords[0].result === callLater &&
                  !this.callLaterNotifyShowed
                ) {
                  this._userFeedbackService.handleNotification(new UFNotification(0, "This is a 'Call later' call", UFSeverity.warn));
                  this.callLaterNotifyShowed = true;
                }
              }

              if(this.account.customer && this.account.customer.callNotes){
                this.searchingCallNotes = false;
                this.isByAccount = true;
                this.currentMemoNotes = this.account.customer.callNotes;
              }

              if (this.account.customer && this.account.customer.coBorrowers) {
                this.searchingCoborrowers = false;
              }

              if (!this.searchingCustomer && !this.additionalInfoSearched) {
                this.additionalInfoSearched = true;
                // Set timeout to allow IE react
                setTimeout(() => {this.loadAdditionalInitialInfo();}, 50);
              }

            } catch (error) {
              console.log("Error managing account", error);
              this._userFeedbackService.handleError("Error dealing with account's data", error);
            }
          }
          ,
          error => console.log("error")
        );
    });

    if (this._temporalStateService.isCasesListInfoByAccount) {
      this._temporalStateService.casesListInfoByAccount = null;
    }


    this._hkSubscription.startSubscription(this._globalStateService, () => this._popovers);
  }


  get isDepositAccountType(): boolean{
    return this.account ? this.account.accountType == 'D': false;
  }

  private loadAdditionalInitialInfo() {
    // Load cases
    this.loadCases(this.criteria);

    // Load cancel reason codes
    this._dataService.getCampaignCallRecordReasons()
      .then((reasons) => {
        this.cancelReasons = reasons;
      }).catch(() => {
      // TODO: error
    });

    //load processes
    this._dataService.getProcesses()
      .then((processes) => {
        this.processes = processes;
      }).catch(() => {
      // TODO: error
    });

  }

  loadCaseTicklers(processCase: ProcessCase) {
    this.searchingCaseTicklers = true;
    this.isTicklerVisible = true;
    this.processCaseTicklers = [];
    this.currentProcessCase = processCase;
    //gets Process cases
    this._dataService.getProcessCaseTicklers(processCase).then(res => {
      this.processCaseTicklers = res;
      this.searchingCaseTicklers = false;

      // sort by the most recent date
      this.processCaseTicklers.sort((d1, d2) => new Date(d2.createdDate).getTime() - new Date(d1.createdDate).getTime());

      //gets tickler types
      this.filterProcesses = this.processes.find(p => p.processCode === this.currentProcessCase.processCode);

      this._dataService.getTicklerTypes(this.filterProcesses).then(res => {
        this.ticklerTypes = res;
      }).catch(err => {
        this.searchingCaseTicklers = false;
        console.log("Error retrieving tickler types");
        console.log(err);
      })

    }).catch(err => {
      // this.searchingCaseTicklers = false;
      console.log("Error retrieving case ticklers");
      console.log(err)
    })
  }

  get lastOrCurrentCall(): Call {
    return this._globalStateService.lastCall;
  }


  loadCases(accountId: SearchTicklerCaseParams) {
    this.searchingProcessCases = true;
    if (!this.isRefreshed) {
      this.currentProcessCase = null;
    }
    this._dataService.getCases(accountId).then(res => {
      this.processCases = res;
      setTimeout(() => this.setCurrentTab(), 200);
      // this.setCurrentTab();
      this.searchingProcessCases = false;
    }).catch(err => {
      console.log("Error retrieving process cases");
      console.log(err);
      this.searchingProcessCases = false;
    });

  }

  setContactsTab(){
    this._tsContacts.select('contactsCalls');
  }

  setCurrentTab() {
    if (this.processCases && this.processCases.length > 0 && this.hasNotAllClosedCases) {
      this._tsAdditional.select('additionalCases');
    }
  }

  /*
  *
  * map all the process cases
  * - if statusCode == "CLOSE" the map return the a boolean array; example:
  *   [true, false, true]; if is true it means that the process case is closed.
  *
  * - indexOf: the not Close process case (false on the array) if is -1 the process cases are closed
  *
  * */
  get hasNotAllClosedCases(): boolean {
   return this.processCases.map(st=>st.statusCode == closeStatusCode).indexOf(false) > -1;
  }


  //tickler case refresh
  refreshCaseTicklers() {
    this.isRefreshed = true;
    this.loadCases(this.criteria);
    this.loadCaseTicklers(this.currentProcessCase);
  }


  accountStatusCode(accId: string) {
    let additional = this.account.customer.accounts.find(a => a.accountId == accId);
    if (additional != null) {
      this._accountStatusCode = additional.stateDescription;
    }
  }

  get aStatusCode(): string {
    return this._accountStatusCode;
  }


  get currentCampaign(): string {
    return this._globalStateService.currentCampaignCode;
  }

  get canShowTicklerProcesses() {
    return this._globalStateService.loggedAgentHasRoleCode(ROLE_STANDARD_CODES.TICKLER_VIEW);
  }

  ngAfterViewInit() {
    if (!this.isIncomingCall) {
      this.closeNewCall();
    }
    if (this._newCallComponent) {
      this._newCallComponent.resetForm(this.isIncomingCall);
    }



    // this.setCurrentTab(event);
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    console.log("Unsubscribe");
    this._hkSubscription.endSubscritption();
  }

  recordCall(model: NewCallRecordModel) {
    console.log(model, "model");
    this._dataService.addCallRecord(
      this._globalStateService.loggedAgent,
      this.account,
      model,
      // Each call is used once at most
      this._globalStateService.isLastCallUsed ? null : this.lastOrCurrentCall,
      this.phoneUsed,
      this.isAutoDial,
      this.currentCampaign,
      this.aStatusCode
    ).then(
      (res) => {
        this._globalStateService.setLastCallUsed();
        // Notify
        this._userFeedbackService.handleNotification(new UFNotification(0, "Call record saved", UFSeverity.success));
        // Go to ready state
        this._globalStateService.goToReady();
        // Redirect or reload data
        if (model.quit) {
          this._router.navigate([PublicUrls.main.url]);
        } else {
          this.closeNewCall();
          model.clear(true);
          // Reload recordCalls
          this.searchingCalls = true;
          this.account.customer.resetCalls();
          this._dataService.getCustomerCallRecords(this.account.customer).then(rcs => {
            this.searchingCalls = false;
            for (let rc of rcs) {
              this.account.customer.addCallRecord(rc);
            }
          }, err => {
            this._userFeedbackService.handleNotification(new UFNotification(0, "Error refreshinig record calls", UFSeverity.error, err));
            this.searchingCalls = false;
          });
          // Reload today contacts
          this.searchingTodayContacts = true;
          this.account.customer.todayContacts = null;
          this._dataService.getTodayContacts(this.account).then(ctcts => {
            this.searchingTodayContacts = false;
            this.account.customer.todayContacts = ctcts;
          }, err => {
            this._userFeedbackService.handleNotification(new UFNotification(0, "Error refreshinig today contacts", UFSeverity.error, err));
            this.searchingTodayContacts = false;
          });
        }
      },
      (err) => {
        // Notify
        this._userFeedbackService.handleNotification(new UFNotification(0, "Error saving call record", UFSeverity.error, err));
      }
    );
  }

  cancelCall(model: CancelRecordModel) {
    this.waitingResponse = true;
    this._dataService.cancelCallRecord(this._globalStateService.loggedAgent, this.account, model)
      .then(() => {
        this.waitingResponse = false;
        this._router.navigate([PublicUrls.main.url]);
        this._userFeedbackService.handleSuccess("Record call canceled");
      }).catch((error) => {
      this.waitingResponse = false;
      this._userFeedbackService.handleError("Error cancelling call", error);
    });
  }


  //creates a process case
  processCaseCreated() {
    this._router.navigate([PublicUrls.main.url]);
  }

  makeCall(event: MakeCallEvent) {
    this.openNewCall();
    this._globalStateService.callTo(event.phone);
    this.isAutoDial = true;
    this.phoneUsed = event.phone;
    this.callingFromUIType = event.phone.type;
    this.callingFromUIIsCoBorrower = event.isCoBorrower;
  }

  private openNewCall() {
    this._newCalliBox.open();
    this._newCallComponent.setFocus();
  }


  get newCalliBox(): IboxtoolsComponent {
    return this._newCalliBox;
  }

  set newCalliBox(value: IboxtoolsComponent) {
    this._newCalliBox = value;
  }

  //Refresh memo notes event emitter
  refreshMemoNoteValues(values: Object){
    this.searchingCallNotes = true;
      this._dataService.getCallNotes(this.account, this.account.customer).then(res => {
        // this.currentMemoNotes = res;
        res.push(new MemoNote(1111, "L000010", 'pepe', 'C', "1123461"));
        this.account.customer.callNotes = res;
        this.cdRef.detectChanges()
        this.searchingCallNotes = false;

      }).catch(err => {
        console.log(err);
      })
  }


  refreshMemoNotesFilter(values: Object){
    this.currentMemoNotes = values['memoNotes'];
    // this.searchingCallNotes = values['isSearching'];
    this.isByAccount = values['isChecked'];
  }

  /*
  * function show notify icon --> parent
  * set the notify valor
  * Wee need to detectChanges to not have errors (force changes)
  *
  * in the html we pass the valor to false --> showIcon(false) and
  * showNotify = true; then when click on the function showNotify = false
  * and the component tab Icon is hidden
  *
  * */
  showIcon(n: boolean) {
    this.showNotify = n;
    this.cdRef.detectChanges();
  }

  /*
  *
  * isNotifyActive if we have to show the notify
  * and there are memo in the text
  *
  *
  * */
  isNotifyActive() {
    return this.showNotify && this.memoInText;
  }

  /*
  * pass all the words of the array to lower case and match the 'memo' word
  * if this word is inside return true
  * else false
  *
  *
  * */
  isMemoPostProPay() {
    let lower = this.account.collection.memoPostProPay.map(v => v.toLowerCase());
    let m = lower.toString().match(memoWord);
    if (m) {
      return true;
    }
    else {
      return false;
    }
  }

  private closeNewCall() {
    this._newCalliBox.close();
  }

  hotkeys(event) {
    if (event.shiftKey && event.ctrlKey) {
      let preventDefault = true;
      switch (event.keyCode) {
        case Hotkeys.accBasic.code:
          this._tsAccount.select("accountBasic");
          break;
        case Hotkeys.accCollection.code:
          this._tsAccount.select("accountCollection");
          break;
        case Hotkeys.accLoan.code:
          this._tsAccount.select("accountLoan");
          break;
        case Hotkeys.accLossMitigation.code:
          this._tsAccount.select("accountLossMitigation");
          break;
        case Hotkeys.accBankruptcy.code:
          this._tsAccount.select("accountBankruptcy");
          break;
        case Hotkeys.accForeclosure.code:
          this._tsAccount.select("accountForeclosure");
          break;
        case Hotkeys.accAddtitional.code:
          this._tsAccount.select("accountAdditional");
          break;
        case Hotkeys.accHistory.code:
          this._tsAccount.select("accountHistory");
          break;

        case Hotkeys.addAccounts.code:
          this._tsAdditional.select("additionalAccounts");
          break;
        case Hotkeys.addCoborrowers.code:
          this._tsAdditional.select("additionalCoBorrowers");
          break;

        case Hotkeys.ctCalls.code:
          this._tsContacts.select("contactsCalls");
          break;
        case Hotkeys.ctNotes.code:
          this._tsContacts.select("contactsNotes");
          break;
        case Hotkeys.ctAlerts.code:
          this._tsContacts.select("contactsAlerts");
          break;

        case Hotkeys.toggleNewCall.code:
          if (this._newCalliBox.isOpen) {
            this.closeNewCall();
          } else {
            this.openNewCall();
          }
          break;

        default:
          preventDefault = false;
      }
      if (preventDefault) {
        event.preventDefault();
      }
    }
  }



}
