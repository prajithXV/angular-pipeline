import {Customer} from "./customer";


export const memoWord = 'memo';


export class AccountHistoryEntry {
  private _postDate: string;
  private _amount: number;
  private _effectDate: string;
  private _pmtDueDate: string;
  private _trnCodeCode: string;
  private _trnCodeDescription: string;
  private _trnType: string;
  private _affCode: string;

  constructor(postDate?: string, amount?: number, effectDate?: string, pmtDueDate?: string, trnCodeCode?: string, trnCodeDescription?: string,
              trnType?: string, affCode?: string){

    this.postDate = postDate;
    this.amount = amount;
    this.effectDate = effectDate;
    this.pmtDueDate = pmtDueDate;
    this.trnCodeCode = trnCodeCode;
    this.trnCodeDescription = trnCodeDescription;
    this.trnType = trnType;
    this.affCode = affCode;

  }

  get postDate(): string {
    return this._postDate;
  }

  set postDate(value: string) {
    this._postDate = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get effectDate(): string {
    return this._effectDate;
  }

  set effectDate(value: string) {
    this._effectDate = value;
  }

  get pmtDueDate(): string {
    return this._pmtDueDate;
  }

  set pmtDueDate(value: string) {
    this._pmtDueDate = value;
  }

  get trnCodeCode(): string {
    return this._trnCodeCode;
  }

  set trnCodeCode(value: string) {
    this._trnCodeCode = value;
  }

  get trnCodeDescription(): string {
    return this._trnCodeDescription;
  }

  set trnCodeDescription(value: string) {
    this._trnCodeDescription = value;
  }

  get trnType(): string {
    return this._trnType;
  }

  set trnType(value: string) {
    this._trnType = value;
  }

  get affCode(): string {
    return this._affCode;
  }

  set affCode(value: string) {
    this._affCode = value;
  }
}

export class AccountCollection {
  private _previousBrokenPromise: string;
  private _memoPostProPay: string[] = [];
  private _demandLetterFlag: string;
  private _demandLetterDate: string;
  private _paymentAmount: number;
  private _paymentDate: string;
  private _nextPaymentDate: string;
  private _pastDueAmount: number;
  private _principalAmountDue: number;
  private _principalPastDue: number;
  private _interestDue: number;
  private _lateCharges: number;
  private _otherCharges: number;
  private _collectionNotes: string;
  private _escrowBalance: number;
  private _daysPastDue: number;
  private _dueDate: string;
  private _promiseDate: string;
  private _lastWorkDate: string;
  private _lastPromiseDate: string;
  private _paymentsDue: number;
  private _actionCodes: string;
  private _resultCodes: string;
  private _contactCodes: string;
  private _collectionStatusCode: string;
  private _loanStatus: string;
  private _numberOfExtensionsYTD: number;
  private _numberOfExtensionsLTD: number;
  private _dateOfLastExtension: string;
  private _lifePastDue: string;
  private _queueingFlag: string;
  private _delinquencyReason: string;
  private _historicalAttemptsCalls: string;
  private _chargeOffAmount: number;
  private _nonAccrualDate: string;
  private _reasonForDelinquency: string;
  private _dateStampForRfD: string;
  private _interestRateChangeDate: string;
  private _endOfDrawDate: string;
  private _pastDue10LTD: string;
  private _pastDue30LTD: string;
  private _pastDue60LTD: string;
  private _pastDue90LTD: string;
  private _languageCode: string;
  private _pastDue30YTD: string;
  private _maturityDate: string;
  private _origLoanAmount: string;
  private _chargeOffDate: string;


