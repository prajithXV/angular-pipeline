import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TicklerType} from "../../models/tickler-types";
import {TicklerProcess} from "../../models/tickler-processes";
import {TicklerTypeModel} from "../../models/tickler-type-model";
import {DataService} from "../../services/data.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TicklerAttribute} from "../../models/tickler-attribute";

@Component({
  selector: 'tickler-types-table',
  templateUrl: './tickler-types-table.component.html',
  styleUrls: ['./tickler-types-table.component.css']
})
export class TicklerTypesTableComponent implements OnInit {

  @Input() ticklerTypes: TicklerType[] = null;
  @Input() currentProcess: TicklerProcess = null;
  @Input() ticklerAttributes: TicklerAttribute[] = null;
  @Input() searchingTypes: boolean = false;
  @Input() isCreating: boolean = false;
  @Output() addTicklerType = new EventEmitter<TicklerTypeModel>();
  @Output() onUpdateTicklerType = new EventEmitter<TicklerTypeModel>();
  @Output() onRemoveTicklerType = new EventEmitter<TicklerType>();
  @Output() onCancelTicklerType = new EventEmitter<boolean>();
  private closeResult: string;

  private waitingToRemove: string[] = [];
  private ticklerTypeVisibles = {};

  constructor(private _dataService: DataService, private  _userFeedbackService: UserFeedbackService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.currentProcess) {
      this.ticklerTypeVisibles = {};
      // this.isCreating = false;
    }
  }


  showTicklerTypes(value: boolean) {
    this.onCancelTicklerType.emit(value);
  }

  //emit to the parent when add a tickler type
  newTicklerType() {
    this.ticklerTypeVisibles = {};
    // this.isCreating = false;
    this.addTicklerType.emit();
  }

  //emit to the parent when update
  onUpdate() {
    this.ticklerTypeVisibles = {};
    this.onUpdateTicklerType.emit();
  }

  //cancel update
  onCancelUpdate(ticklerType: TicklerType) {
    this.editTicklerType(ticklerType);
  }


  openModal(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    })
  }


  private editTicklerType(ticklerType: TicklerType) {
    this.ticklerTypeVisibles["id" + ticklerType.id] = !this.ticklerTypeVisibles["id" + ticklerType.id];
  }

  private isTicklerTypeVisible(ticklerType: TicklerType) {
    return this.ticklerTypeVisibles["id" + ticklerType.id];
  }


  //Remove
  removeTicklerType(ticklerType: TicklerType) {
    //push index
    let index = null;
    this.waitingToRemove.push(ticklerType.id.toString());

    this._dataService.removeTicklerType(ticklerType).then(() => {
      if (ticklerType.id) {
        // remove index
        index = this.waitingToRemove.indexOf(ticklerType.id.toString());
        this.waitingToRemove.splice(index, 1);
      }
      this.ticklerTypeVisibles = {};
      this.onRemoveTicklerType.emit();
      this._userFeedbackService.handleSuccess("Tickler type removed");
    }).catch(err => {
      this._userFeedbackService.handleError("Error removing tickler type", err);
      this.waitingToRemove.splice(index, 1);
    });

  }


  //return index when waiting to remove
  private waiting(ticklerType: TicklerType) {
    return this.waitingToRemove.indexOf(ticklerType.id.toString()) > -1
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
