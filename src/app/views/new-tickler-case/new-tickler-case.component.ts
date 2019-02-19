import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ProcessCase} from "../../models/process-case";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {GlobalStateService} from "../../services/global-state.service";
import {TicklerType} from "../../models/tickler-types";
import {TicklerAttribute} from "../../models/tickler-attribute";
import {ProcessCaseTickler} from "../../models/process-case-tickler";
import {TicklerAttributeMap} from "../../models/tickler-attribute-map";
import {TicklerTypeMap} from "../../models/tickler-type-map";
import {Code} from "../../models/code";
import {Pagination} from "../../models/pagination";

@Component({
  selector: 'new-tickler-case',
  templateUrl: './new-tickler-case.component.html',
  styleUrls: ['./new-tickler-case.component.css']
})
export class NewTicklerCaseComponent implements OnInit {
  @Input() processCases: ProcessCase[] = null;
  @Input() processCaseTicklers: ProcessCaseTickler[] = null;
  @Input() currentProcessCase: ProcessCase = null;
  @Input() ticklerAttributes: TicklerAttribute[] = null;
  @Input() ticklerTypes: TicklerType[] = null;
  @Input() isAccountPage: boolean = false;
  @Input() isMandatory: boolean;
  @Output() onCancelCaseTickler = new EventEmitter<boolean>();
  @Output() onAddCaseTickler = new EventEmitter<ProcessCaseTickler>();
  private model: ProcessCaseTickler = new ProcessCaseTickler();
  private waitingResponse: boolean = false;
  private _attributeValues = {};
  private mandatoryValues = [];
  private waitingAttributesToLoad: boolean = false;
  private waitingTicklerTypesToLoad: boolean = false;
  private selectedTicklerType: TicklerType = null;
  attributesToLoad: TicklerAttribute[] = null;
  comboTicklerTypes: TicklerType[] = [];
  lovValuesToCode: any  = {};



  constructor(private _dataService: DataService, private _userFeedbackService: UserFeedbackService,
              private _globalStateService: GlobalStateService, private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (changes.ticklerTypes && this.ticklerTypes && this.ticklerTypes.length > 0 && this.model.ticklerTypeCode == null) {
      this.loadTicklerTypesMap(this.ticklerTypes);
    }
  }


  loadListOfValues(att: TicklerAttribute){
    this._dataService.getLovValues(att.lovCode).then(res =>{
      let ret: Code[] = [];
      for (let lo of res){
        let co = new Code();
        co.code = lo.valueCode;
        co.name = lo.valueName;
        co.description = lo.valueDescription;
        if(lo.isActive){
          ret.push(co);
        }
      }
      this.lovValuesToCode[att.lovCode] = ret;
      ret.map(i=>i.name = i.code + " - " + i.name);

    }).catch(err=>{
      console.log("Error retrieving LOV");
      console.log(err);
    })
  }

  /*
  * -find on ticklerTypesMap if the fromId and the tickler type selected id are equal
  * - find the destination tickler types of tickler type selected:
  *     - if core: puts an '*' and push on comboTicklerTypes
  *
  *     - else puts on noCoreDestinationTicklerTypes
  * */
  setTicklerTypesDestinationCoreToCombo(ticklerMaps: TicklerTypeMap[]) {
    for (let i in ticklerMaps) {
      let tm = ticklerMaps[i];
      let targetTicklerType = this.ticklerTypes.find(tt => tt.ticklerCode == tm.ticklerToCode);
      if (targetTicklerType.isCore) {
        this.comboTicklerTypes.push(targetTicklerType);
      }
    }
  }


  /*
  * filter by no core tickler types
  * and through the noCoreTicklerTypes
  * and push on the array combo
  *
  * */
  setTicklerTypesNoCoreToCombo(){
    for (let tt of this.ticklerTypes) {
      if (!tt.isCore) {
        this.comboTicklerTypes.push(tt);
      }
    }
  }


  /*
  *
  * loads the tickler types map --> needs the the current tickler type selected (core)
  * calls to the functions that allow that the combo is written correctly
  * */
  loadTicklerTypesMap(ticklerTypes: TicklerType[]) {
    this.waitingTicklerTypesToLoad = true;
    let lastCorePagination: Pagination = new Pagination(0, 1);
    this._dataService.getProcessCaseTicklers(this.currentProcessCase, lastCorePagination, true).then(res => {
      if (res != null && res.length > 0) {
        let lastCore: TicklerType = ticklerTypes.find(tType => tType.ticklerCode == res[0].ticklerTypeCode);

        this._dataService.getTicklerTypesMap(lastCore).then(res => {
          this.setTicklerTypesDestinationCoreToCombo(res);
          this.setTicklerTypesNoCoreToCombo();
          // We select the first TicklerType of the combo
          this.ticklerTypeSelected(this.comboTicklerTypes.length == 0 ? null : this.comboTicklerTypes[0]);
          this.waitingTicklerTypesToLoad = false;
        }).catch(err => {
          this.waitingTicklerTypesToLoad = false;
          console.log("Error retrieving tickler types map", err);
        })
      }
    }).catch(err => {
      this.waitingTicklerTypesToLoad = true;
      console.log("Error retrieving last core case tickler");
      console.log(err)
    });
  }


