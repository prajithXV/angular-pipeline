import {Component, Input, OnInit} from '@angular/core';
import {AccountLossMitigation} from "app/models/account";

@Component({
  selector: 'account-loss-mitigation',
  templateUrl: './account-loss-mitigation.component.html',
  styleUrls: ['./account-loss-mitigation.component.css']
})
export class AccountLossMitigationComponent implements OnInit {
  @Input() accountLoss: AccountLossMitigation;

  constructor() { }

  ngOnInit() {
  }

}
