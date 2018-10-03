import {Component, Input, OnInit} from '@angular/core';
import {TicklerType} from "../../models/tickler-types";
import {DataService} from "../../services/data.service";
import {TicklerAttributeMap} from "../../models/tickler-attribute-map";
import {TicklerAttribute} from "../../models/tickler-attribute";
import {GlobalStateService} from "../../services/global-state.service";
import {UserFeedbackService} from "../../services/user-feedback.service";

@Component({
  selector: 'new-tickler-attribute-map',
  templateUrl: './new-tickler-attribute-map.component.html',
  styleUrls: ['./new-tickler-attribute-map.component.css']
})
export class NewTicklerAttributeMapComponent implements OnInit {



  @Input() currentTicklerType: TicklerType = null;
  @Input() ticklerAttributes: TicklerAttribute[] = null;
  private waitingResponse: boolean = false;
  private waitingToAdd: boolean = false;
  private waitingToRemove: string[] = [];
  private waitingToUpdate: string[] = [];
  private currentTicklerAttribute: TicklerAttribute = null;
  ticklerAttributeMaps: TicklerAttributeMap[] = null;
  pendentTicklers: TicklerAttribute[] = [];

  constructor(private _dataService: DataService, private _globalStateService: GlobalStateService,
              private _userFeedbackService: UserFeedbackService) { }

  ngOnInit() {

  }

  ngOnChanges(changes){
    if(changes.currentTicklerType){
      this.loadTicklerAttributesMap();
    }
  }


  setValueToModel(){
    this.pendentTicklers = [];

    for (let i in this.ticklerAttributes) {
      let ticklerAttribute = this.ticklerAttributes[i];
      let ticklerAttributeMap = this.ticklerAttributeMaps.find(att => ticklerAttribute.code == att.code);
      if (!ticklerAttributeMap && ticklerAttribute.activeFlag) {
        this.pendentTicklers.push(ticklerAttribute);
      }
    }
    this.currentTicklerAttribute = this.pendentTicklers[0];

  }

  addTicklerAttributeMap(){
    this.waitingToAdd = true;
    this._dataService.addTicklerAttributeMap(this.currentTicklerType, this.currentTicklerAttribute, this._globalStateService.loggedAgent).then(()=>{
      this.waitingToAdd = false;
      this.refreshTicklerAttributesMap();
      this._userFeedbackService.handleSuccess("Tickler attribute map added");
    }).catch(err => {
      this.waitingToAdd = false;
      this._userFeedbackService.handleError("Error adding tickler attribute map", err);
    });
  }

  deleteTicklerAttributeMap(ticklerAttributeMap: TicklerAttributeMap){
    let index = null;
    this.waitingToRemove.push(ticklerAttributeMap.id.toString());
    this._dataService.deleteTicklerAttributeMap(ticklerAttributeMap).then(()=> {
      if(ticklerAttributeMap.id){
        index = this.waitingToRemove.indexOf(ticklerAttributeMap.id.toString());
        this.waitingToRemove.splice(index, 1);
      }
      this.refreshTicklerAttributesMap();
      this._userFeedbackService.handleSuccess("Tickler attribute map deleted");
    }).catch(err=>{
      this.waitingToRemove.splice(index, 1);
      this._userFeedbackService.handleError("Error deleting tickler attribute map", err);
    });
  }


  updateMandatoryFlag(ticklerAttributeMap: TicklerAttributeMap){
    let index = null;
    ticklerAttributeMap.mandatoryFlag = !ticklerAttributeMap.mandatoryFlag;
    this.waitingToUpdate.push(ticklerAttributeMap.id.toString());
    this._dataService.updateTicklerAttributeMap(ticklerAttributeMap, this._globalStateService.loggedAgent ).then(()=>{
      if(ticklerAttributeMap.id){
        index = this.waitingToUpdate.indexOf(ticklerAttributeMap.id.toString());
        this.waitingToUpdate.splice(index,1);
      }
      this._userFeedbackService.handleSuccess("Tickler attribute map updated");
    }).catch(err =>{
      this.waitingToUpdate.splice(index,1);
      this._userFeedbackService.handleError("Error updating tickler attribute map", err);
    })
  }

  loadTicklerAttributesMap(){
    this.waitingResponse = true;
    this._dataService.getTicklerAttributesMap(this.currentTicklerType).then(res => {
      this.waitingResponse = false;
      this.ticklerAttributeMaps = res;
      this.setValueToModel();
    }).catch(err => {
      this.waitingResponse = false;
      console.log("Error retrieving tickler attributes map", err);
    })
  }


  refreshTicklerAttributesMap(){
    this.loadTicklerAttributesMap();
  }

  private isWaiting(ticklerAttributeMap: TicklerAttributeMap){
    return this.waitingToRemove.indexOf(ticklerAttributeMap.id.toString()) > -1;
  }


  private isWaitingToUpdate(ticklerAttributeMap: TicklerAttributeMap){
    return this.waitingToUpdate.indexOf(ticklerAttributeMap.id.toString()) > -1;
  }


}
