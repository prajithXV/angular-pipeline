import {Component, Input, OnInit} from '@angular/core';
import {AccountHistoryEntry} from "../../models/account";

@Component({
  selector: 'account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.css']
})
export class AccountHistoryComponent implements OnInit {
  @Input() history: AccountHistoryEntry[];
  @Input() accountType:string;
  @Input() searching: boolean;

  constructor() { }

  ngOnInit() {
  }

}
