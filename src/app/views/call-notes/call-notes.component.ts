import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {MemoNote} from "../../models/memo-note";
import {DataService} from "../../services/data.service";
import {Account} from "../../models/account";

@Component({
  selector: 'call-notes',
  templateUrl: './call-notes.component.html',
  styleUrls: ['./call-notes.component.css']
})
export class CallNotesComponent implements OnInit, OnChanges {

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
    // this.memoNotes = this.memoNotes.slice(0);
    this.memoNotesWhenFilter = this.memoNotes;
    this.filterCallNotes(this.isByAccount);
    // console.log(this.memoNotesWhenFilter ,"clone")
  }

  ngOnChanges(changes) {
    if (changes.memoNotes) {
      console.log(this.memoNotes);
    }
  }

  showNewCallNotes(value: boolean) {
    this.isCreating = value;
  }


  filterCallNotes(model: boolean){
    this.isByAccount = model;
    if(!this.isByAccount){
      this.memoNotesWhenFilter = this.memoNotes.filter(e => (e.accountId === this.account.accountId) || (e.cifId === this.account.customer.cifNo));
    }else{
      this.memoNotesWhenFilter = this.memoNotes;
    }
    this.setValuesWhenRefresh(this.memoNotesWhenFilter, false, this.isByAccount);

    console.log(this.memoNotes, "memonotes");
    console.log(this.memoNotesWhenFilter, "memonotes");
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
    this.searchingCallNotes = isSearching;
    this.onRefresh.emit({memoNotes: memoNotes, isSearching: isSearching, isChecked: isChecked})

  }

  refreshCallNotes() {
    this.loadCallNotes(this.isByAccount);
  }

}
