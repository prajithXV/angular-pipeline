import {Component, OnInit} from '@angular/core';
import {TicklerProcess} from "../../models/tickler-processes";
import {TicklerType} from "../../models/tickler-types";
import {DataService} from "../../services/data.service";
import {TicklerAttribute} from "../../models/tickler-attribute";


@Component({
  selector: 'admin-processes',
  templateUrl: './admin-processes.component.html',
  styleUrls: ['./admin-processes.component.css']
})
export class AdminProcessesComponent implements OnInit {

  private searchingProcesses: boolean = false;
  private searchingTypes: boolean = false;
  private currentProcess: TicklerProcess = null;
  private isCreating: boolean = false;
  ticklerTypes: TicklerType[] = null;
  ticklerProcesses: TicklerProcess[] = null;
  ticklerAttributes: TicklerAttribute[] = null;

  constructor(private _dataService: DataService) {
  }

  ngOnInit() {
    //calls this function to can initialize the tickler processes
    this.loadTicklerProcesses();
    this.loadTicklerAttributes();
  }

  //gets de Processes
  loadTicklerProcesses() {
    this.searchingProcesses = true;
    this._dataService.getProcesses().then(res => {
      this.ticklerProcesses = res;
      this.searchingProcesses = false;

    }).catch(err => {
      this.searchingProcesses = false;
      console.log("Error retrieving processes");
      console.log(err);
    });
  }

  loadTicklerAttributes(){
    this._dataService.getTicklerAttributes().then(res => {
      this.ticklerAttributes = res;
    }).catch(err => {
      console.log(err);
    })
  }

  //when click on a tickler process --> gets its tickler types data
  loadTicklerTypes(ticklerProcess: TicklerProcess) {
    this.searchingTypes = true;
    this.isCreating = false;
    this.currentProcess = ticklerProcess;
    this.ticklerTypes = [];

    this._dataService.getTicklerTypes(ticklerProcess).then(res => {
      this.ticklerTypes = res;
      this.searchingTypes = false;

    }).catch(err => {
      this.searchingTypes = false;
      console.log("Error retrieving tickler types");
      console.log(err);
    })
  }


  showTicklerTypes(value: boolean) {
    this.isCreating = value;
  }

  refreshTicklerTypes(){
    this.loadTicklerTypes(this.currentProcess);
  }

}
