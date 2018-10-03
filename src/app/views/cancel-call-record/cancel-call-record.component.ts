import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CancelCampaignCallRecordReason} from "../../models/cancel-campaign-call-record-reason";
import {CancelRecordModel} from "../../models/new-call-record-model";

@Component({
  selector: 'cancel-call-record',
  templateUrl: './cancel-call-record.component.html',
  styleUrls: ['./cancel-call-record.component.css']
})
export class CancelCallRecordComponent implements OnInit, OnChanges {
  @Input() cancelReasons: CancelCampaignCallRecordReason[] = null;
  @Input() waitingResponse: boolean = false;
  @Output() cancelCall = new EventEmitter<CancelRecordModel>();
  @Output() onCancel = new EventEmitter<number>();

  private model: CancelRecordModel = new CancelRecordModel();


  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.cancelReasons && this.cancelReasons && this.cancelReasons.length > 0 && this.model.reason == null) {
      this.model.reason = this.cancelReasons[0];
    }
  }

  cancel() {
    this.onCancel.emit();
  }

  doCancelCall() {
    this.cancelCall.emit(this.model);
  }




}