  constructor(previousBrokenPromise?: string, memoPostProPay?:string[], demandLetterFlag?: string, demandLetterDate?:string, paymentAmount?: number,
              paymentDate?:string, nextPaymentDate?:string, pastDueAmount?:number, principalAmountDue?: number, principalPastDue?:number, interestDue?: number,
              lateCharges?:number, otherCharges?:number, collectionNotes?:string, escrowBalance?: number,daysPastDue?: number, dueDate?:string, promiseDate?: string,
              lastWorkDate?: string, lastPromiseDate?: string, paymentsDue?: number, actionCodes?: string, resultCodes?: string, contactCodes?: string, collectionStatusCode?: string,
              loanStatus?: string, numberOfExtensionsYTD?: number, numberOfExtensionsLTD?: number, dateOfLastExtension?: string, lifePastDue?: string, queueingFlag?: string,
              delinquencyReason?: string, historicalAttemptsCalls?: string, chargeOffAmount?: number, nonAccrualDate?: string, reasonForDelinquency?: string, dateStampForRfD?: string,
              interestRateChangeDate?: string, endOfDrawDate?: string, pastDue10LTD?: string, pastDue30LTD?: string, pastDue60LTD?: string, pastDue90LTD?: string,languageCode?: string,
              pastDue30YTD?:string, maturityDate?:string, origLoanAmount?:string, chargeOffDate?:string){

    this.previousBrokenPromise = previousBrokenPromise;
    this.memoPostProPay = memoPostProPay;
    this.demandLetterFlag = demandLetterFlag;
    this.demandLetterDate = demandLetterDate;
    this.paymentAmount = paymentAmount;
    this.paymentDate = paymentDate;
    this.nextPaymentDate = nextPaymentDate;
    this.pastDueAmount = pastDueAmount;
    this.principalAmountDue = principalAmountDue;
    this.principalPastDue = principalPastDue;
    this.interestDue = interestDue;
    this.lateCharges = lateCharges;
    this.otherCharges = otherCharges;
    this.collectionNotes = collectionNotes;
    this.escrowBalance = escrowBalance;
    this.daysPastDue = daysPastDue;
    this.dueDate = dueDate;
    this.promiseDate = promiseDate;
    this.lastWorkDate = lastWorkDate;
    this.lastPromiseDate = lastPromiseDate;
    this.paymentsDue = paymentsDue;
    this.actionCodes = actionCodes;
    this.resultCodes = resultCodes;
    this.contactCodes = contactCodes;
    this.collectionStatusCode = collectionStatusCode;
    this.loanStatus = loanStatus;
    this.numberOfExtensionsLTD = numberOfExtensionsLTD;
    this.numberOfExtensionsYTD = numberOfExtensionsYTD;
    this.dateOfLastExtension = dateOfLastExtension;
    this.lifePastDue = lifePastDue;
    this.queueingFlag = queueingFlag;
    this.delinquencyReason = delinquencyReason;
    this.historicalAttemptsCalls = historicalAttemptsCalls;
    this.chargeOffAmount = chargeOffAmount;
    this.nonAccrualDate = nonAccrualDate;
    this.reasonForDelinquency = reasonForDelinquency;
    this.dateStampForRfD = dateStampForRfD;
    this.interestRateChangeDate = interestRateChangeDate;
    this.endOfDrawDate = endOfDrawDate;
    this.pastDue10LTD = pastDue10LTD;
    this.pastDue30LTD = pastDue30LTD;
    this.pastDue60LTD = pastDue60LTD;
    this.pastDue90LTD = pastDue90LTD;
    this.languageCode = languageCode;
    this.chargeOffDate = chargeOffDate;

  }


  get previousBrokenPromise(): string {
    return this._previousBrokenPromise;
  }

  set previousBrokenPromise(value: string) {
    this._previousBrokenPromise = value;
  }

  get memoPostProPay(): string[] {
    return this._memoPostProPay;
  }

  set memoPostProPay(value: string[]){
    this._memoPostProPay = value;
  }

  addMemoPostProPay(value: string) {
    if(this._memoPostProPay == null){
     this._memoPostProPay = [];
    }
    this._memoPostProPay.push(value);
  }

  get demandLetterFlag(): string {
    return this._demandLetterFlag;
  }

  set demandLetterFlag(value: string) {
    this._demandLetterFlag = value;
  }

  get demandLetterDate(): string {
    return this._demandLetterDate;
  }

  set demandLetterDate(value: string) {
    this._demandLetterDate = value;
  }

  get paymentAmount(): number {
    return this._paymentAmount;
  }

  set paymentAmount(value: number) {
    this._paymentAmount = value;
  }

  get paymentDate(): string {
    return this._paymentDate;
  }

  set paymentDate(value: string) {
    this._paymentDate = value;
  }

  get nextPaymentDate(): string {
    return this._nextPaymentDate;
  }

  set nextPaymentDate(value: string) {
    this._nextPaymentDate = value;
  }

  get pastDueAmount(): number {
    return this._pastDueAmount;
  }

  set pastDueAmount(value: number) {
    this._pastDueAmount = value;
  }

  get principalAmountDue(): number {
    return this._principalAmountDue;
  }

  set principalAmountDue(value: number) {
    this._principalAmountDue = value;
  }

  get principalPastDue(): number{
    return this._principalPastDue;
  }

  set principalPastDue(value: number){
    this._principalPastDue = value;
  }

  get interestDue(): number {
    return this._interestDue;
  }

  set interestDue(value: number) {
    this._interestDue = value;
  }

  get lateCharges(): number {
    return this._lateCharges;
  }

  set lateCharges(value: number) {
    this._lateCharges = value;
  }

  get otherCharges(): number {
    return this._otherCharges;
  }

  set otherCharges(value: number) {
    this._otherCharges = value;
  }

  get collectionNotes(): string {
    return this._collectionNotes;
  }

  set collectionNotes(value: string) {
    this._collectionNotes = value;
  }

  get escrowBalance(): number {
    return this._escrowBalance;
  }

  set escrowBalance(value: number) {
    this._escrowBalance = value;
  }

  get daysPastDue(): number {
    return this._daysPastDue;
  }

  set daysPastDue(value: number) {
    this._daysPastDue = value;
  }

  get dueDate(): string {
    return this._dueDate;
  }

  set dueDate(value: string) {
    this._dueDate = value;
  }

  get promiseDate(): string {
    return this._promiseDate;
  }

  set promiseDate(value: string) {
    this._promiseDate = value;
  }

  get lastWorkDate(): string {
    return this._lastWorkDate;
  }

  set lastWorkDate(value: string) {
    this._lastWorkDate = value;
  }

  get lastPromiseDate(): string {
    return this._lastPromiseDate;
  }

  set lastPromiseDate(value: string) {
    this._lastPromiseDate = value;
  }

  get paymentsDue(): number {
    return this._paymentsDue;
  }

  set paymentsDue(value: number) {
    this._paymentsDue = value;
  }

  get actionCodes(): string {
    return this._actionCodes;
  }

  set actionCodes(value: string) {
    this._actionCodes = value;
  }

