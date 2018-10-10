import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MemoNote} from "../../models/memo-note";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {Account} from "../../models/account";
import {Pagination} from "../../models/pagination";

@Component({
  selector: 'call-notes',
  templateUrl: './call-notes.component.html',
  styleUrls: ['./call-notes.component.css']
})
export class CallNotesComponent implements OnInit {

  @Input() memoNotes: MemoNote[] = null;
  @Input() account: Account = null;
  @Input() searchingCallNotes: boolean = false;
  @Output() refresh =  new EventEmitter<MemoNote[]>();
  @Output() refreshSearching =  new EventEmitter<boolean>();
  private isByAccount: boolean = true;
  private pagination: Pagination = new Pagination(0, 20);


  constructor(private _dataService: DataService, private _backendCommService: BackendCommsService) { }

  ngOnInit() {
  }


  refreshCallNotes(){
    this.isByAccount = !this.isByAccount;
      this.searchingCallNotes = true;
    if(!this.isByAccount){
      this._backendCommService.getCustomerCallNotes(this.account.accountId, this.account.accountType, this.pagination.currPage, this.pagination.pageSize).then(res=>{
        this.memoNotes = res;
        this.searchingCallNotes = false;
        this.refresh.emit(this.memoNotes);
        this.refreshSearching.emit(false);
      }).catch(err=>{
        console.log(err);
      })
    }else{
      this._backendCommService.getCustomerCallNotes(this.account.accountId, this.account.accountType, this.pagination.currPage, this.pagination.pageSize, this.account.customer.cifNo).then(res=>{
        this.memoNotes = res;
        this.searchingCallNotes = false;
        this.refresh.emit(this.memoNotes);
        this.refreshSearching.emit(false);
      }).catch(err=> {
        console.log(err);
      })
    }
  }

}
