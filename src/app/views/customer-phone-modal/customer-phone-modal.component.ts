import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../../models/customer";
import {LineType, Phone, PhoneType} from "../../models/phone";
import {PhoneListVerification} from "../../models/phoneListVerification";
import {VerificationStatus} from "../../models/addressVerification";
import {DataService} from "../../services/data.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {GlobalStateService} from "../../services/global-state.service";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'customer-phone-modal',
  templateUrl: './customer-phone-modal.component.html',
  styleUrls: ['./customer-phone-modal.component.css']
})
export class CustomerPhoneModalComponent implements OnInit {
  @Input() customer: Customer;

  customerPhones: Phone[] = [];
  verifiedPhone: PhoneListVerification;
  waitingChangeResponse: boolean = false;
  waitingVerifyResponse: boolean = false;
  waitingDiscardResponse: boolean = false;
  oldLastVerifiedPhone: PhoneListVerification = null;

  private originalPhones: Phone[] = [];

  pTypes: any = PhoneType;
  phoneTypes: Array<string> = Object.keys(this.pTypes);
  regExpPhone = new RegExp('^[0-9]*$');

  @ViewChild('confirmationModal') private _confirmationModal: ConfirmationModalComponent;

  constructor(private _dataService: DataService, private _userFeedbackService: UserFeedbackService,
              private _globalStateService: GlobalStateService) { }

  ngOnInit() {
    if (!this.customer) return;
    this.loadCustomerPhones();
    this.oldLastVerifiedPhone = new PhoneListVerification(
      this.customer.lastPhoneVerification ? this.customer.lastPhoneVerification.phones : this.customer.phones,
      this.customer.phones,
      null,
      VerificationStatus.Verified,
      new Date()
    );
  }

  ngOnChanges(changes) {
    if (changes.customer) {
      this.loadCustomerPhones();
      this.oldLastVerifiedPhone = new PhoneListVerification(
        this.customer.lastPhoneVerification ? this.customer.lastPhoneVerification.phones : this.customer.phones,
        this.customer.phones,
        null,
        VerificationStatus.Verified,
        new Date()
      );
    }
  }

  changeCustomerPhone() {
    this.waitingChangeResponse = true;

    let custPhones = this.removeDeletedPhones();
    this.refreshVerifiedPhone(VerificationStatus.Modify, custPhones);

    this._dataService.addPhoneVerification(this.verifiedPhone, this.customer, this._globalStateService.loggedAgent).then(() => {
      this.customer.lastPhoneVerification = this.verifiedPhone;
      this._userFeedbackService.handleSuccess("Customer phones modified");
      this.loadCustomerPhones();
      this.waitingChangeResponse = false;
    }).catch(err => {
      this._userFeedbackService.handleError("Error modifying customer phones");
      this.waitingChangeResponse = false;
    });
  }

  verifyJHPhone() {
    this.waitingVerifyResponse = true;

    this.refreshVerifiedPhone(VerificationStatus.Verified);

    this._dataService.addPhoneVerification(this.verifiedPhone, this.customer, this._globalStateService.loggedAgent).then(() => {
      this.customer.phones = this.customerPhones;
      this.customer.lastPhoneVerification = this.verifiedPhone;
      this._userFeedbackService.handleSuccess("Customer phones verified");
      this.loadCustomerPhones();
      this.waitingVerifyResponse = false;
    }).catch(err => {
      this._userFeedbackService.handleError("Error verifying customer phones");
      this.waitingVerifyResponse = false;
    });
  }

  discardModification() {
    this.waitingDiscardResponse = true;

    this._dataService.addPhoneVerification(this.oldLastVerifiedPhone, this.customer, this._globalStateService.loggedAgent).then(() => {
      this.customer.lastPhoneVerification = this.oldLastVerifiedPhone;
      this._userFeedbackService.handleSuccess("Customer phones discarded");
      this.loadCustomerPhones();
      this.waitingDiscardResponse = false;
    }).catch(err => {
      this._userFeedbackService.handleError("Error discarding customer phones");
      this.waitingDiscardResponse = false;
    });
  }

  isDisabled() {
    return this.waitingChangeResponse || this.waitingVerifyResponse || this.waitingDiscardResponse;
  }

  isComparisonModal() {
    if (!this.customer) return false;
    return !this.customer.hasValidPhoneVerification() && !this.customer.needsPhoneVerification() && !this.customer.phoneIsUnderCreation();
  }

