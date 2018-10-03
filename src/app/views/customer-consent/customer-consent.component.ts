import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Customer} from "../../models/customer";
import {CustomerConsent} from "../../models/customer-consent";

@Component({
  selector: 'customer-consent',
  templateUrl: './customer-consent.component.html',
  styleUrls: ['./customer-consent.component.css']
})
export class CustomerConsentComponent implements OnInit {

  constructor() { }

  @Input() customer: Customer;
  @Input() waitingResponse: boolean = false;
  @Input() customerConsents: CustomerConsent[];


  ngOnInit() {

  }

}
