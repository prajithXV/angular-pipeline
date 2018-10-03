import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {DatePipe} from "@angular/common";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {NewCallRecordModel} from "../../models/new-call-record-model";
import {GlobalStateService} from "../../services/global-state.service";
import {Call, CallState, CallType} from "../../models/call";
import {Account} from "../../models/account";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import * as moment from 'moment';
import {CoinConstants} from "../../services/coin-constants";
import {PhoneType} from "../../models/phone";
import {ROLE_STANDARD_CODES} from "../../models/role";

const incomingCallCode = "IC";
const outgoingWorkCode = "CH";
const outgoingHome = "CJ";
const outgoingCellCode = "CS";

const coBorrowerCode = "CB";

const answerNoMessageCode = "AN";
const noAnswerNoMessageCode = "NA";
const leftMessageCode = "VM";


const CtActions = [
  {value: outgoingWorkCode, display: "Outgoing work", acronym: "OW"},
  {value: outgoingHome, display: "Outgoing home", acronym: "OH"},
  {value: outgoingCellCode, display: "Outgoing cell", acronym: "OC"},
  {value: incomingCallCode, display: "Incoming call", acronym: "IC"},
  {value: "LS", display: "Letter sent"},
  {value: "OA", display: "Outgoing call"},
  {value: "RE", display: "Other action"},
  {value: "SK", display: "Skip tracing"},
  {value: "TA", display: "Returned mail"},
  {value: "TH", display: "Emailed"},
  {value: "TJ", display: "Email received"},
  {value: "TM", display: "In office"}
];
// "Outgoing Work", "Outgoing Home", "Outgoing Cell", "Incoming Call"
const CtActionIndexes = [
  findIndex('CH', CtActions),
  findIndex('CJ', CtActions),
  findIndex('CS', CtActions),
  findIndex('IC', CtActions)
];

const CtParties = [
  {value: "AT", display: "Attorney"},
  {value: "BR", display: "Branch"},
  {value: "BW", display: "Borrower", acronym: "Bo"},
  {value: coBorrowerCode, display: "CoBorrower", acronym: "CB"},
  {value: "CW", display: "CoWorker"},
  {value: "DC", display: "Debt couns"},
  {value: "DL", display: "Dealer"},
  {value: "FM", display: "Family member", acronym: "FM"},
  {value: "GU", display: "Guarantor", acronym: "Gu"},
  {value: "OF", display: "Officer"}
];
// "Borrower", "CoBorrower", "Family Mbr", "Guarantor"
const CtPartyIndexes = [
  findIndex('BW', CtParties),
  findIndex('CB', CtParties),
  findIndex('FM', CtParties),
  findIndex('GU', CtParties)
];

const CtResults = [
  {value: answerNoMessageCode, display: "Answered/ No message", acronym: "A/N"},
  {value: "BK", display: "Bankruptcy pending"},
  {value: "BY", display: "Busy"},
  {value: "LM", display: "Left message with P"},
  {value: noAnswerNoMessageCode, display: "No answer/ No message", acronym: "N/N"},
  {value: "OT", display: "Other result"},
  {value: "PA", display: "Promised pay by int"},
  {value: "PB", display: "Promised pay by bra"},
  {value: "PM", display: "Promised pay by mai"},
  {value: "PP", display: "Payment received", acronym: "PR"},
  {value: "PQ", display: "Promised payment by"},
  {value: "PS", display: "Phone disconnected"},
  {value: "SP", display: "Recovery recurring"},
  {value: "UA", display: "Unable to pay"},
  {value: "UB", display: "Refused to pay"},
  {value: leftMessageCode, display: "Left voice mail message", acronym: "LVM"},
  {value: "WN", display: "Wrong number"},
  {value: "WO", display: "Requested workout"},
  {value: "ZZ", display: "Judgment"}
];
const CallLaterResult = {value: "CL", display: "Call later"};
// "Answered/ No Message", "No Answer/ No Message", "Payment Received", "Left Voice Mail Message"
const CtResultIndexes = [
  findIndex(answerNoMessageCode, CtResults),
  findIndex(noAnswerNoMessageCode, CtResults),
  findIndex('PP', CtResults),
  findIndex('VM', CtResults)
];

