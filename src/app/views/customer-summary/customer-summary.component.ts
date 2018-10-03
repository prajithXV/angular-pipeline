import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Customer} from "../../models/customer";

@Component({
  selector: 'customer-summary',
  templateUrl: './customer-summary.component.html',
  styleUrls: ['./customer-summary.component.css']
})
export class CustomerSummaryComponent implements OnInit {
  @Input() customers: Customer = null;
  @Input() currentCustomer: Customer = null;
  @Input('not-found') notFound: boolean;
  @Input() searching: boolean;

  @Output() onSearchAccounts = new EventEmitter<Customer>();

  constructor() { }

  ngOnInit() {
  }




  searchAccounts(cust: Customer) {
    if (this.currentCustomer == null || this.currentCustomer.id != cust.id) {
      this.onSearchAccounts.emit(cust);
      console.log("customer");
    }
  }
}