  get resultCodes(): string {
    return this._resultCodes;
  }

  set resultCodes(value: string) {
    this._resultCodes = value;
  }

  get contactCodes(): string {
    return this._contactCodes;
  }

  set contactCodes(value: string) {
    this._contactCodes = value;
  }

  get collectionStatusCode(): string {
    return this._collectionStatusCode;
  }

  set collectionStatusCode(value: string) {
    this._collectionStatusCode = value;
  }

  get loanStatus(): string {
    return this._loanStatus;
  }

  set loanStatus(value: string) {
    this._loanStatus = value;
  }

  get numberOfExtensionsYTD(): number {
    return this._numberOfExtensionsYTD;
  }

  set numberOfExtensionsYTD(value: number) {
    this._numberOfExtensionsYTD = value;
  }

  get numberOfExtensionsLTD(): number {
    return this._numberOfExtensionsLTD;
  }

  set numberOfExtensionsLTD(value: number) {
    this._numberOfExtensionsLTD = value;
  }

  get dateOfLastExtension(): string {
    return this._dateOfLastExtension;
  }

  set dateOfLastExtension(value: string) {
    this._dateOfLastExtension = value;
  }

  get lifePastDue(): string {
    return this._lifePastDue;
  }

  set lifePastDue(value: string) {
    this._lifePastDue = value;
  }

  get queueingFlag(): string {
    return this._queueingFlag;
  }

  set queueingFlag(value: string) {
    this._queueingFlag = value;
  }

  get delinquencyReason(): string {
    return this._delinquencyReason;
  }

  set delinquencyReason(value: string) {
    this._delinquencyReason = value;
  }

  get historicalAttemptsCalls(): string {
    return this._historicalAttemptsCalls;
  }

  set historicalAttemptsCalls(value: string) {
    this._historicalAttemptsCalls = value;
  }

  get chargeOffAmount(): number {
    return this._chargeOffAmount;
  }

  set chargeOffAmount(value: number) {
    this._chargeOffAmount = value;
  }

  get nonAccrualDate(): string {
    return this._nonAccrualDate;
  }

  set nonAccrualDate(value: string) {
    this._nonAccrualDate = value;
  }

  get reasonForDelinquency(): string {
    return this._reasonForDelinquency;
  }

  set reasonForDelinquency(value: string) {
    this._reasonForDelinquency = value;
  }

  get dateStampForRfD(): string {
    return this._dateStampForRfD;
  }

  set dateStampForRfD(value: string) {
    this._dateStampForRfD = value;
  }

  get interestRateChangeDate(): string {
    return this._interestRateChangeDate;
  }

  set interestRateChangeDate(value: string) {
    this._interestRateChangeDate = value;
  }

  get endOfDrawDate(): string {
    return this._endOfDrawDate;
  }

  set endOfDrawDate(value: string) {
    this._endOfDrawDate = value;
  }

  get pastDue10LTD(): string {
    return this._pastDue10LTD;
  }

  set pastDue10LTD(value: string) {
    this._pastDue10LTD = value;
  }

  get pastDue30LTD(): string {
    return this._pastDue30LTD;
  }

  set pastDue30LTD(value: string) {
    this._pastDue30LTD = value;
  }

  get pastDue60LTD(): string {
    return this._pastDue60LTD;
  }

  set pastDue60LTD(value: string) {
    this._pastDue60LTD = value;
  }

  get pastDue90LTD(): string {
    return this._pastDue90LTD;
  }

  set pastDue90LTD(value: string) {
    this._pastDue90LTD = value;
  }

  get languageCode(): string {
    return this._languageCode;
  }

  set languageCode(value: string) {
    this._languageCode = value;
  }


  set pastDue30YTD(value:string){
    this._pastDue30YTD = value;
  }

  get pastDue30YTD():string{
    return this._pastDue30YTD;
  }

  set maturityDate(value:string){
    this._maturityDate = value;
  }

  get maturityDate():string{
    return this._maturityDate;
  }

  set origLoanAmount(value:string){
    this._origLoanAmount = value;
  }

  get origLoanAmount():string{
    return this._origLoanAmount;
  }
  get chargeOffDate(): string {
    return this._chargeOffDate;
  }

  set chargeOffDate(value: string) {
    this._chargeOffDate = value;
  }

}

export class AccountLoan {
  private _collateralInformation: string;
  private _officer: string;
  private _loanType: string;
  private _currentBalance: number;
  private _currentPayOff: number;
  private _loanDate: string;
  private _loanTerm: string;
  private _rate: string;
  private _ltv: string;
  private _appraisedAmount: number;
  private _lienPosition: number;
  private _updatedAppraisal: string;
  private _updatedAppraisalDate: string;
  private _alertMessages: string;
  private _collateralAddress: string;
  private _escrowAmountDue: number;
  private _escrowChangeDate: string;
  private _specialMessages: string;
  private _user1Id: number;
  private _achAftFlag: string;
  private _mortgageBalance: number;
  private _mortgageBalanceUpdatedDate: string;

