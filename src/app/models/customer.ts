import {Account} from "./account";
import {CustomerNote} from "./customer-note";
import {Phone} from "./phone";
import {Person} from "./person";
import {Address} from "./address";
import {CallRecord} from "./call-record";


export class Customer {
  private _id: string;
  private _cifNo: string;
  private _taxId: string;
  private _socialSecurityNumber: string;

  private _mainContact: Person;
  private _mainAddress: Address;

  private _emailList: string[];
  private _accountNumber: string;
  private _phoneList: Phone[];
  private _phoneLineType: string;
  private _languageIndicator: string;
  private _market: string;
  private _specialMessageFlag: boolean;
  private _employmentInfo: string;

  private _accounts: Account[] = null;
  private _notes: CustomerNote[] = null;
  private _alerts: CustomerNote[] = null;
  private _callRecords: CallRecord[] = null;

  private _coBorrowers: Customer[] = null;
  private _todayContacts: number = null;
  private _hasConsent: boolean;


  constructor(id?: string, cifno?: string, taxId?: string, socialSecurityNumber?: string, mainContact?: Person, mainAddress?: Address,
              emailList?: string[], accountNumber?: string, phoneList?: Phone[], phoneLineType?: string, languageIndicator?: string,
              market?: string,specialMessageFlag?:boolean, employmentInfo?: string, todayContacts?: number, hasConsent?:boolean, accounts?: Account[],
              notes?: CustomerNote[], alerts?: CustomerNote[], callRecords?: CallRecord[], coBorrowers?: Customer[]){

    this.id = id;
    this.cifNo = cifno;
    this.taxId = taxId;
    this.socialSecurityNumber = socialSecurityNumber;
    this.mainContact = mainContact;
    this.mainAddress = mainAddress;
    this.accountNumber = accountNumber;
    this.phoneLineType = phoneLineType;
    this.languageIndicator = languageIndicator;
    this.market = market;
    this.specialMessageFlag = specialMessageFlag;
    this.employmentInfo = employmentInfo;
    this.todayContacts = todayContacts;
    this.hasConsent = hasConsent;
    this.accounts = accounts;
    this.notes = notes;
    this.alerts = alerts;
    this.callRecords = callRecords;
    this.coBorrowers = coBorrowers;
    this.phones = phoneList;

  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get cifNo(): string {
    return this._cifNo;
  }

  set cifNo(value: string) {
    this._cifNo = value;
  }

  get socialSecurityNumber(): string {
    return this._socialSecurityNumber;
  }

  set socialSecurityNumber(value: string) {
    this._socialSecurityNumber = value;
  }

  get accounts(): Account[] {
    return this._accounts;
  }

  set accounts(value: Account[]){
    this._accounts = value;
  }

  get taxId(): string {
    return this._taxId;
  }

  set taxId(value: string) {
    this._taxId = value;
  }

  addAccount(acc: Account) {
    if (this._accounts == null) {
      this._accounts = [];
    }
    this._accounts.push(acc);
  }

  get notes(): CustomerNote[] {
    return this._notes;
  }

  set notes(value: CustomerNote[]){
    this._notes = value;
  }

  addNote(note: CustomerNote) {
    if (this._notes == null) {
      this._notes = [];
    }
    this._notes.push(note);
  }

  resetNotes() {
    this._notes = [];
  }

  get alerts(): CustomerNote[] {
    return this._alerts;
  }

  set alerts(value: CustomerNote[]){
    this._alerts = value;
  }

  addAlert(note: CustomerNote) {
    if (this._alerts == null) {
      this._alerts = [];
    }
    this._alerts.push(note);
  }

  resetAlerts() {
    this._alerts = [];
  }

  get callRecords(): CallRecord[] {
    return this._callRecords;
  }

  set callRecords(value: CallRecord[]){
    this._callRecords = value;
  }

  addCallRecord(call: CallRecord) {
    if (this._callRecords == null) {
      this._callRecords = [];
    }
    this._callRecords.push(call);
  }

  resetCalls() {
    this._callRecords = [];
  }

  get mainContact(): Person {
    return this._mainContact;
  }

  set mainContact(value: Person) {
    this._mainContact = value;
  }

  get mainAddress(): Address {
    return this._mainAddress;
  }

  set mainAddress(value: Address) {
    this._mainAddress = value;
  }

  get eMails(): string[] {
    return this._emailList;
  }

  addeMail(email: string) {
    if (this._emailList == null) {
      this._emailList = [];
    }
    this._emailList.push(email);
  }

  get phones(): Phone[] {
    return this._phoneList;
  }

  set phones(value: Phone[]){
    this._phoneList = value;
  }

  addPhone(email: Phone) {
    if (this._phoneList == null) {
      this._phoneList = [];
    }
    this._phoneList.push(email);
  }

  get accountNumber(): string {
    return this._accountNumber;
  }

  set accountNumber(value: string) {
    this._accountNumber = value;
  }

  get phoneLineType(): string {
    return this._phoneLineType;
  }

  set phoneLineType(value: string) {
    this._phoneLineType = value;
  }

  get languageIndicator(): string {
    return this._languageIndicator;
  }

  set languageIndicator(value: string) {
    this._languageIndicator = value;
  }

  get market(): string {
    return this._market;
  }

  set market(value: string) {
    this._market = value;
  }

  get specialMessageFlag(): boolean {
    return this._specialMessageFlag;
  }

  set specialMessageFlag(value: boolean) {
    this._specialMessageFlag = value;
  }

  get employmentInfo(): string {
    return this._employmentInfo;
  }

  set employmentInfo(value: string) {
    this._employmentInfo = value;
  }

  get coBorrowers(): Customer[] {
    return this._coBorrowers;
  }

  set coBorrowers(value: Customer[]){
    this._coBorrowers = value;
  }

  get todayContacts(): number{
    return this._todayContacts;
  }

  set todayContacts(value: number){
    this._todayContacts = value;
  }

  addCoBorrower(cust: Customer) {
    if (this._coBorrowers == null) {
      this._coBorrowers = [];
    }
    this._coBorrowers.push(cust);
  }

  resetCoBorrowers() {
    this._coBorrowers = [];
  }


  get hasConsent(): boolean{
    return this._hasConsent;
  }

  set hasConsent(value: boolean){
    this._hasConsent = value;
  }

}
