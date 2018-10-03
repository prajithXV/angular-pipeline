import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {GlobalStateService} from "../../services/global-state.service";
import {Phone} from "../../models/phone";

@Component({
  selector: 'call-management',
  templateUrl: './call-management.component.html',
  styleUrls: ['./call-management.component.css']
})
export class CallManagementComponent implements OnInit {
  constructor(private _dataService: DataService, private _globalStateService: GlobalStateService) { }

  ngOnInit() {
  }

  call() {
    let phone = new Phone();
    phone.number = "914696014194";
    this._dataService.makeCall(this._globalStateService.loggedAgent, phone);
  }
}
