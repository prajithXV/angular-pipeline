import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../../models/customer";
import {EmailListVerification} from "../../models/emailListVerification";
import {VerificationStatus} from "../../models/addressVerification";
import {DataService} from "../../services/data.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {GlobalStateService} from "../../services/global-state.service";
import {setString} from "../../models/address";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'customer-email-modal',
  templateUrl: './customer-email-modal.component.html',
  styleUrls: ['./customer-email-modal.component.css']
})
export class CustomerEmailModalComponent implements OnInit, OnChanges {
  @Input() customer: Customer;

  customerEmails: Email[] = [];
  verifiedEmail: EmailListVerification;
  waitingChangeResponse: boolean = false;
  waitingVerifyResponse: boolean = false;
  waitingDiscardResponse: boolean = false;
  oldLastVerifiedEmail: EmailListVerification = null;

  private originalEmails: string[] = [];

  regExpEmail = new RegExp('^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$');

  @ViewChild('confirmationModal') private _confirmationModal: ConfirmationModalComponent;

  constructor(private _dataService: DataService, private _userFeedbackService: UserFeedbackService,
              private _globalStateService: GlobalStateService) { }

  ngOnInit() {
    if (!this.customer) return;
    this.loadCustomerEmails();
    this.oldLastVerifiedEmail = new EmailListVerification(
      this.customer.lastEmailVerification ? this.customer.lastEmailVerification.emails : this.customer.emails,
      this.customer.emails,
      null,
      VerificationStatus.Verified,
      new Date()
    );
  }

  ngOnChanges(changes) {
    if (changes.customer) {
      this.loadCustomerEmails();
      this.oldLastVerifiedEmail = new EmailListVerification(
        this.customer.lastEmailVerification ? this.customer.lastEmailVerification.emails : this.customer.emails,
        this.customer.emails,
        null,
        VerificationStatus.Verified,
        new Date()
      );
    }
  }

  changeCustomerEmail() {
    this.waitingChangeResponse = true;

    let custEmails = this.removeDeletedEmails();
    this.refreshVerifiedEmail(VerificationStatus.Modify, custEmails);

    this._dataService.addEmailVerification(this.verifiedEmail, this.customer, this._globalStateService.loggedAgent).then(() => {
      this.customer.lastEmailVerification = this.verifiedEmail;
      this._userFeedbackService.handleSuccess("Customer emails modified");
      this.loadCustomerEmails();
      this.waitingChangeResponse = false;
    }).catch(err => {
      this._userFeedbackService.handleError("Error modifying customer emails");
      this.waitingChangeResponse = false;
    });
  }

  verifyJHEmail() {
    this.waitingVerifyResponse = true;

    this.refreshVerifiedEmail(VerificationStatus.Verified);

    this._dataService.addEmailVerification(this.verifiedEmail, this.customer, this._globalStateService.loggedAgent).then(() => {
      this.customer.emails = this.emailsToStings(this.customerEmails);
      this.customer.lastEmailVerification = this.verifiedEmail;
      this._userFeedbackService.handleSuccess("Customer emails verified");
      this.loadCustomerEmails();
      this.waitingVerifyResponse = false;
    }).catch(err => {
      this._userFeedbackService.handleError("Error verifying customer emails");
      this.waitingVerifyResponse = false;
    });
  }

  discardModification() {
    this.waitingDiscardResponse = true;

    this._dataService.addEmailVerification(this.oldLastVerifiedEmail, this.customer, this._globalStateService.loggedAgent).then(() => {
      this.customer.lastEmailVerification = this.oldLastVerifiedEmail;
      this._userFeedbackService.handleSuccess("Customer emails discarded");
      this.loadCustomerEmails();
      this.waitingDiscardResponse = false;
    }).catch(err => {
      this._userFeedbackService.handleError("Error discarding customer emails");
      this.waitingDiscardResponse = false;
    });
  }

  isDisabled() {
    return this.waitingChangeResponse || this.waitingVerifyResponse || this.waitingDiscardResponse;
  }

  isComparisonModal() {
    if (!this.customer) return;
    return !this.customer.hasValidEmailVerification() && !this.customer.needsEmailVerification();
  }

