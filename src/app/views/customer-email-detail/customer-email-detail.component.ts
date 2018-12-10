import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Customer} from "../../models/customer";

interface EmailPair {
  current: string,
  newest: string
}

@Component({
  selector: 'customer-email-detail',
  templateUrl: './customer-email-detail.component.html',
  styleUrls: ['./customer-email-detail.component.css']
})
export class CustomerEmailDetailComponent implements OnInit, OnChanges {
  @Input() customer: Customer;

  equalEmails: EmailPair[] = [];
  newEmails: string[] = [];
  obsoleteEmails: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.customer) {
      this.loadEmailsData();
    }
  }

  private loadEmailsData() {
    // Load equalEmails and newEmails
    this.equalEmails.splice(0);
    this.newEmails.splice(0);
    for (let email of this.customer.lastEmailVerification.newEmails) {
      if (this.customer.emails.indexOf(email) >= 0) {
        this.equalEmails.push({current: email, newest: email});
      }
      else {
        this.newEmails.push(email);
      }
    }

    // Load obsoleteEmails
    this.obsoleteEmails.splice(0);
    for (let email of this.customer.lastEmailVerification.emails) {
      if (this.customer.lastEmailVerification.newEmails.indexOf(email) == -1) {
        this.obsoleteEmails.push(email);
      }
    }

    while (this.newEmails.length > 0 && this.obsoleteEmails.length > 0 ) {
      this.equalEmails.push({current: this.obsoleteEmails[0], newest: this.newEmails[0]});
      this.obsoleteEmails.splice(0, 1);
      this.newEmails.splice(0, 1);
    }
  }

}