  isDiscardOrigin() {
    return this.isComparisonModal() && !this.customer.phonesAreEqual();
  }

  isValidationOrigin() {
    return this.isComparisonModal() && this.customer.phonesAreEqual();
  }

  restorePhone(iPhone: number) {
    this.customerPhones[iPhone].number = this.originalPhones[iPhone].number;
    this.customerPhones[iPhone].type = this.originalPhones[iPhone].type;
    this.customerPhones[iPhone].lineType = this.originalPhones[iPhone].lineType;
    this.customerPhones[iPhone].isDeleted = false;
  }

  arePhonesDirty() {
    if (this.customerPhones.length != this.originalPhones.length) return true;
    for (let iPhone in this.customerPhones) {
      if (this.customerPhones[iPhone].isDirty(this.originalPhones[iPhone])) return true;
    }
    return false;
  }

  isPhoneDirty(iPhone: number) {
    return this.customerPhones[iPhone].isDirty(this.originalPhones[iPhone]);
  }

  arePhonesInCorrectFormat() {
    for (let phone of this.customerPhones) {
      if (!phone.isDeleted) {
        if (!phone.number || phone.number == "" || !this.regExpPhone.test(phone.number)) {
          return false;
        }
      }
    }
    return true;
  }

  areEqualPhones(phoneNumber: string, index: number) {
    for (let i = 0; i < this.customerPhones.length; ++i) {
      let phone = this.customerPhones[i];
      if (!phone.isDeleted) {
        if (!phoneNumber) {
          if (i < this.customerPhones.length) {
            for (let j = i + 1; j < this.customerPhones.length; ++j) {
              let auxPhone = this.customerPhones[j];
              if (!auxPhone.isDeleted) {
                if (phone.number === auxPhone.number) {
                  return true;
                }
              }
            }
          }
        }
        else {
          if (i != index) {
            if (phone.number === phoneNumber) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  isNewPhone(iPhone: number) {
    return iPhone >= this.originalPhones.length;
  }

  addNewPhoneField() {
    let phone = new Phone();
    phone.type = PhoneType.Home;
    this.customerPhones.push(phone);
  }

  isNewDisabled() {
    if (this.customer.phones.length < this.customerPhones.length) {
      return this.customerPhones[this.customerPhones.length - 1].number == "" ||
        !this.regExpPhone.test(this.customerPhones[this.customerPhones.length - 1].number);
    }
    return false;
  }

  removeNewPhone(index: number) {
    this.customerPhones.splice(index, 1);
  }

  removeDeletedPhones() {
    return this.customerPhones.filter(p => !p.isDeleted && p.number && p.number != '');
  }

  toggleLineType(phone: Phone) {
    phone.lineType = (phone.lineType === LineType.LandLine ? LineType.Cellular : LineType.LandLine);
  }

  customerHasPhones() {
    return this.customerPhones != null && this.customerPhones.length > 0 && this.customerPhones.find(p => !p.isDeleted);
  }

  openConfirmationModal() {
    this._confirmationModal.open();
  }

  private refreshVerifiedPhone(status: VerificationStatus, customerPhones?: Phone[]) {
    let custPhones = customerPhones ? customerPhones : this.customerPhones;
    this.verifiedPhone.newPhones = [];
    custPhones.forEach(p => {
      this.verifiedPhone.newPhones.push(p);
    });
    this.verifiedPhone.status = status;
    this.verifiedPhone.createdDate = new Date();
    if (status === VerificationStatus.Verified && this.customer.lastPhoneVerification) {
      if (this.isValidationOrigin()) {
        this.verifiedPhone.note = this.customer.lastPhoneVerification.note;
      }
      this.verifiedPhone.phones = this.customer.lastPhoneVerification.phones;
    }
    else {
      this.verifiedPhone.phones = this.customer.phones;
    }
  }

  private loadCustomerPhones() {
    this.verifiedPhone = new PhoneListVerification();
    this.customerPhones = [];
    this.originalPhones = [];
    if (this.customer.needsPhoneVerification() || this.customer.hasValidPhoneVerification()) {
      this.customer.phones.forEach(p => {
        this.customerPhones.push(p.clone());
        this.originalPhones.push(p);
      });
    }
    else {
      this.customer.phones.forEach(p => {
        this.customerPhones.push(p);
      });
    }
  }
}