  constructor(collateralInformation?: string, officer?: string, loanType?: string, currentBalance?: number, currentPayOff?: number, loanDate?: string,
              loanTerm?: string, rate?: string, ltv?: string, appraisedAmount?: number, lienPosition?: number, updatedAppraisal?: string, updatedAppraisalDate?: string,
              alertMessages?: string, collateralAddress?: string, escrowAmountDue?: number, escrowChangeDate?: string, specialMessages?: string, user1Id?: number,
              achAftFlag?: string, mortgageBalance?: number, mortgageBalanceUpdatedDate?: string){

    this.collateralInformation = collateralInformation;
    this.officer = officer;
    this.loanType = loanType;
    this.currentBalance = currentBalance;
    this.currentPayOff = currentPayOff;
    this.loanDate = loanDate;
    this.loanTerm = loanTerm;
    this.rate = rate;
    this.ltv = ltv;
    this.appraisedAmount = appraisedAmount;
    this.lienPosition = lienPosition;
    this.updatedAppraisal = updatedAppraisal;
    this.updatedAppraisalDate = updatedAppraisalDate;
    this.alertMessages = alertMessages;
    this.collateralAddress = collateralAddress;
    this.escrowAmountDue = escrowAmountDue;
    this.escrowChangeDate = escrowChangeDate;
    this.specialMessages = specialMessages;
    this.user1Id  = user1Id;
    this.achAftFlag = achAftFlag;
    this.mortgageBalance = mortgageBalance;
    this.mortgageBalanceUpdatedDate = mortgageBalanceUpdatedDate;
  }


  get collateralInformation(): string {
    return this._collateralInformation;
  }

  set collateralInformation(value: string) {
    this._collateralInformation = value;
  }

  get officer(): string {
    return this._officer;
  }

  set officer(value: string) {
    this._officer = value;
  }

  get loanType(): string {
    return this._loanType;
  }

  set loanType(value: string) {
    this._loanType = value;
  }

  get currentBalance(): number {
    return this._currentBalance;
  }

  set currentBalance(value: number) {
    this._currentBalance = value;
  }

  get currentPayOff(): number {
    return this._currentPayOff;
  }

  set currentPayOff(value: number) {
    this._currentPayOff = value;
  }

  get loanDate(): string {
    return this._loanDate;
  }

  set loanDate(value: string) {
    this._loanDate = value;
  }

  get loanTerm(): string {
    return this._loanTerm;
  }

  set loanTerm(value: string) {
    this._loanTerm = value;
  }

  get rate(): string {
    return this._rate;
  }

  set rate(value: string) {
    this._rate = value;
  }

  get ltv(): string {
    return this._ltv;
  }

  set ltv(value: string) {
    this._ltv = value;
  }

  get appraisedAmount(): number {
    return this._appraisedAmount;
  }

  set appraisedAmount(value: number) {
    this._appraisedAmount = value;
  }

  get lienPosition(): number {
    return this._lienPosition;
  }

  set lienPosition(value: number) {
    this._lienPosition = value;
  }

  get updatedAppraisal(): string {
    return this._updatedAppraisal;
  }

  set updatedAppraisal(value: string) {
    this._updatedAppraisal = value;
  }

  get updatedAppraisalDate(): string {
    return this._updatedAppraisalDate;
  }

  set updatedAppraisalDate(value: string) {
    this._updatedAppraisalDate = value;
  }

  get alertMessages(): string {
    return this._alertMessages;
  }

  set alertMessages(value: string) {
    this._alertMessages = value;
  }

  get collateralAddress(): string {
    return this._collateralAddress;
  }

  set collateralAddress(value: string) {
    this._collateralAddress = value;
  }

  get escrowAmountDue(): number {
    return this._escrowAmountDue;
  }

  set escrowAmountDue(value: number) {
    this._escrowAmountDue = value;
  }

  get escrowChangeDate(): string {
    return this._escrowChangeDate;
  }

  set escrowChangeDate(value: string) {
    this._escrowChangeDate = value;
  }

  get specialMessages(): string {
    return this._specialMessages;
  }

  set specialMessages(value: string) {
    this._specialMessages = value;
  }

  get user1Id(): number {
    return this._user1Id;
  }

  set user1Id(value: number) {
    this._user1Id = value;
  }

  get achAftFlag(): string {
    return this._achAftFlag;
  }

  set achAftFlag(value: string) {
    this._achAftFlag = value;
  }

  get mortgageBalance(): number {
    return this._mortgageBalance;
  }

  set mortgageBalance(value: number) {
    this._mortgageBalance = value;
  }

  get mortgageBalanceUpdatedDate(): string {
    return this._mortgageBalanceUpdatedDate;
  }

  set mortgageBalanceUpdatedDate(value: string) {
    this._mortgageBalanceUpdatedDate = value;
  }
}

export class AccountLossMitigation {
  private _foreclosureFlag: string;
  private _foreclosureDate: string;
  private _ticklers: string;
  private _ticklerDates: string;
  private _actionCodes: string;
  private _actionStatus: string;
  private _restructuredDebtFlag: string;
  private _restructuredDate: string;

  constructor(foreclosureFlag?: string, foreclosureDate?: string, ticklers?: string, ticklerDates?: string, actionCodes?: string, actionStatus?: string,
              restructuredDebtFlag?: string, restructuredDate?: string){
    this.foreclosureFlag = foreclosureFlag;
    this.foreclosureDate = foreclosureDate;
    this.ticklers = ticklers;
    this.ticklerDates = ticklerDates;
    this.actionCodes = actionCodes;
    this.actionStatus = actionStatus;
    this.restructuredDebtFlag = restructuredDebtFlag;
    this.restructuredDate = restructuredDate;

  }