const autoNotes = [
  {
    action: outgoingHome,
    party: "BW",
    result: "VM",
    message: "Called borrower home left voiceMail"
  },
  {
    action: outgoingCellCode,
    party: "BW",
    result: "VM",
    message: "Called borrower cell left voiceMail"
  },
  {
    action: outgoingWorkCode,
    party: "BW",
    result: "VM",
    message: "Called borrower work left voiceMail"
  },
  {
    action: outgoingHome,
    party: "BW",
    result: "NA",
    message: "Called borrower home no answer"
  },
  {
    action: outgoingCellCode,
    party: "BW",
    result: "NA",
    message: "Called borrower cell no answer"
  },
  {
    action: outgoingWorkCode,
    party: "BW",
    result: "NA",
    message: "Called borrower work no answer"
  },
];

/*array objects
*
* 1: (CTRL + ALT + N) -> Outgoing 1
* 2: (CTRL + ALT + A) -> Incoming 1
* 3: (CTRL + ALT + R) -> Outgoing 2
* 4: (CTRL + ALT + F) -> Incoming 2
* 5: (CTRL + ALT + Y) -> Outgoing 3
*
* */
const sentencesCallRecord = [

  {
    action: "Outgoing",
    sentence: "I am an outgoing sentence 1, you can save me as a note, I am an outgoing sentence 1, you can save me as a note, I am an outgoing sentence 1, you can save me as a note",
    keyCode: 78,
    letterCode: 'N'

  },
  {
    action: "Incoming",
    sentence: "I am an incoming call sentence 1, you can save me as a note",
    keyCode: 65,
    letterCode: 'A'

  },
  {

    action: "Outgoing",
    sentence: "I am an outgoing sentence 2, you can save me as a note",
    keyCode: 82,
    letterCode: "R"

  },
  {
    action: "Incoming",
    sentence: "I am an incoming call sentence 2, you can save me as a note",
    keyCode: 70,
    letterCode: 'F'

  },
  {
    action: "Outgoing",
    sentence: "I am an outgoing sentence 3, you can save me as a note",
    keyCode: 89,
    letterCode: 'Y'

  }
];

function findIndex(val: string, arr: { value: string }[]): number {
  for (let i in arr) {
    if (arr[i].value == val) {
      return +i;
    }
  }
  return -1;
}