  isDiscardOrigin() {
    return this.isComparisonModal() && !this.customer.emailsAreEqual();
  }

  isValidationOrigin() {
    return this.isComparisonModal() && this.customer.emailsAreEqual();
  }

  restoreEmail(iEmail: number) {
    this.customerEmails[iEmail].email = this.originalEmails[iEmail];
    this.customerEmails[iEmail].isDeleted = false;
  }

  areEmailsDirty() {
    if (this.customerEmails.length != this.originalEmails.length) return true;
    for (let iEmail in this.customerEmails) {
      if (this.customerEmails[iEmail].isDirty(this.originalEmails[iEmail])) return true;
    }
    return false;
  }

  isEmailDirty(iEmail: number) {
    return this.customerEmails[iEmail].isDirty(this.originalEmails[iEmail]);
  }

  areEmailsInCorrectFormat() {
    for (let email of this.customerEmails) {
      if (!email.isDeleted) {
        if (!this.regExpEmail.test(email.email)) {
          return false;
        }
      }
    }
    return true;
  }

  areEqualEmails(emailText: string, index: number) {
    for (let i = 0; i < this.customerEmails.length; ++i) {
      let email = this.customerEmails[i];
      if (!email.isDeleted) {
        if (!emailText) {
          if (i < this.customerEmails.length) {
            for (let j = i + 1; j < this.customerEmails.length; ++j) {
              let auxEmail = this.customerEmails[j];
              if (!auxEmail.isDeleted) {
                if (email.email === auxEmail.email) {
                  return true;
                }
              }
            }
          }
        }
        else {
          if (i != index) {
            if (email.email === emailText) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  isEmptyEmail(email: string) {
    return email == null || email == "";
  }

  isNewEmail(iEmail: number) {
    return iEmail >= this.originalEmails.length;
  }

  addNewEmailField() {
    this.customerEmails.push(new Email());
  }

  isNewDisabled() {
    if (this.customer.emails.length < this.customerEmails.length) {
      return !this.regExpEmail.test(this.customerEmails[this.customerEmails.length - 1].email);
    }
    return false;
  }

  removeNewEmail(index: number) {
    this.customerEmails.splice(index, 1);
  }

  removeDeletedEmails() {
    return this.customerEmails.filter(e => !e.isDeleted);
  }

  customerHasEmails() {
    return this.customerEmails != null && this.customerEmails.length > 0 && this.customerEmails.find(e => !e.isDeleted);
  }

  openConfirmationModal() {
    this._confirmationModal.open();
  }

  private refreshVerifiedEmail(status: VerificationStatus, customerEmails?: Email[]) {
    let custEmails = customerEmails ? customerEmails : this.customerEmails;
    this.verifiedEmail.newEmails = this.emailsToStings(custEmails);
    this.verifiedEmail.status = status;
    this.verifiedEmail.createdDate = new Date();
    if (status === VerificationStatus.Verified && this.customer.lastEmailVerification) {
      if (this.isValidationOrigin()) {
        this.verifiedEmail.note = this.customer.lastEmailVerification.note;
      }
      this.verifiedEmail.emails = this.customer.lastEmailVerification.emails;
    }
    else {
      this.verifiedEmail.emails = this.customer.emails;
    }
  }

  private loadCustomerEmails() {
    this.verifiedEmail = new EmailListVerification();
    this.customerEmails = [];
    this.originalEmails = [];
    this.customer.emails.forEach(e => {
      this.customerEmails.push(new Email(e));
      this.originalEmails.push(e);
    });
  }

  private emailsToStings(emails: Email[]) {
    let stringEmails: string[] = [];
    emails.forEach(e => {
      stringEmails.push(e.email);
    });

    return stringEmails;
  }
}

export class Email {
  private _email: string;
  private _deleted: boolean;

  constructor(email?: string) {
    this._email = setString(email);
    this._deleted = false;
  }

  get email() {
    return this._email;
  }

  set email(value: string) {
    this._email = setString(value);
  }

  get isDeleted() {
    return this._deleted;
  }

  set isDeleted(value: boolean) {
    this._deleted = value;
  }

  deleteEmail() {
    this._deleted = true;
  }

  isDirty(email: string) {
    return (this.email != email || this.isDeleted);
  }
}
