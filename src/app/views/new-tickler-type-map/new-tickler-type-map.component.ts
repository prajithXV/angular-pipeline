import {Component, Input, OnInit} from '@angular/core';
import {TicklerType} from "../../models/tickler-types";
import {DataService} from "../../services/data.service";
import {TicklerTypeMap} from "../../models/tickler-type-map";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {GlobalStateService} from "../../services/global-state.service";

@Component({
  selector: 'new-tickler-type-map',
  templateUrl: './new-tickler-type-map.component.html',
  styleUrls: ['./new-tickler-type-map.component.css']
})
export class NewTicklerTypeMapComponent implements OnInit {

  @Input() currentTicklerType: TicklerType = null;
  @Input() ticklerTypes: TicklerType[] = null;
  private waitingResponse: boolean = false;
  private waitingToAdd: boolean = false;
  private waitingToDelete: string[] = [];
  ticklerTypesMap: TicklerTypeMap[] = null;
  coreTicklerTypesMap: TicklerTypeMap[] = [];
  pendentTicklerTypes: TicklerType[] = [];
  ticklerTypeSelected: TicklerType;

  constructor(private _dataService: DataService, private _userFeedbackService: UserFeedbackService,
              private _globalStateService: GlobalStateService) { }

  ngOnInit() {

  }

  ngOnChanges(changes){
    if(changes.currentTicklerType){
      this.loadTicklerTypesMap();
    }
  }

  setValuesToModel(){
    this.pendentTicklerTypes = [];
    for (let i in this.ticklerTypes) {
      let ticklerTypes = this.ticklerTypes[i];
      let t = this.ticklerTypesMap.find(tt => ticklerTypes.id == tt.ticklerToId);
      if (!t && ticklerTypes.ticklerCode !=this.currentTicklerType.ticklerCode && ticklerTypes.isCore) {
        this.pendentTicklerTypes.push(ticklerTypes);

      }
    }
    this.ticklerTypeSelected = this.pendentTicklerTypes[0];

  }


  loadTicklerTypesMap(){
    this.waitingResponse = true;
   this._dataService.getTicklerTypesMap(this.currentTicklerType).then(res => {
     this.ticklerTypesMap = res;
     this.setValuesToModel();
     this.loadCoreTicklerTypesMap();
     this.waitingResponse = false;
   }).catch(err=>{
     this.waitingResponse = false;
     console.log("Error retrieving tickler types map", err);
   })
  }


  loadCoreTicklerTypesMap(){
    this.coreTicklerTypesMap = [];
    for(let i in this.ticklerTypesMap){
      let ticklerTypesMap = this.ticklerTypesMap[i];
      let t = this.ticklerTypes.find(tt=> ticklerTypesMap.ticklerToId == tt.id);
      if(t && t.isCore){
        this.coreTicklerTypesMap.push(ticklerTypesMap);
      }
    }
  }

  refreshTicklerTypesMap(){
    this.loadTicklerTypesMap();
  }


  isTicklerTypeCore(){
    if(this.currentTicklerType != null){
      return this.currentTicklerType.isCore === true;
    }
  }


  addTicklerTypeMap(){
    this.waitingToAdd = true;
    this._dataService.addTicklerTypeMap(this.currentTicklerType, this.ticklerTypeSelected, this._globalStateService.loggedAgent).then(()=>{
    this.waitingToAdd = false;
    this.refreshTicklerTypesMap();
      this._userFeedbackService.handleSuccess("Tickler type map added");
    }).catch(err=>{
      this.waitingToAdd = false;
      this._userFeedbackService.handleError("Error adding tickler type map", err);
    })
  }

  deleteTicklerTypeMap(ticklerTypeMap: TicklerTypeMap){
    let index = null;
    this.waitingToDelete.push(ticklerTypeMap.id.toString());
    this._dataService.deleteTicklerTypeMap(ticklerTypeMap).then(()=>{
      if(ticklerTypeMap.id){
        index = this.waitingToDelete.indexOf(ticklerTypeMap.id.toString());
        this.waitingToDelete.splice(index, 1);
      }
      this.refreshTicklerTypesMap();
      this._userFeedbackService.handleSuccess("Tickler type map deleted");
    }).catch(err=>{
      this.waitingToDelete.splice(index, 1);
      this._userFeedbackService.handleError("Error deleting tickler type map", err);

    })
  }

  private isWaiting(ticklerTypeMap: TicklerTypeMap){
    return this.waitingToDelete.indexOf(ticklerTypeMap.id.toString()) > -1;
  }


}
