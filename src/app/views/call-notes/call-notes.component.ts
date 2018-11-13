import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MemoNote} from "../../models/memo-note";
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
  @Output() onRefreshFilter = new EventEmitter<{ memoNotes: MemoNote[], isChecked: boolean }>();
  @Output() onRefreshMemoNotes = new EventEmitter();
  @Output() refreshSearching = new EventEmitter<boolean>();
  @Output() refreshChecked = new EventEmitter<boolean>();
  @Input() isByAccount: boolean = false;
  private isCreating: boolean = false;
  memoNotesWhenFilter: MemoNote[] = null;


  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes && this.memoNotes && changes.memoNotes) {
      this.filterCallNotes(this.isByAccount);
    }
  }

  showNewCallNotes(value: boolean) {
    this.isCreating = value;
  }

  filterCallNotes(isCheckedModel: boolean) {
    this.isByAccount = isCheckedModel;
    if (!this.isByAccount) {
      this.memoNotesWhenFilter = this.memoNotes.filter(e => this.hasSameAccountId(e) && this.hasSameCustomerId(e));
    } else {
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

  loadCallNotes() {
    this.isCreating = false;
    this.onRefreshMemoNotes.emit();
  }

  private setValuesWhenRefresh(memoNotes: MemoNote[], isChecked: boolean) {
    this.onRefreshFilter.emit({memoNotes: memoNotes, isChecked: isChecked})
  }

  refreshCallNotes() {
    this.loadCallNotes();
  }
}
