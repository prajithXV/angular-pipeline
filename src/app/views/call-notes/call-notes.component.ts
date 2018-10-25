import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
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
  @Output() onRefresh = new EventEmitter<{memoNotes: MemoNote[], isChecked: boolean}>();
  @Output() onRefresh2 = new EventEmitter<boolean>();
  @Output() refreshSearching = new EventEmitter<boolean>();
  @Output() refreshChecked = new EventEmitter<boolean>();
  @Input() isByAccount: boolean = false;
  private isCreating: boolean = false;
  memoNotesWhenFilter: MemoNote[] = null;


  constructor(private _dataService: DataService) {
  }

  ngOnInit() {
      // this.memoNotesWhenFilter = this.memoNotes;
      // this.filterCallNotes(this.isByAccount);
  }

  ngOnChanges(changes){
    if(changes && this.memoNotes && changes.memoNotes){
      this.memoNotesWhenFilter = this.memoNotes;
      this.filterCallNotes(this.isByAccount);
    }
    console.log(changes, "he cambiado");
  }

  showNewCallNotes(value: boolean) {
    this.isCreating = value;
  }

  filterCallNotes(model: boolean){
    this.isByAccount = model;
    if(!this.isByAccount){
      this.memoNotesWhenFilter = this.memoNotes.filter(e => this.hasSameAccountId(e) && this.hasSameCustomerId(e));
    }else{
      this.memoNotesWhenFilter = this.memoNotes;
    }
    this.setValuesWhenRefresh(this.memoNotesWhenFilter, this.isByAccount);
  }

  hasSameAccountId(e: MemoNote): boolean {
   return e.accountId === this.account.accountId;
  }

  hasSameCustomerId(e: MemoNote): boolean {
    return e.cifId === this.account.customer.id;
  }

  loadCallNotes(isCheckedModel: boolean) {
    this.isCreating = false;
    this.onRefresh2.emit(isCheckedModel);
    //needs to emit the searching value to the parent
    // this.setValuesWhenRefresh(this.memoNotesWhenFilter, true, this.isByAccount);
    //   this._dataService.getCallNotes(this.account, this.account.customer).then(res => {
    //     this.memoNotes = res;
    //     this.setValuesWhenRefresh(res, false, isCheckedModel);
    //     this.filterCallNotes(isCheckedModel);
    //     this.isAdded = true;
    //   }).catch(err => {
    //     console.log(err);
    //   })
    }

  private setValuesWhenRefresh(memoNotes: MemoNote[], isChecked: boolean){
    this.onRefresh.emit({memoNotes: memoNotes, isChecked: isChecked})
  }

  refreshCallNotes(isCheckedModel: boolean) {
    this.loadCallNotes(isCheckedModel);
  }
}