  get foreclosureFlag(): string {
    return this._foreclosureFlag;
  }

  set foreclosureFlag(value: string) {
    this._foreclosureFlag = value;
  }

  get foreclosureDate(): string {
    return this._foreclosureDate;
  }

  set foreclosureDate(value: string) {
    this._foreclosureDate = value;
  }

  get ticklers(): string {
    return this._ticklers;
  }

  set ticklers(value: string) {
    this._ticklers = value;
  }

  get ticklerDates(): string {
    return this._ticklerDates;
  }

  set ticklerDates(value: string) {
    this._ticklerDates = value;
  }

  get actionCodes(): string {
    return this._actionCodes;
  }

  set actionCodes(value: string) {
    this._actionCodes = value;
  }

  get actionStatus(): string {
    return this._actionStatus;
  }

  set actionStatus(value: string) {
    this._actionStatus = value;
  }

  get restructuredDebtFlag(): string {
    return this._restructuredDebtFlag;
  }

  set restructuredDebtFlag(value: string) {
    this._restructuredDebtFlag = value;
  }

  get restructuredDate(): string {
    return this._restructuredDate;
  }

  set restructuredDate(value: string) {
    this._restructuredDate = value;
  }
}

export class AccountBankruptcy {
  private _bankruptcyType: string;
  private _borrowerAttorneyInfo: string;
  private _bankAttorneyInfo: string;
  private _trusteeInfo: string;
  private _dateFiled: string;
  private _dateNoticeReceived: string;
  private _caseNumber: number;
  private _dischargeDismissalFlag: string;
  private _dischargeDismissalDate: string;
  private _ticklers: string;
  private _ticklerDates: string;
  private _actionCodes: string;
  private _actionStatus: string;
  private _bankruptcyStopCodes: string;

  constructor(bankruptcyType?: string, borrowerAttorneyInfo?: string, bankAttorneyInfo?: string, trusteeInfo?: string, dateFiled?: string, dateNoticeReceived?: string,
              caseNumber?: number, dischargeDismissalFlag?: string, dischargeDismissalDate?: string, ticklers?: string, ticklerDates?: string, actionCodes?: string,
              actionStatus?: string, bankruptcyStopCodes?: string){

    this.bankruptcyType = bankruptcyType;
    this.borrowerAttorneyInfo = borrowerAttorneyInfo;
    this.bankAttorneyInfo = bankAttorneyInfo;
    this.trusteeInfo = trusteeInfo;
    this.dateFiled = dateFiled;
    this.dateNoticeReceived = dateNoticeReceived;
    this.caseNumber = caseNumber;
    this.dischargeDismissalFlag = dischargeDismissalFlag;
    this.dischargeDismissalDate = dischargeDismissalDate;
    this.ticklers = ticklers;
    this.ticklerDates = ticklerDates;
    this.actionCodes = actionCodes;
    this.actionStatus = actionStatus;
    this.bankruptcyStopCodes = bankruptcyStopCodes;

  }

  get bankruptcyType(): string {
    return this._bankruptcyType;
  }

  set bankruptcyType(value: string) {
    this._bankruptcyType = value;
  }

  get borrowerAttorneyInfo(): string {
    return this._borrowerAttorneyInfo;
  }

  set borrowerAttorneyInfo(value: string) {
    this._borrowerAttorneyInfo = value;
  }

  get bankAttorneyInfo(): string {
    return this._bankAttorneyInfo;
  }

  set bankAttorneyInfo(value: string) {
    this._bankAttorneyInfo = value;
  }

  get trusteeInfo(): string {
    return this._trusteeInfo;
  }

  set trusteeInfo(value: string) {
    this._trusteeInfo = value;
  }

  get dateFiled(): string {
    return this._dateFiled;
  }

  set dateFiled(value: string) {
    this._dateFiled = value;
  }

  get dateNoticeReceived(): string {
    return this._dateNoticeReceived;
  }

  set dateNoticeReceived(value: string) {
    this._dateNoticeReceived = value;
  }

  get caseNumber(): number {
    return this._caseNumber;
  }

  set caseNumber(value: number) {
    this._caseNumber = value;
  }

  get dischargeDismissalFlag(): string {
    return this._dischargeDismissalFlag;
  }

  set dischargeDismissalFlag(value: string) {
    this._dischargeDismissalFlag = value;
  }

  get dischargeDismissalDate(): string {
    return this._dischargeDismissalDate;
  }

  set dischargeDismissalDate(value: string) {
    this._dischargeDismissalDate = value;
  }

  get ticklers(): string {
    return this._ticklers;
  }

  set ticklers(value: string) {
    this._ticklers = value;
  }

  get ticklerDates(): string {
    return this._ticklerDates;
  }

  set ticklerDates(value: string) {
    this._ticklerDates = value;
  }

  get actionCodes(): string {
    return this._actionCodes;
  }

  set actionCodes(value: string) {
    this._actionCodes = value;
  }

  get actionStatus(): string {
    return this._actionStatus;
  }

  set actionStatus(value: string) {
    this._actionStatus = value;
  }

  get bankruptcyStopCodes(): string {
    return this._bankruptcyStopCodes;
  }

