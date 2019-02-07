import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "../../models/customer";
import {Phone} from "../../models/phone";

interface PhonePair {
  current: Phone,
  newest: Phone
}

@Component({
  selector: 'customer-phone-detail',
  templateUrl: './customer-phone-detail.component.html',
  styleUrls: ['./customer-phone-detail.component.css']
})
export class CustomerPhoneDetailComponent implements OnInit {
  @Input() customer: Customer;

  equalPhones: PhonePair[] = [];
  newPhones: Phone[] = [];
  obsoletePhones: Phone[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.customer) {
      this.loadPhonesData();
    }
  }

  private loadPhonesData() {
    // Load equalPhones and newPhones
    this.equalPhones.splice(0);
    this.newPhones.splice(0);
    for (let phone of this.customer.lastPhoneVerification.newPhones) {
      let pCurrent: Phone = this.customer.phones.find(p => phone.number === p.number && phone.lineType === p.lineType);
      if (pCurrent) {
        this.equalPhones.push({current: pCurrent, newest: phone});
      }
      else {
        this.newPhones.push(phone);
      }
    }

    // Load obsoletePhones
    this.obsoletePhones.splice(0);
    for (let phone of this.customer.lastPhoneVerification.phones) {
      if (!this.customer.lastPhoneVerification.newPhones.find(p => phone.number === p.number && phone.lineType === p.lineType)) {
        this.obsoletePhones.push(phone);
      }
    }

    while (this.newPhones.length > 0 && this.obsoletePhones.length > 0 ) {
      this.equalPhones.push({current: this.obsoletePhones[0], newest: this.newPhones[0]});
      this.obsoletePhones.splice(0, 1);
      this.newPhones.splice(0, 1);
    }
  }

}