  //return to the table
  cancel() {
    this.onCancelCaseTickler.emit();
  }

  //add a new case tickler --> return to the table
  add(model: ProcessCaseTickler) {
    this.waitingResponse = true;
    this.model.ticklerTypeCode = this.selectedTicklerType.ticklerCode;
    //if we not write the no mandatory attribute --> not send to the  data service
    for (let code in this._attributeValues) {
      let att = this._attributeValues[code];
      if (att.length == 0) {
        delete this._attributeValues[code];
      }
    }
    this._dataService.addCaseTickler(this.currentProcessCase, model, this._attributeValues, this._globalStateService.loggedAgent).then(() => {
      this.waitingResponse = false;
      this.onAddCaseTickler.emit();
      this._userFeedbackService.handleSuccess("Case tickler added");
    }).catch(err => {
      this.waitingResponse = false;
      this._userFeedbackService.handleError("Error adding new case tickler", err);
    })
  }


  //load the tickler attributes according its tickler type selected
  loadCorrespondentTicklerAttributes(source: TicklerAttributeMap[]) {
    this.attributesToLoad = [];
    for (let atm of source) {
      let a = this.ticklerAttributes.find(att => att.code == atm.code);
      if (a && a.activeFlag) {
        a.mandatoryFlag = atm.mandatoryFlag;
        this.attributesToLoad.push(a);
        if(a.lovCode != ""){
          this.loadListOfValues(a);
        }
      }
    }
  }

  //when we change the tickler type on the combo we load the tickler maps to know later the tickler attributes
  ticklerTypeSelected(ticklerType: TicklerType) {
    this.selectedTicklerType = ticklerType;
    this.loadTicklerAttributesMap(ticklerType);
    this._attributeValues = {};
  }

  /*
  *
  * load tickler attributes map:
  *
  * - needs the current tickler type
  * - load correspondent tickler attributes --> knows the attributes that must be to load according the code selected
  *
  *
  * */
  loadTicklerAttributesMap(source: TicklerType) {
    this.waitingAttributesToLoad = true;
    this._dataService.getTicklerAttributesMap(source).then(res => {
      this.waitingAttributesToLoad = false;
      this.loadCorrespondentTicklerAttributes(res);
    })
  }


  private addAttribute(ta: TicklerAttribute, val: string) {
    this.addAttributeByCode(ta.code, val, ta.isArray);
    let index = this.mandatoryValues.indexOf(ta.id);
    if (ta.mandatoryFlag && index == -1) {
      this.mandatoryValues.push(ta.id);
    }
  }

  //return if we can add or not
  private canAddValues(): boolean {
    if (this.attributesToLoad) {
      let mandatoryAttributesToLoad = this.attributesToLoad.filter(at => at.mandatoryFlag);
      //compare the lengths
      if (mandatoryAttributesToLoad) {
        return this.mandatoryValues.length === mandatoryAttributesToLoad.length;
      }
    }
    return false;
  }

  private addAttributeByCode(cd: string, val: string, appendValue = true) {
    if (!appendValue) {
      this.getAttributeValuesByCode(cd).length = 0;
    }
    this.getAttributeValuesByCode(cd).push(val);
  }

  private getAttributeValuesByCode(cd: string): string[] {
    let atv = this._attributeValues[cd];
    if (atv == undefined) {
      atv = [];
      this._attributeValues[cd] = atv;
      this._cdr.detectChanges();
    }
    return atv;
  }

  private getAttributeValues(ta: TicklerAttribute): string[] {
    return this.getAttributeValuesByCode(ta.code);
  }

  private removeAttribute(ca: TicklerAttribute, val: string) {
    this._attributeValues[ca.code] = this._attributeValues[ca.code].filter(v => v != val);
    //remove on the arrays the mandatory and not mandatory attributes when click on remove
    let index = this.mandatoryValues.indexOf(ca.id);
    if (index != -1 && this._attributeValues[ca.code].length === 0) {
      this.mandatoryValues.splice(index, 1);
    }
  }


}
