import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Customer} from "../../models/customer";
import {Phone} from "../../models/phone";
import {DataService} from "../../services/data.service";
import {MakeCallEvent} from "../manage-account/manage-account.component";
import {CustomerConsent} from "../../models/customer-consent";
import {CoinConstants} from "../../services/coin-constants";
import {AutodialConsentModalComponent} from "../autodial-consent-modal/autodial-consent-modal.component";

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input() customer: Customer;
  @Input() account: Account;
  @Input() searching: boolean;
  @Input() searchingSSN: boolean;
  @Input() searchingAccountDepInfo: boolean;
  @Output() onCall = new EventEmitter<MakeCallEvent>();

  waitingResponse: boolean = false;

  model: CustomerConsent = new CustomerConsent();
  customerConsents: CustomerConsent[];
  customerConsentsFilter: CustomerConsent[];

  @ViewChild('autodialModal') private _autodialModal: AutodialConsentModalComponent;

  constructor(private _dataService: DataService) { }

  ngOnInit() {

  }

  ngOnChanges(changes){
    if(changes.customer){
      this.loadCustomerConsents();
    }
  }

  call(phone: Phone) {
    let event = new MakeCallEvent();
    event.phone = phone;
    event.isCoBorrower = false;
    this.onCall.emit(event);
  }

  //mostrar i info
  private consentsForNumber(phoneNr: string): CustomerConsent[] {
    if (!this.customerConsents) {
      return [];
    }
     this.orderByDate(this.customerConsents);
    return this.customerConsents.filter(cc => cc.phoneNumber == phoneNr);

  }

  private orderByDate(customerConsent: CustomerConsent[]){
      customerConsent.sort((a,b)=>{
        if(a.createdDate < b.createdDate){
          return 1;
        }
      });
  }

  private setConsentsforNumber(phoneNr: string){
    this.customerConsentsFilter = this.consentsForNumber(phoneNr);
  }

  private hasCustomerConsent(phoneNr: string): boolean {
    if (!this.customerConsents) {
      return null;
    }
    let last: CustomerConsent = null;
    this.customerConsents.forEach(cc => {
      if (cc.phoneNumber != phoneNr) {
        return;
      }
      if (!last || last.createdDate < cc.createdDate) {
        last = cc;
      }
    });
    if (!last) {
      return null;
    }
    return last.hasConsent;
  }


  hasMaxCallsMadeToday(phone: Phone): boolean{
    return phone.callsMadeToday >= CoinConstants.maxCallsMade;
  }

  loadCustomerConsents(){
    this.waitingResponse = true;
    this.customerConsents = [];
    this.model.note = "";
    this._dataService.getCustomerConsents(this.customer).then(res=>{
      this.customerConsents = res;
      this.waitingResponse = false;
    }).catch(err=>{
      console.log("Error retrieving customer consents");
      console.log(err);
      this.waitingResponse = false;
    })
  }

  openAutodialModal(phone: Phone) {
    this._autodialModal.open(phone);
  }
}
