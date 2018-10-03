import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProcessCaseTickler} from "../../models/process-case-tickler";
import {ProcessCase} from "../../models/process-case";
import {TicklerCaseModel} from "../../models/tickler-case-model";
import {TicklerType} from "../../models/tickler-types";
import {DataService} from "../../services/data.service";
import {TicklerAttribute} from "../../models/tickler-attribute";
import {CampaignListAttribute} from "../../models/campaign-list-attribute";


@Component({
  selector: 'process-case-tickler-table',
  templateUrl: './process-case-tickler-table.component.html',
  styleUrls: ['./process-case-tickler-table.component.css']
})
export class ProcessCaseTicklerTableComponent implements OnInit {

  @Input() processCaseTicklers: ProcessCaseTickler[] = null;
  @Input() ticklerTypes: TicklerType[] = null;
  @Input() currentProcessCase: ProcessCase = null;
  @Input() ticklerAttributes: TicklerAttribute[] = null;
  @Input() waitingResponse: boolean = false;
  @Input() searchingCaseTicklers: boolean = false;
  @Input() hasToShowNewButton: boolean = true;
  @Output() onAddTicklerCase = new EventEmitter<TicklerCaseModel>();
  @Output() onCancel = new EventEmitter<boolean>();
  @Input() isCreating: boolean = false;
  private ticklerAttributesVisibles = {};

  constructor(private _dataService:DataService) {
  }

  ngOnChanges(changes) {
    if (changes.currentProcessCase) {
      this.ticklerAttributesVisibles = {};
      // this.isCreating = false;
    }
  }


  ngOnInit() {
    this.loadTicklerAttributes();
  }

  //show or hide the table or the add case panel
  // onNewTickler() {
  //   this.isCreating = true;
  // }

  onNewTicklerCancelled() {
    // this.isCreating = false;
    this.onCancel.emit();
  }

  onNewTicklerAdded() {
    // this.isCreating = false;
    this.onAddTicklerCase.emit();
  }

  //load ticker attributes
  loadTicklerAttributes() {
    this._dataService.getTicklerAttributes().then(res => {
      this.ticklerAttributes = res;
    }).catch(err => {
      console.log("Error retrieving tickler attributes", err);
    })
  }



  private toogleAttributesDetail(processCaseTickler: ProcessCaseTickler) {
    this.ticklerAttributesVisibles["id" + processCaseTickler.id] = !this.ticklerAttributesVisibles["id" + processCaseTickler.id];
  }

  private isTicklerAttributeVisible(processCaseTickler: ProcessCaseTickler) {
    return this.ticklerAttributesVisibles["id" + processCaseTickler.id];
  }

  private ticklerAttributeName(processCaseTickler: ProcessCaseTickler, at: CampaignListAttribute): string {
    let ticklerAttribute: TicklerAttribute = null;
    let processCaseAttribute = processCaseTickler.attributes.find(atr => atr.code == at.code);
    if(this.ticklerAttributes){
      ticklerAttribute = this.ticklerAttributes.find(atr => atr.code == processCaseAttribute.code);

    }
    return ticklerAttribute ? ticklerAttribute.name : null;

  }

  private ticklerAttributeValues(processCaseTickler: ProcessCaseTickler, at: CampaignListAttribute): string {
    let att = processCaseTickler.attributes.find(atr => atr.code == at.code);
    return att.plainValues + " ";

  }

}


