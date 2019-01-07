import {setString} from "./address";
import {VerificationStatus} from "./addressVerification";

export class EmailListVerification {
  private _emails: string[];
  private _newEmails: string[];
  private _note: string;
  private _status: VerificationStatus;
  private _createdBy: string;
  private _createdDate: Date;

  constructor(emails?: string[], newEmails?: string[], note?: string, status?: VerificationStatus, createdDate?: Date) {
    // Initializing the variables to empty array
    this._emails = [];
    this._newEmails = [];

    if (emails != null) {
      emails.forEach(e => {
        this._emails.push(setString(e));
      });
    }
    if (newEmails != null) {
      newEmails.forEach(ne => {
        this._newEmails.push(setString(ne));
      });
    }
    this._note = setString(note);
    if (status) this._status = status;
    if (createdDate) this._createdDate = createdDate;
  }

  get emails() {
    return this._emails;
  }

  set emails(emails: string[]) {
    this._emails = emails;
  }

  addEmail(email: string) {
    // Adding it if is not repeated
    if (this._emails.indexOf(email) === -1) {
      this._emails.push(email);
    }
  }

  removeEmail(email: string) {
    let index = this._emails.indexOf(email);
    if (index > -1) {
      this._emails.splice(index, 1);
    }
  }

  get newEmails() {
    return this._newEmails;
  }

  set newEmails(newEmails: string[]) {
    this._newEmails = newEmails;
  }

  addNewEmail(newEmail: string) {
    // Adding it if is not repeated
    if (this._newEmails.indexOf(newEmail) === -1) {
      this._newEmails.push(newEmail);
    }
  }

  removeNewEmail(newEmail: string) {
    let index = this._newEmails.indexOf(newEmail);
    if (index > -1) {
      this._newEmails.splice(index, 1);
    }
  }

  get note(): string {
    return this._note;
  }

  set note(value: string) {
    this._note = setString(value);
  }

  get status(): VerificationStatus {
    return this._status;
  }

  set status(value: VerificationStatus) {
    this._status = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  set createdDate(value: Date) {
    this._createdDate = value;
  }
}
