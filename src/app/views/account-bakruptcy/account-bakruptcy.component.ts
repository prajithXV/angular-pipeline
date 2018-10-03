import { Component, OnInit, Input } from '@angular/core';
import {AccountBankruptcy} from "../../models/account";

@Component({
  selector: 'account-bakruptcy',
  templateUrl: './account-bakruptcy.component.html',
  styleUrls: ['./account-bakruptcy.component.css']
})
export class AccountBakruptcyComponent implements OnInit {
  @Input() accountBankrup: AccountBankruptcy;

  constructor() { }

  ngOnInit() {
  }

}
