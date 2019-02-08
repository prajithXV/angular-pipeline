import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../../models/customer";
import {Address} from "../../models/address";
import {AddressVerification, VerificationStatus} from "../../models/addressVerification";
import {DataService} from "../../services/data.service";
import {GlobalStateService} from "../../services/global-state.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";


@Component({
  selector: 'customer-address-modal',
  templateUrl: './customer-address-modal.component.html',
  styleUrls: ['./customer-address-modal.component.css']
})
export class CustomerAddressModalComponent implements OnInit, OnChanges {
  @Input() customer: Customer;

  customerAddresses: Address;
  verifiedAddress: AddressVerification;
  waitingChangeResponse: boolean = false;
  waitingVerifyResponse: boolean = false;
  waitingDiscardResponse: boolean = false;
  oldLastVerifiedAddress: AddressVerification = null;
  originalAddress: Address = null;

  @ViewChild('confirmationModal') private _confirmationModal: ConfirmationModalComponent;

  constructor(private _dataService: DataService, private _userFeedbackService: UserFeedbackService,
              private _globalStateService: GlobalStateService) { }

  ngOnInit() {
    if (!this.customer) return;
    this.loadCustomerAddresses();
    this.oldLastVerifiedAddress = new AddressVerification(
      this.customer.lastAddressVerification ? this.customer.lastAddressVerification.oldAddress : this.customer.mainAddress,
      this.customer.mainAddress,
      null,
      VerificationStatus.Verified,
      new Date()
    );
  }

  ngOnChanges(changes) {
    if (changes.customer) {
      this.loadCustomerAddresses();
      this.oldLastVerifiedAddress = new AddressVerification(
        this.customer.lastAddressVerification ? this.customer.lastAddressVerification.oldAddress : this.customer.mainAddress,
        this.customer.mainAddress,
        null,
        VerificationStatus.Verified,
        new Date()
      );
    }
  }

  changeCustomerAddress() {
    this.waitingChangeResponse = true;

    this.refreshVerifiedAddress(VerificationStatus.Modify);

    this._dataService.addAddressVerification(this.verifiedAddress, this.customer, this._globalStateService.loggedAgent).then(() => {
      this.customer.lastAddressVerification = this.verifiedAddress;
      this._userFeedbackService.handleSuccess("Customer address modified");
      this.loadCustomerAddresses();
      this.waitingChangeResponse = false;
    }).catch(err => {
      this._userFeedbackService.handleError("Error modifying customer address");
      this.waitingChangeResponse = false;
    });
  }

  verifyJHAddress() {
    this.waitingVerifyResponse = true;

    this.refreshVerifiedAddress(VerificationStatus.Verified);

    this._dataService.addAddressVerification(this.verifiedAddress, this.customer, this._globalStateService.loggedAgent).then(() => {
      this.customer.mainAddress = this.customerAddresses;
      this.customer.lastAddressVerification = this.verifiedAddress;
      this._userFeedbackService.handleSuccess("Customer address verified");
      this.loadCustomerAddresses();
      this.waitingVerifyResponse = false;
    }).catch(err => {
      this._userFeedbackService.handleError("Error verifying customer address");
      this.waitingVerifyResponse = false;
    });
  }

  discardModification() {
    this.waitingDiscardResponse = true;

    this._dataService.addAddressVerification(this.oldLastVerifiedAddress, this.customer, this._globalStateService.loggedAgent).then(() => {
      this.customer.lastAddressVerification = this.oldLastVerifiedAddress;
      this._userFeedbackService.handleSuccess("Customer address discarded");
      this.loadCustomerAddresses();
      this.waitingDiscardResponse = false;
    }).catch(err => {
      this._userFeedbackService.handleError("Error discarding customer address");
      this.waitingDiscardResponse = false;
    });
  }

  isDisabled() {
    return this.waitingChangeResponse || this.waitingVerifyResponse || this.waitingDiscardResponse;
  }

  isComparisonModal() {
    if (!this.customer) return false;
    return !this.customer.hasValidAddressVerification() && !this.customer.needsAddressVerification();
  }

  isDiscardOrigin() {
    return this.isComparisonModal() && !this.customer.addressesAreEqual();
  }

  isValidationOrigin() {
    return this.isComparisonModal() && this.customer.addressesAreEqual();
  }

  openConfirmationModal() {
    this._confirmationModal.open();
  }

  private refreshVerifiedAddress(status: VerificationStatus) {
    this.verifiedAddress.newAddress = this.customerAddresses;
    this.verifiedAddress.status = status;
    this.verifiedAddress.createdDate = new Date();
    if (status === VerificationStatus.Verified && this.customer.lastAddressVerification) {
      if (this.isValidationOrigin()) {
        this.verifiedAddress.note = this.customer.lastAddressVerification.note;
      }
      this.verifiedAddress.oldAddress = this.customer.lastAddressVerification.oldAddress;
    }
    else {
      this.verifiedAddress.oldAddress = this.customer.mainAddress;
    }
  }

  private loadCustomerAddresses() {
    this.originalAddress = null;
    this.verifiedAddress = new AddressVerification();
    if (this.customer.needsAddressVerification() || this.customer.hasValidAddressVerification()) {
      this.customerAddresses = this.customer.mainAddress.clone();
      this.originalAddress = this.customer.mainAddress;
    }
    else {
      this.customerAddresses = this.customer.mainAddress;
    }
  }
}
