import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Customer} from "../../models/customer";
import {Phone} from "../../models/phone";
import {DataService} from "../../services/data.service";
import {GlobalStateService} from "../../services/global-state.service";
import {MakeCallEvent} from "../manage-account/manage-account.component";
import {ModalDismissReasons, NgbModal, NgbPopoverConfig} from "@ng-bootstrap/ng-bootstrap";
import {CustomerConsent} from "../../models/customer-consent";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {CoinConstants} from "../../services/coin-constants";

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

  private closeResult: string;
  private waitingResponse: boolean = false;
  private isModalOpen: boolean = false;

  model: CustomerConsent = new CustomerConsent();
  customerConsents: CustomerConsent[];
  customerConsentsFilter: CustomerConsent[];

  constructor(private modalService: NgbModal, private _dataService: DataService, private _globalStateService: GlobalStateService,
              private _userFeedbackService: UserFeedbackService) { }

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

  //calls to addCustomerConsent and sets the value of the model (true/false) consent, notes.
  changeConsent(model: CustomerConsent, consent: boolean, number: string){
    model.hasConsent = consent;
    model.phoneNumber = number;

    this.customer.hasConsent = consent;

    this._dataService.addCustomerConsent(this.customer, model, this._globalStateService.loggedAgent).then(()=>{
      this.refreshCustomerConsents();
      this._userFeedbackService.handleSuccess("New customer consent added");

    }).catch(err=>{
      this._userFeedbackService.handleError("Error adding new customer consent");
      console.log(err);
    })
  }

  //refresh customers when click on changeConsent (Grant/Revoke) button
  refreshCustomerConsents(){
    this.loadCustomerConsents();
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


  openModal(content) {
    this.isModalOpen = true;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.isModalOpen = false;
    }, (reason) => {
      this.closeResult = `Dismissed ${CustomerDetailComponent.getDismissReason(reason)}`;
      this.isModalOpen = false;
    })
  }

  get isOpen():boolean {
    return this.isModalOpen;
  }

  set isOpen(value:boolean){
    this.isModalOpen = value;
  }

  static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