  set bankruptcyStopCodes(value: string) {
    this._bankruptcyStopCodes = value;
  }
}

export class AccountForeclosure {
  private _borrowerAttorneyInfo: string;
  private _bankAttorneyInfo: string;
  private _dateFiled: string;
  private _dateNoticeReceived: string;
  private _caseNumber: number;
  private _litigationCode: string;
  private _ticklers: string;
  private _ticklerDates: string;
  private _actionCodes: string;
  private _actionStatus: string;

  constructor(borrowerAttorneyInfo?: string, bankAttorneyInfo?: string, dateFiled?: string, dateNoticeReceived?: string, caseNumber?: number, litigationCode?: string,
              ticklers?: string, ticklerDates?: string, actionCodes?: string, actionStatus?: string){

    this.borrowerAttorneyInfo = borrowerAttorneyInfo;
    this.bankAttorneyInfo = bankAttorneyInfo;
    this.dateFiled = dateFiled;
    this.dateNoticeReceived = dateNoticeReceived;
    this.caseNumber = caseNumber;
    this.litigationCode = litigationCode;
    this.ticklers = ticklers;
    this.ticklerDates = ticklerDates;
    this.actionCodes = actionCodes;
    this.actionStatus = actionStatus;

  }

  get borrowerAttorneyInfo(): string {
    return this._borrowerAttorneyInfo;
  }

  set borrowerAttorneyInfo(value: string) {
    this._borrowerAttorneyInfo = value;
  }

  get bankAttorneyInfo(): string {
    return this._bankAttorneyInfo;
  }

  set bankAttorneyInfo(value: string) {
    this._bankAttorneyInfo = value;
  }

  get dateFiled(): string {
    return this._dateFiled;
  }

  set dateFiled(value: string) {
    this._dateFiled = value;
  }

  get dateNoticeReceived(): string {
    return this._dateNoticeReceived;
  }

  set dateNoticeReceived(value: string) {
    this._dateNoticeReceived = value;
  }

  get caseNumber(): number {
    return this._caseNumber;
  }

  set caseNumber(value: number) {
    this._caseNumber = value;
  }

  get litigationCode(): string {
    return this._litigationCode;
  }

  set litigationCode(value: string) {
    this._litigationCode = value;
  }

  get ticklers(): string {
    return this._ticklers;
  }

  set ticklers(value: string) {
    this._ticklers = value;
  }

  get ticklerDates(): string {
    return this._ticklerDates;
  }

  set ticklerDates(value: string) {
    this._ticklerDates = value;
  }

  get actionCodes(): string {
    return this._actionCodes;
  }

  set actionCodes(value: string) {
    this._actionCodes = value;
  }

  get actionStatus(): string {
    return this._actionStatus;
  }

  set actionStatus(value: string) {
    this._actionStatus = value;
  }
}

export class AccountAdditionalInfo {
  private _promptScriptDecisionTree: string;
  private _relatedAccounts: string;
  private _riskRating: number;
  private _riskRatingDate: string;
  private _vantage3Score: number;
  private _vantage3ScoreDate: string;
  private _ficoScore: number;
  private _ficoScoreDate: string;
  private _bankruptcyScore: number;
  private _bankruptcyScoreDate: string;
  private _eaPcFlag: string;
  private _historicalFicoVantageScores: number;
  private _collateralTrackingInformation: string;


  constructor(promptScriptDecisionTree?: string, relatedAccounts?: string, riskRating?: number, riskRatingDate?: string, vantage3Score?: number, vantage3ScoreDate?: string,
              ficoScore?: number, ficoScoreDate?: string, bankruptcyScore?: number, bankruptcyScoreDate?: string, eaPcFlag?: string, historicalFicoVantageScores?: number,
              collateralTrackingInformation?: string){

    this.promptScriptDecisionTree = promptScriptDecisionTree;
    this.relatedAccounts = relatedAccounts;
    this.riskRating = riskRating;
    this.riskRatingDate = riskRatingDate;
    this.vantage3Score = vantage3Score;
    this.vantage3ScoreDate = vantage3ScoreDate;
    this.ficoScore = ficoScore;
    this.ficoScoreDate = ficoScoreDate;
    this.bankruptcyScore = bankruptcyScore;
    this.bankruptcyScoreDate = bankruptcyScoreDate;
    this.eaPcFlag = eaPcFlag;
    this.historicalFicoVantageScores = historicalFicoVantageScores;
    this.collateralTrackingInformation = collateralTrackingInformation;
  }

  get promptScriptDecisionTree(): string {
    return this._promptScriptDecisionTree;
  }

  set promptScriptDecisionTree(value: string) {
    this._promptScriptDecisionTree = value;
  }

  get relatedAccounts(): string {
    return this._relatedAccounts;
  }

  set relatedAccounts(value: string) {
    this._relatedAccounts = value;
  }

  get riskRating(): number {
    return this._riskRating;
  }

  set riskRating(value: number) {
    this._riskRating = value;
  }

  get riskRatingDate(): string {
    return this._riskRatingDate;
  }

  set riskRatingDate(value: string) {
    this._riskRatingDate = value;
  }

  get vantage3Score(): number {
    return this._vantage3Score;
  }

  set vantage3Score(value: number) {
    this._vantage3Score = value;
  }

  get vantage3ScoreDate(): string {
    return this._vantage3ScoreDate;
  }

  set vantage3ScoreDate(value: string) {
    this._vantage3ScoreDate = value;
  }

