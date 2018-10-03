import {Component, Input, OnInit} from '@angular/core';
import {AccountForeclosure} from "../../models/account";

@Component({
  selector: 'account-foreclosure',
  templateUrl: './account-foreclosure.component.html',
  styleUrls: ['./account-foreclosure.component.css']
})
export class AccountForeclosureComponent implements OnInit {
  @Input() accountFore: AccountForeclosure;

  constructor() { }

  ngOnInit() {
  }

}