@Component({
  selector: 'new-call-record',
  templateUrl: './new-call-record.component.html',
  // #NS#: Notes sentences
  // host: {'(window:keydown)': 'hotkeys($event)'},
  styleUrls: ['./new-call-record.component.css']
})
export class NewCallRecordComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isAutoDial: boolean;
  @Input() showCallLater: boolean;
  @Input() call: Call;
  // We explicitly set the callstate to be able to suscribe to changes
  @Input() callState: CallState;
  @Input() callFromUIType: PhoneType;
  @Input() callingFromUIIsCoBorrower: boolean;
  @Input() account: Account;

  private isShow: boolean = false;
  private contador = 0;

  // If incoming call detected so we can't choose any other option
  private isIncomingCallForced = false;

  actions = CtActions;
  actionIndexes = CtActionIndexes;

  parties = CtParties;
  partyIndexes = CtPartyIndexes;

  results = CtResults;
  resultsWithCall: { value: string, display: string, acronym?: string }[];
  resultIndexes = CtResultIndexes;
  callLaterResult = CallLaterResult;

  @Input() resultModeText: string = "New Call Record";
  @Output() onSave = new EventEmitter<NewCallRecordModel>();
  @Output() onFocus = new EventEmitter<boolean>();
  @Output() onOpenRequest = new EventEmitter<boolean>();
  @Output() onCancelMode = new EventEmitter<number>();
  @Output() onCreateProcessMode = new EventEmitter<number>();
  @Output() addSentence = new EventEmitter<any>();

  model: NewCallRecordModel = null;

  waitingResponse = false;

  text = sentencesCallRecord;

  // @ViewChildren(CoinDateInputComponent) private _dateCmps: QueryList<CoinDateInputComponent>;
  @ViewChildren(DatepickerComponent) private _dateCmps: QueryList<DatepickerComponent>;
  @ViewChild('promisedDate') private _promDt: DatepickerComponent;
  // private _promDt: CoinDateInputComponent = null;
  @ViewChild('nextWorkDate') private _workDt: DatepickerComponent;
  // private _workDt: CoinDateInputComponent = null;
  @ViewChild('promisedAmount') private _promAmt: CoinNumberInputComponent;
  @ViewChild('callLater') private _clMinutes: CoinNumberInputComponent;
  private _notesBlurred = false;
  private _notesChanged = false;
  @ViewChild('initFocus') private _initFocusElem: ElementRef;

  private min = moment(new Date());

  constructor(private _globalStateService: GlobalStateService, private _datePipe: DatePipe, private _cdr: ChangeDetectorRef) {
    this.resultsWithCall = [];
    this.results.forEach(r => this.resultsWithCall.push(r));
    this.resultsWithCall.push(CallLaterResult);
  }

  ngAfterViewInit() {
    for (let cmp of this._dateCmps.toArray()) {
      switch (cmp.name) {
        case "nextWorkDate":
          this._workDt = cmp;
          break;
        case "promisedDate":
          this._promDt = cmp;
          break;
      }
    }
  }



  ngOnInit() {
    this.resetForm();
  }

  ngOnChanges(changes) {
    if (changes.callState) {
      if (this.call) {
        if (this.call.type == CallType.Outbound) {
          if (this.call.state == CallState.Speaking) {
            this.setLeaveMessage();
          } else if (this.call.state == CallState.Calling) {
            this.setCallToActions();
          }
        }
      }
    }

  }

  get isCancellable() {
    return this.account && this.account.campaignRecordId == CoinConstants.NoCampaignRecordId;
  }

  actionChanged(newAction) {
    this.checkAutoNote();
  }

  partyChanged(newAction) {
    this.checkAutoNote();
  }

  resultChanged(newAction) {
    this.checkAutoNote();
  }

  private setLeaveMessage() {
    this.model.result = leftMessageCode;
    this.checkAutoNote();
  }

  private setCallToActions() {
    switch(this.callFromUIType) {
      case PhoneType.Business: this.model.action = outgoingWorkCode; break;
      case PhoneType.Home: this.model.action = outgoingHome; break;
      default: this.model.action = outgoingCellCode; break;
    }
    if (this.callingFromUIIsCoBorrower) {
      this.model.party = coBorrowerCode;
    }
    this.checkAutoNote();
    this.onOpenRequest.emit(true);
  }

  checkAutoNote() {
    if (this._notesChanged && this.model.message.trim() != "") {
      return;
    }
    // If notes where changed but now the notes is empty, I allow to change automatically the note again
    this._notesChanged = false;
    for (let r of autoNotes) {
      if (
        (!r.action || r.action == this.model.action) &&
        (!r.party || r.party == this.model.party) &&
        (!r.result || r.result == this.model.result)
      ) {
        this.model.message = r.message;
        return;
      }
    }
    // If no message found, set ""
    this.model.message = "";
  }

  resetForm(isIncomingCall = false) {
    this.model = this.newModel(isIncomingCall);
    this.model.clear();
  }

  getDisplayResults() {
    return this.showCallLater ? this.resultsWithCall : this.results;
  }


  canCreateCase(){
    return this._globalStateService.loggedAgentHasRoleCode(ROLE_STANDARD_CODES.CREATE_TICKLER_CASE);
  }

  canSave() {
    return this._workDt && !this._workDt.hasErrors() && !this._workDt.isEmpty()
      && this._promDt && !this._promDt.hasErrors()
      && this._promAmt && !this._promAmt.hasErrors()
      && this.model.message.trim().length > 0
      && !this.waitingResponse &&
      (!this.useCallLater || (this._clMinutes.getNumber() != null && !this._clMinutes.hasErrors()));

  }

  save(andQuit = false) {
    this.waitingResponse = true;
    //filters not show
    this.isShow = false;
    // this.model.nextWorkDate = this._workDt.getDate();
    this.model.nextWorkDate = this._workDt.getDate();
    this.model.promisedDate = this._promDt.getDate();
    this.model.promisedAmount = this._promAmt.getNumber();
    if (this.useCallLater) {
      this.model.callLaterDate = new Date(new Date().getTime() + this._clMinutes.getNumber() * 60000);
    } else {
      this.model.callLaterDate = null;
    }
    this.model.quit = andQuit;
    this.onSave.emit(this.model);
  }

  //click on skip --> emits to the parent
  cancelCall() {
    this.onCancelMode.emit();
  }

  //click on create process --> emits to the parent
  createProcess(){
    this.onCreateProcessMode.emit();
  }

  private newModel(isIncomingCall = false): NewCallRecordModel {
    this.isIncomingCallForced = isIncomingCall;
    return {
      action: isIncomingCall ? incomingCallCode : this.actions[this.actionIndexes[0]].value,
      party: this.parties[this.partyIndexes[0]].value,
      result: isIncomingCall ? this.results[this.resultIndexes[0]].value : noAnswerNoMessageCode,
      message: "",
      quit: false,
      nextWorkDate: null,
      promisedDate: null,
      promisedAmount: 0,
      callLaterDate: null,
      clear: (forceAllowSelectAction = false) => {
        this.model = this.newModel(isIncomingCall);
        // If explicitly ask for free action selection, unfreeze it
        if (forceAllowSelectAction) this.isIncomingCallForced = false;
        if (this._promDt) this._promDt.clear();
        if (this._workDt) this._workDt.clear();
        if (this._promAmt) this._promAmt.clear();
        if (this._clMinutes) this._clMinutes.clear();
        this._notesBlurred = false;
        this._notesChanged = false;
        this.waitingResponse = false;
        this._cdr.detectChanges();
      }
    };
  }

  notesBlur() {
    this._notesBlurred = true;
  }

  notesChanged() {
    this._notesChanged = true;
  }

  //show the standard sentences
  private show(s: boolean) {

    //init the counter
    this.contador = 0;

    this.isShow = s;

  }

  /*
  *
  * counter function
  *
  * - if the counter = 0 the filter panel is show
  * - else if the counter = 5, in other words we write five letter in the text area
  *   the panel is not show
  *
  * */
  private count() {
    if (this.contador === 0) {
      this.isShow = true;

    } else if (this.contador === 5) {
      this.isShow = false;
    }
    this.contador++;
  }


  //add text to the notes with an space
  private addText(t: string) {
    //if model.message have a line break replace without it
    if (this.model.message == '\n') {
      this.model.message = this.model.message.replace('\n', "");
      return this.model.message += t.trim() + '\n';
    }

    /*if the model.message.length < 250 return this message,
    *
    * else substring and force to model message length to be 250 or less
    *
    * */

    if (this.model.message.length + t.trim().length < 250) {
      return this.model.message += t.trim() + '\n';
    } else {
      this.model.message += t.trim() + '\n';
      this.model.message = this.model.message.substring(0, 250);
    }
  }

  /*
  *
  * Hotkeys function
  *
  * it knows that there are an event
  * if the keyboard that we tighten are CTRL + ALT + another keyboard
  *
  * if this another keyboard = keyCode of our sentences --> we call getModelLimit
  *   - if the model.message (our sentence ngModel in text area) > 250 call to the addText function
  *     and add in the text area
  *
  *   - else if the model.message (our NgModel) > 250 we split the sentence to fit in the text area
  *
  * else
  * default: preventDefault false; because we need to write in the text area and not show
  * the filter panel and is not showing
  *
  * */
  hotkeys(event) {
    let preventDefault = true;
    if (event.ctrlKey && event.altKey) {
      for (let i in this.text) {
        if (event.keyCode === this.text[i].keyCode) {
          this.addText(this.text[i].sentence);
          this.isShow = false;
        }
      }
    } else {
      preventDefault = false;


    }

  }

  // private getModelLimit(s:string){
  //   if(this.model.message.length < 250) {
  //     this.addText(s);
  //     this.isShow = false
  //   }
  //   else {
  //     this.addText(s);
  //     this.model.message = this.model.message.substring(0,250);
  //
  //     this.isShow = false
  //   }
  //
  // }

  get errorNotes() {
    return this._notesBlurred && this.model.message.trim().length == 0;
  }

  setFocus() {
    this._initFocusElem.nativeElement.focus();
  }

  get callLaterTime(): string {
    let mins = this._clMinutes.getNumber();
    if (!mins) {
      return null;
    }
    let time = new Date(new Date().getTime() + mins * 60000);
    return this._datePipe.transform(time, 'shortTime');
  }


  set callLater(value: CoinNumberInputComponent){
    this._clMinutes = value;
  }

  get callLater():CoinNumberInputComponent{
    return this._clMinutes;
  }

  set workDate(value: DatepickerComponent){
    this._workDt = value;
  }

  get workDate(){
    return this._workDt;
  }

  set promiseDate(value: DatepickerComponent){
    this._promDt = value;
  }

  get promiseDate(): DatepickerComponent{
    return this._promDt;
  }

  get promisedAmount(): CoinNumberInputComponent{
    return this._promAmt;
  }

  set promisedAmount(value: CoinNumberInputComponent){
    this._promAmt = value;
  }

  get useCallLater() {
    return this.model.result == this.callLaterResult.value
  }

  changeResult(item) {
    console.log(item);
    if (this.useCallLater && this._workDt && !this._workDt.getDate()) {
      this._workDt.setDate(moment(new Date()));
    }
  }
}