  get ficoScore(): number {
    return this._ficoScore;
  }

  set ficoScore(value: number) {
    this._ficoScore = value;
  }

  get ficoScoreDate(): string {
    return this._ficoScoreDate;
  }

  set ficoScoreDate(value: string) {
    this._ficoScoreDate = value;
  }

  get bankruptcyScore(): number {
    return this._bankruptcyScore;
  }

  set bankruptcyScore(value: number) {
    this._bankruptcyScore = value;
  }

  get bankruptcyScoreDate(): string {
    return this._bankruptcyScoreDate;
  }

  set bankruptcyScoreDate(value: string) {
    this._bankruptcyScoreDate = value;
  }

  get eaPcFlag(): string {
    return this._eaPcFlag;
  }

  set eaPcFlag(value: string) {
    this._eaPcFlag = value;
  }

  get historicalFicoVantageScores(): number {
    return this._historicalFicoVantageScores;
  }

  set historicalFicoVantageScores(value: number) {
    this._historicalFicoVantageScores = value;
  }

  get collateralTrackingInformation(): string {
    return this._collateralTrackingInformation;
  }

  set collateralTrackingInformation(value: string) {
    this._collateralTrackingInformation = value;
  }
}

export class AccountDep{
  private _customerId: string;
  private _openDate: string;
  private _closeDate: string;
  private _colBal: string;
  private _curBal: string;
  private _avlBal: string;
  private _oDPrvlgAmt: string;
  private _lastODDt: string;
  private _hldAmt: string;
  private _lastDepDate: string;
  private _lastDepAmt: string;
  private _chgdOffAmt: string;
  private _officer: string;
  private _branch: string;
  private _daysOverdrawn;
  private _chargeOffDate: string;
  private _amountChargedOff: string;
  private _itemsBalance: string;
  private _nfsFeesBalance: string;
  private _svcChargeBalance: string;
  private _fsOrigBal: string;
  private _fsItemsBal: string;
  private _fsDate: string;
  private _fsLastPayAmt: string;
  private _fsPayFreq: string;
  private _fsPayAmt: string;
  private _fsNextPayDate: string;
  private _fsLastPayDate: string;
  private _fsPartialPayAmt: string;

  constructor(){

  }

  get customerId(): string{
    return this._customerId;
  }

  set customerId(value: string){
    this._customerId = value;
  }

  get openDate(): string{
    return this._openDate;
  }

  set openDate(value: string){
    this._openDate = value;
  }

  get closeDate(): string{
    return this._closeDate;
  }

  set closeDate(value: string){
    this._closeDate = value;
  }

  get colBal(): string{
    return this._colBal;
  }

  set colBal(value: string){
    this._colBal = value;
  }

  get curBal(): string{
    return this._curBal;
  }

  set curBal(value: string){
    this._curBal = value;
  }

  get avlBal(){
    return this._avlBal;
  }

  set avlBal(value: string){
    this._avlBal = value;
  }

  get oDPrvlgAmt(){
    return this._oDPrvlgAmt;
  }

  set oDPrvlgAmt(value: string){
    this._oDPrvlgAmt = value;
  }

  get lastODDt(): string{
    return this._lastODDt;
  }

  set lastODDt(value: string){
    this._lastODDt = value;
  }

  get hldAmt():string{
    return this._hldAmt;
  }

  set hldAmt(value: string){
    this._hldAmt = value;
  }

  get lastDepDate(): string{
    return this._lastDepDate;
  }

  set lastDepDate(value: string){
    this._lastDepDate = value;
  }

  get lastDepAmt():string{
    return this._lastDepAmt;
  }

  set lastDepAmt(value: string){
    this._lastDepAmt = value;
  }

  get chgdOffAmt():string{
    return this._chgdOffAmt;
  }

  set chgdOffAmt(value: string){
    this._chgdOffAmt = value;
  }

  get officer(): string{
    return this._officer;
  }

  set officer(value: string){
    this._officer = value;
  }

  get branch(): string{
    return this._branch;
  }

  set branch(value: string){
    this._branch = value;
  }

  get daysOverdrawn(): string{
    return this._daysOverdrawn;
  }

  set daysOverdrawn(value: string){
    this._daysOverdrawn = value;
  }

  get chargeOffDate(): string{
    return this._chargeOffDate;
  }

  set chargeOffDate(value: string){
    this._chargeOffDate = value;
  }

  get amountChargedOff(): string{
    return this._amountChargedOff;
  }

  set amountChargedOff(value: string){
    this._amountChargedOff = value;
  }

  get itemsBalance(): string{
    return this._itemsBalance;
  }

  set itemsBalance(value: string){
    this._itemsBalance = value;
  }

  get nfsFeesBalance(): string{
    return this._nfsFeesBalance;
  }

  set nfsFeesBalance(value: string){
    this._nfsFeesBalance = value;
  }

  get svcChargeBalance(): string{
    return this._svcChargeBalance;
  }

  set svcChargeBalance(value: string){
    this._svcChargeBalance = value;
  }

  get fsOrigBal(): string{
    return this._fsOrigBal;
  }

  set fsOrigBal(value: string){
    this._fsOrigBal = value;
  }

  get fsItemsBal(): string{
    return this._fsItemsBal;
  }

  set fsItemsBal(value: string){
    this._fsItemsBal = value;
  }

  get fsDate(): string{
    return this._fsDate;
  }

