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


  constructor(private _dataService: DataService) {
  }

  ngOnInit() {
  }

  showNewCallNotes(value: boolean) {
    this.isCreating = value;
  }

  loadCallNotes(model: boolean) {
    this.isByAccount = model;
    //needs to emit the searching value to the parent
    this.setValuesWhenRefresh(this.memoNotes, true, this.isByAccount);
    this.isCreating = false;
    if (!this.isByAccount) {
      this._dataService.getCallNotes(this.account).then(res => {
        this.setValuesWhenRefresh(res, false, this.isByAccount);
      }).catch(err => {
        console.log(err);
      })
    } else {
      this._dataService.getCallNotes(this.account, this.account.customer).then(res => {
        this.setValuesWhenRefresh(res, false, this.isByAccount);
      }).catch(err => {
        console.log(err);
      })
    }

  }

  private setValuesWhenRefresh(memoNotes: MemoNote[], isSearching: boolean, isChecked: boolean){
    this.memoNotes = memoNotes;
    this.searchingCallNotes = isSearching;
    this.onRefresh.emit({memoNotes: memoNotes, isSearching: isSearching, isChecked: isChecked})

  }

  refreshCallNotes() {
    this.loadCallNotes(this.isByAccount);
  }

}
