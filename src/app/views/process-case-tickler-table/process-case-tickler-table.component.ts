import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProcessCaseTickler} from "../../models/process-case-tickler";
import {ProcessCase} from "../../models/process-case";
import {TicklerCaseModel} from "../../models/tickler-case-model";
import {TicklerType} from "../../models/tickler-types";
import {DataService} from "../../services/data.service";
import {TicklerAttribute} from "../../models/tickler-attribute";
import {CampaignListAttribute} from "../../models/campaign-list-attribute";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {GlobalStateService} from "../../services/global-state.service";


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
  @Output() onDeleteTicklerCase = new EventEmitter<ProcessCaseTickler>();
  @Output() onCancel = new EventEmitter<boolean>();
  @Input() isCreating: boolean = false;
  private ticklerAttributesVisibles = {};
  private closeResult: string;
  private waitingToRemove: boolean = false;

  constructor(private _dataService:DataService, private modalService: NgbModal, private _userFeedbackService: UserFeedbackService,
              private _globalStateService: GlobalStateService) {
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


  deleteCaseTickler(caseTickler: ProcessCaseTickler) {

    this.waitingToRemove = true;
    this._dataService.deleteCaseTickler(caseTickler, this._globalStateService.loggedAgent).then(() => {

      // this.ticklerTypeVisibles = {};
      this.onDeleteTicklerCase.emit();
      this.waitingToRemove = false;
      this._userFeedbackService.handleSuccess("Tickler type removed");
    }).catch(err => {
      this._userFeedbackService.handleError("Error removing tickler type", err);
      this.waitingToRemove = false;

    });

  }


  openModal(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}


