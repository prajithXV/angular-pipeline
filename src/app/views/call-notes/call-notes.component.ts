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
  @Output() refreshChecked =  new EventEmitter<boolean>();
  @Input() isByAccount: boolean = false;
  private pagination: Pagination = new Pagination(0, 20);
  private isCreating: boolean = false;
  checkModel: boolean = false;


  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

  showNewCallNotes(value: boolean){
    this.isCreating = value;
  }

  loadCallNotes(model: boolean){
    this.isByAccount = model;
    //needs to emit the searching value to the parent
    this.refreshSearching.emit(true);
      this.isCreating = false;
    if(!this.isByAccount){
       this._dataService.getCallNotes(this.account).then(res=>{
        this.memoNotes = res;
        this.searchingCallNotes = false;
        this.refreshMemoNotes.emit(this.memoNotes);
        this.refreshSearching.emit(false);
        this.refreshChecked.emit(this.isByAccount);
       }).catch(err=>{
        console.log(err);
      })
    }else{
      this._dataService.getCallNotes(this.account, this.account.customer).then(res=>{
        this.memoNotes = res;
        this.searchingCallNotes = false;
        this.refreshMemoNotes.emit(this.memoNotes);
        this.refreshSearching.emit(false);
        this.refreshChecked.emit(this.isByAccount);
      }).catch(err=> {
        console.log(err);
      })
    }

  }

  refreshCallNotes(){
    // this.isByAccount = false;
    this.loadCallNotes(this.isByAccount);
  }

  isChecked(model){
    console.log(model, "checkbox");
   return this.isByAccount = model;
  }



}
