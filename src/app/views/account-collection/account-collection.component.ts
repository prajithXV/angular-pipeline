import {AccountCollection} from "../../models/account";

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'account-collection',
  templateUrl: './account-collection.component.html',
  styleUrls: ['./account-collection.component.css']
})
export class AccountCollectionComponent implements OnInit {
  @Input() accountCol: AccountCollection;
  @Input() isMemo: boolean;
  @Output() onHide = new EventEmitter<boolean>();


  constructor() { }

  /*
  * when click on the collection tab we call the function hide()
  * to force the click event because we not can to put click event on tabs
  *
  * */
  ngOnInit() {
    this.hide();
    // this.findMemo();
  }

  /*
  * children of manage account, we need to emit the event to the parent
  *
  *
  * */
  hide(){
    this.onHide.emit();
  }

}