  set fsDate(value: string){
    this._fsDate = value;
  }

  get fsLastPayAmt(): string{
    return this._fsLastPayAmt;
  }

  set fsLastPayAmt(value: string){
    this._fsLastPayAmt = value;
  }

  get fsPayFreq(): string{
    return this._fsPayFreq;
  }

  set fsPayFreq(value: string){
    this._fsPayFreq = value;
  }

  get fsPayAmt(): string{
    return this._fsPayAmt;
  }

  set fsPayAmt(value: string){
    this._fsPayAmt = value;
  }

  get fsNextPayDate(){
    return this._fsNextPayDate;
  }

  set fsNextPayDate(value: string){
    this._fsNextPayDate = value;
  }

  get fsLastPayDate(): string{
    return this._fsLastPayDate;
  }

  set fsLastPayDate(value: string){
    this._fsLastPayDate = value;
  }

  get fsPartialPayAmt(): string{
    return this._fsPartialPayAmt;
  }

  set fsPartialPayAmt(value: string){
    this._fsPartialPayAmt = value;
  }



}

export class Account {
  private _accountId: string;
  private _accountType: string;
  private _campaignRecordId: string;
  private _customer: Customer;

  private _productCode: string;
  private _productDescription: string;
  private _amount: number;
  private _stateDescription: string;
  private _relationDescription: string;

  private _collection: AccountCollection;
  private _loan: AccountLoan;
  private _lossMitigation: AccountLossMitigation;
  private _bankruptcy: AccountBankruptcy;
  private _foreclosure: AccountForeclosure;
  private _additionalInfo: AccountAdditionalInfo;

  private _history: AccountHistoryEntry[];
  private _accountDep: AccountDep;

  constructor(campaignRecordId?: string, accountId?: string, accountType?: string,customer?: Customer,relationDescription?: string,
              stateDescription?:string, amount?: number, productDescription?: string,productCode?: string, collection?: AccountCollection,
              loan?:AccountLoan, lossMitigation?: AccountLossMitigation, bankruptcy?: AccountBankruptcy, foreclosure?: AccountForeclosure,
              additionalInfo?: AccountAdditionalInfo, history?:AccountHistoryEntry[])
  {

    this.campaignRecordId = campaignRecordId;
    this.accountId = accountId;
    this.accountType = accountType;
    this.customer = customer;
    this.relationDescription = relationDescription;
    this.stateDescription = stateDescription;
    this.amount = amount;
    this.productDescription = productDescription;
    this.productCode = productCode;
    this.collection = collection;
    this.loan = loan;
    this.lossMitigation = lossMitigation;
    this.bankruptcy = bankruptcy;
    this.foreclosure = foreclosure;
    this.history = history;
    this.additionalInfo = additionalInfo;
  }

  get campaignRecordId(): string {
    return this._campaignRecordId;
  }

  set campaignRecordId(value: string) {
    this._campaignRecordId = value;
  }

  get accountId(): string {
    return this._accountId;
  }

  set accountId(value: string) {
    this._accountId = value;
  }

  get accountType(): string {
    return this._accountType;
  }

  set accountType(value: string) {
    this._accountType = value;
  }

  get customer(): Customer {
    return this._customer;
  }

  set customer(value: Customer) {
    this._customer = value;
  }

  get relationDescription(): string {
    return this._relationDescription;
  }

  set relationDescription(value: string) {
    this._relationDescription = value;
  }
  get stateDescription(): string {
    return this._stateDescription;
  }

  set stateDescription(value: string) {
    this._stateDescription = value;
  }
  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }
  get productDescription(): string {
    return this._productDescription;
  }

  set productDescription(value: string) {
    this._productDescription = value;
  }
  get productCode(): string {
    return this._productCode;
  }

  set productCode(value: string) {
    this._productCode = value;
  }

  get collection(): AccountCollection {
    return this._collection;
  }

  set collection(value: AccountCollection) {
    this._collection = value;
  }

  get loan(): AccountLoan {
    return this._loan;
  }

  set loan(value: AccountLoan) {
    this._loan = value;
  }

  get lossMitigation(): AccountLossMitigation {
    return this._lossMitigation;
  }

  set lossMitigation(value: AccountLossMitigation) {
    this._lossMitigation = value;
  }

  get bankruptcy(): AccountBankruptcy {
    return this._bankruptcy;
  }

  set bankruptcy(value: AccountBankruptcy) {
    this._bankruptcy = value;
  }

  get foreclosure(): AccountForeclosure {
    return this._foreclosure;
  }

  set foreclosure(value: AccountForeclosure) {
    this._foreclosure = value;
  }

  get additionalInfo(): AccountAdditionalInfo {
    return this._additionalInfo;
  }

  set additionalInfo(value: AccountAdditionalInfo) {
    this._additionalInfo = value;
  }

  get history(): AccountHistoryEntry[] {
    return this._history;
  }

  set history(value: AccountHistoryEntry[]){
    this._history = value;
  }

  get accountDep(): AccountDep{
    return this._accountDep;
  }

  set accountDep(value: AccountDep){
    this._accountDep = value;
  }

  addHistoryEntry(histEntry: AccountHistoryEntry) {
    if (this._history == null) {
      this._history = [];
    }
    this._history.push(histEntry);
  }

  resetHistory() {
    this._history = [];
  }



}


