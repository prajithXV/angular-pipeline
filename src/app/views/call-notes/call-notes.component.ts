import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MemoNote} from "../../models/memo-note";
import {DataService} from "../../services/data.service";
import {Account} from "../../models/account";

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
  @Output() onRefresh = new EventEmitter<{memoNotes: MemoNote[], isSearching: boolean, isChecked: boolean}>();
  @Output() refreshSearching = new EventEmitter<boolean>();
  @Output() refreshChecked = new EventEmitter<boolean>();
  @Input() isByAccount: boolean = false;
  private isCreating: boolean = false;
  memoNotesWhenFilter: MemoNote[] = null;


  constructor(private _dataService: DataService) {
  }

  ngOnInit() {
    this.memoNotesWhenFilter = this.memoNotes;
    this.filterCallNotes(this.isByAccount);
  }

  showNewCallNotes(value: boolean) {
    this.isCreating = value;
  }


  filterCallNotes(model: boolean){
    this.isByAccount = model;
    if(!this.isByAccount){
      this.memoNotesWhenFilter = this.memoNotes.filter(e => this.hasSameAccountId(e) || this.hasSameCustomerId(e));
    }else{
      this.memoNotesWhenFilter = this.memoNotes;
    }
    this.setValuesWhenRefresh(this.memoNotesWhenFilter, false, this.isByAccount);
  }

  hasSameAccountId(e: MemoNote){
   return e.accountId === this.account.accountId;
  }

  hasSameCustomerId(e: MemoNote){
    e.customerName = this.account.customer.mainContact.completeName;
    return e.cifId === this.account.customer.id;
  }

  loadCallNotes() {
    this.isCreating = false;
    //needs to emit the searching value to the parent
    this.setValuesWhenRefresh(this.memoNotesWhenFilter, true, this.isByAccount);
      this._dataService.getCallNotes(this.account, this.account.customer).then(res => {
        this.memoNotesWhenFilter = res;
        this.setValuesWhenRefresh(res, false, true);
      }).catch(err => {
        console.log(err);
      })
    }

  private setValuesWhenRefresh(memoNotes: MemoNote[], isSearching: boolean, isChecked: boolean){
    this.searchingCallNotes = isSearching;
    this.onRefresh.emit({memoNotes: memoNotes, isSearching: isSearching, isChecked: isChecked})
  }

  refreshCallNotes() {
    this.loadCallNotes();
  }

}
