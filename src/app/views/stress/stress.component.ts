import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {GlobalStateService} from "../../services/global-state.service";
import {CiscoCommsService} from 'app/services/cisco-comms.service';
import {AgentState} from 'app/models/agent';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Observer} from "rxjs/Observer";
import {Call, CallState, CallType} from "../../models/call";
import {Subscription} from 'rxjs';

import "rxjs/add/operator/takeWhile";
import {CancelCampaignCallRecordReason} from "../../models/cancel-campaign-call-record-reason";
import {TicklerProcess} from "../../models/tickler-processes";
import {ProcessCase} from "../../models/process-case";
import {CancelRecordModel} from "../../models/new-call-record-model";
import {PublicUrls} from "../../routing-constants";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {TicklerType} from "../../models/tickler-types";
import {ProcessCaseTickler} from "../../models/process-case-tickler";
import {ProcessCaseModel} from "../../models/process-case-model";

// export class ProcessCaseModel {
//   accountId: string;
//   cifId: string;
//   processCode: string;
//   caseDescription: string;
//   createdBy: string;
// }


// export class ProcessCaseTicklerModel{
//   caseId: number;
//   ticklerTypeCode: string;
//   ticklerDescription: string;
//   CreatedBy: string
// }


declare let jabberwerx: any;
@Component({
  selector: 'app-stress',
  templateUrl: './stress.component.html',
  styleUrls: ['./stress.component.css']
})
export class StressComponent implements OnInit {
  max = {
    started: false,
    seconds: () => (this.max.endTime - this.max.initTime) / 1000,
    calls: null,
    success: null,
    failed: null,
    initTime: null,
    endTime: null,
  };




  processes: TicklerProcess[] = null;
  processCaseTickler: ProcessCaseTickler[] = null;
  cases: ProcessCase[] = null;
  types: TicklerType[] = null;

  private model: ProcessCaseModel = new ProcessCaseModel();
  // private model2: ProcessCaseTicklerModel = new ProcessCaseTicklerModel();




  constructor(private _dataService: DataService,
              private _globalStateService: GlobalStateService,
              private _userFeedbackService: UserFeedbackService) {
  }

  ngOnInit() {
  }


  startMax() {
    this.max.started = true;
    this.max.calls = 0;
    this.max.success = 0;
    this.max.failed = 0;
    this.max.initTime = new Date().getTime();
    this.nextMaxState();
  }

  stopMax() {
    this.max.started = false;
  }

  private nextMaxState() {
    this.max.endTime = new Date().getTime();
    if (!this.max.started) {
      return;
    }
    this.max.calls++;
    this._dataService.getCurrentState(this._globalStateService.loggedAgent).then(
      good => {
        this.max.success++;
        this.nextMaxCalls();
      },
      error => {
        this.max.failed++;
        this.nextMaxCalls();
      }
    )
  }

  private nextMaxCalls() {
    this.max.endTime = new Date().getTime();
    if (!this.max.started) {
      return;
    }
    this.max.calls++;
    this._dataService.getCurrentCall(this._globalStateService.loggedAgent).then(
      good => {
        this.max.success++;
        this.nextMaxState();
      },
      error => {
        this.max.failed++;
        this.nextMaxState();
      }
    )
  }

  numAgents = 10;
  numTicks = 5;
  remainTicks = 0;
  bulk = {
    started: false,
    ticks: 0,
    calls: null,
    success: null,
    failed: null,
    initTime: null,
    pending: () => this.bulk.calls - this.bulk.success - this.bulk.failed
  };

  startBulk() {
    this.remainTicks = this.numTicks;
    this.bulk.started = true;
    this.bulk.ticks = 0;
    this.bulk.calls = 0;
    this.bulk.success = 0;
    this.bulk.failed = 0;
    this.bulk.initTime = new Date().getTime();
    this.nextBulkTick();
  }

  stopBulk() {
    this.bulk.started = false;
  }

  private nextBulkTick() {
    if (this.remainTicks <= 0 || !this.bulk.started) {
      this.bulk.started = false;
      return;
    }
    this.remainTicks--;
    this.bulk.ticks++;
    for (let i = 0; i < this.numAgents; i++) {
      this.bulk.calls++;
      this._dataService.getCurrentState(this._globalStateService.loggedAgent).then(
        good => {
          this.bulk.success++;
        },
        error => {
          this.bulk.failed++;
        }
      );
      this.bulk.calls++;
      this._dataService.getCurrentCall(this._globalStateService.loggedAgent).then(
        good => {
          this.bulk.success++;
        },
        error => {
          this.bulk.failed++;
        }
      );
    }
    this.nextBulkDelayedTick();
  }

  private nextBulkDelayedTick() {
    setTimeout(() => this.nextBulkTick(), 1000);
  }



 // onAddCaseTickler(model: ProcessCaseTicklerModel) {
 //    this._dataService.addCaseTickler(model)
 //      .then(() => {
 //        this._userFeedbackService.handleSuccess("Tickler added");
 //      }).catch((error) => {
 //      this._userFeedbackService.handleError("Error adding tickler", error);
 //    });
 //  }


}
