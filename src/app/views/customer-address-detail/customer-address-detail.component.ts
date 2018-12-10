import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "../../models/customer";

@Component({
  selector: 'customer-address-detail',
  templateUrl: './customer-address-detail.component.html',
  styleUrls: ['./customer-address-detail.component.css']
})
export class CustomerAddressDetailComponent implements OnInit {
  @Input() customer: Customer;

  constructor() { }

  ngOnInit() {
  }

}
