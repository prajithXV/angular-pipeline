import { Component, OnInit, Input } from '@angular/core';
import {AccountAdditionalInfo} from "../../models/account";

@Component({
  selector: 'account-additional-info',
  templateUrl: './account-additional-info.component.html',
  styleUrls: ['./account-additional-info.component.css']
})
export class AccountAdditionalInfoComponent implements OnInit {
  @Input() accountAdditional: AccountAdditionalInfo;

  constructor() { }

  ngOnInit() {
  }

}
