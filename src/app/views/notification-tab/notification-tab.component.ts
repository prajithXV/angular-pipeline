import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountCollection} from "../../models/account";

@Component({
  selector: 'notification-tab',
  templateUrl: './notification-tab.component.html',
  styleUrls: ['./notification-tab.component.css']
})
export class NotificationTabComponent implements OnInit {
  @Input() accountCol: AccountCollection;
  @Input() isMemoWord: boolean;



  constructor() { }

  ngOnInit() {
  }


  // searchMemo(){
  //   let lower = this.accountCol.memoPostProPay.map(v =>v.toLowerCase());
  //   let m = lower.toString().match('memo');
  //   if(m){
  //     return true
  //   }
  //   else{
  //     return false;
  //   }
  // }

}
