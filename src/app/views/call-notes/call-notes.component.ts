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
  @Output() refreshMemoNotes = new EventEmitter<MemoNote[]>();
  @Output() refreshSearching =  new EventEmitter<boolean>();
  private isByAccount: boolean = true;
  private pagination: Pagination = new Pagination(0, 20);
  private isCreating: boolean = false;


  constructor(private _dataService: DataService, private _backendCommService: BackendCommsService) { }

  ngOnInit() {
  }


  showNewCallNotes(value: boolean){
    this.isCreating = value;
  }

  refreshCallNotes(){
    this.isByAccount = !this.isByAccount;
    //needs to emit the searching value to the parent
    this.refreshSearching.emit(true);
      this.isCreating = false;
    if(!this.isByAccount){
      this._backendCommService.getCustomerCallNotes(this.account.accountId, this.account.accountType, this.pagination.currPage, this.pagination.pageSize).then(res=>{
        this.memoNotes = res;
        this.searchingCallNotes = false;
        this.refreshMemoNotes.emit(this.memoNotes);
        this.refreshSearching.emit(false);
      }).catch(err=>{
        console.log(err);
      })
    }else{
      this._backendCommService.getCustomerCallNotes(this.account.accountId, this.account.accountType, this.pagination.currPage, this.pagination.pageSize, this.account.customer.cifNo).then(res=>{
        this.memoNotes = res;
        this.searchingCallNotes = false;
        this.refreshMemoNotes.emit(this.memoNotes);
        this.refreshSearching.emit(false);
      }).catch(err=> {
        console.log(err);
      })
    }
  }

}
