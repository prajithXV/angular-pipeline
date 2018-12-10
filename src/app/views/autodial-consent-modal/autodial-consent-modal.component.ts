import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalDirective} from "ngx-bootstrap";
import {Phone} from "../../models/phone";
import {CustomerConsent} from "../../models/customer-consent";
import {DataService} from "../../services/data.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {GlobalStateService} from "../../services/global-state.service";
import {Customer} from "../../models/customer";

@Component({
  selector: 'autodial-consent-modal',
  templateUrl: './autodial-consent-modal.component.html',
  styleUrls: ['./autodial-consent-modal.component.css']
})
export class AutodialConsentModalComponent implements OnInit {
  @Input() model: CustomerConsent;
  @Input() customer: Customer;
  @Output() loadCustomerConsents = new EventEmitter<null>();

  @ViewChild('autodialModal') private _modal: ModalDirective;

  ph: Phone = null;
  waitingConsentResponse: boolean = false;
  waitingNoConsentResponse: boolean = false;

  constructor(private modalService: NgbModal, private _dataService: DataService, private _userFeedbackService: UserFeedbackService,
              private _globalStateService: GlobalStateService) { }

  ngOnInit() {
  }

  open(phone: Phone) {
    this.ph = phone;
    this.modalService.open(this._modal);
  }

  //calls to addCustomerConsent and sets the value of the model (true/false) consent, notes.
  changeConsent(model: CustomerConsent, consent: boolean, number: string, closeCallback: any){
    model.hasConsent = consent;
    model.phoneNumber = number;

    this.customer.hasConsent = consent;

    consent ? this.waitingConsentResponse = true : this.waitingNoConsentResponse = true;

    this._dataService.addCustomerConsent(this.customer, model, this._globalStateService.loggedAgent).then(()=>{
      this.loadCustConsents();
      this._userFeedbackService.handleSuccess("New customer consent added");
      this.waitingConsentResponse = this.waitingNoConsentResponse = false;
      closeCallback();
    }).catch(err=>{
      this._userFeedbackService.handleError("Error adding new customer consent");
      this.waitingConsentResponse = this.waitingNoConsentResponse = false;
      console.log(err);
    })
  }

  isDisabled() {
    return this.waitingConsentResponse || this.waitingNoConsentResponse;
  }

  private loadCustConsents() {
    this.loadCustomerConsents.emit();
  }
}
