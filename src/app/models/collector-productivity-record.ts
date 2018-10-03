export class CollectorProductivityRecord {
  private _userCode: string;
  private _outboundCalls: number;
  private _hoursWorked: string;
  private _avgCallsPerHour: number;
  private _contact: number;
  private _promises: number;
  private _paymentReceived: number;
  private _incomingCalls: number;
  private _contactPct: number;
  private _promiseToContactPct: number;
  private _totalCalls: number;


  constructor(userCode?: string, outboundCalls?: number, hoursWorked?: string, averageCallsPerHour?: number,
              contact?: number, promises?: number, paymentReceived?: number, incomingCalls?: number, contactPercentage?: number,
              promiseToContactPercentage?: number, totalCalls?: number) {


    this.userCode = userCode;
    this.outboundCalls = outboundCalls;
    this.hoursWorked = hoursWorked;
    this.averageCallsPerHour = averageCallsPerHour;
    this.contact = contact;
    this.promises = promises;
    this.paymentReceived = paymentReceived;
    this.incomingCalls = incomingCalls;
    this.contactPercentage = contactPercentage;
    this.promiseToContactPercentage = promiseToContactPercentage;
    this.totalCalls = totalCalls;

  }


  get userCode(): string {
    return this._userCode;
  }

  set userCode(value: string) {
    this._userCode = value;
  }

  get outboundCalls(): number {
    return this._outboundCalls;
  }

  set outboundCalls(value: number) {
    this._outboundCalls = value;
  }

  get hoursWorked(): string {
    return this._hoursWorked;
  }

  set hoursWorked(value: string) {
    this._hoursWorked = value;
  }

  get averageCallsPerHour(): number {
    return this._avgCallsPerHour;
  }

  set averageCallsPerHour(value: number) {
    this._avgCallsPerHour = value;
  }

  get contact(): number {
    return this._contact;
  }

  set contact(value: number) {
    this._contact = value;
  }

  get promises(): number {
    return this._promises;
  }

  set promises(value: number) {
    this._promises = value;
  }

  get paymentReceived(): number {
    return this._paymentReceived;
  }

  set paymentReceived(value: number) {
    this._paymentReceived = value;
  }

  get incomingCalls(): number {
    return this._incomingCalls;
  }

  set incomingCalls(value: number) {
    this._incomingCalls = value;
  }

  get contactPercentage(): number {
    return this._contactPct;
  }

  set contactPercentage(value: number) {
    this._contactPct = value;
  }

  get promiseToContactPercentage(): number {
    return this._promiseToContactPct;
  }

  set promiseToContactPercentage(value: number) {
    this._promiseToContactPct = value;
  }

  get totalCalls(): number {
    return this._totalCalls;
  }

  set totalCalls(value: number) {
    this._totalCalls = value;
  }

}
