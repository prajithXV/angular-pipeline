import {Component, Input, OnInit} from '@angular/core';
import {callLater, CallRecord} from "../../models/call-record";


@Component({
  selector: 'customer-call-records',
  templateUrl: './customer-call-records.component.html',
  styleUrls: ['./customer-call-records.component.css']
})
export class CustomerCallRecordsComponent implements OnInit {
  @Input() records: CallRecord[] = null;
  @Input() searching: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  /*
  * - note: all the callRecord note
  * - isFirst: index that we have pass in the hml, return if is the first or not
  * - callLater: constant = "Call Later"
  *
  * we return the first note if is callLater
  *
  * */
  isFirstNoteCallLater(note: CallRecord, isFirst: boolean) {
    return isFirst && note.result === callLater;
  }



}
