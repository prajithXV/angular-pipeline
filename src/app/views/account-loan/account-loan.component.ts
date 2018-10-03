import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {AccountLoan} from "../../models/account";

@Component({
  selector: 'account-loan',
  templateUrl: './account-loan.component.html',
  styleUrls: ['../homeview.component.css', './account-loan.component.css'],
  // styleUrls: ['../homeview.component.css', './account-loan.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AccountLoanComponent implements OnInit {
  @Input() accountLoan: AccountLoan;

  constructor() { }

  ngOnInit() {
  }

}
