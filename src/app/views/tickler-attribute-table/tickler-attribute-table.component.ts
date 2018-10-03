import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TicklerAttribute} from "../../models/tickler-attribute";
import {TicklerAttributeModel} from "../../models/tickler-attribute-model";
import {Code} from "../../models/code";
import {LovType} from "../../models/lov-types";

@Component({
  selector: 'tickler-attribute-table',
  templateUrl: './tickler-attribute-table.component.html',
  styleUrls: ['./tickler-attribute-table.component.css']
})
export class TicklerAttributeTableComponent implements OnInit {

  @Input() ticklerAttributes: TicklerAttribute[] = null;
  @Input() typeCodes: Code[] = null;
  @Input() lovTypes: LovType[] = null;
  @Input() currentTicklerAttribute: TicklerAttribute = null;
  @Input() searchingTicklerAttributes: boolean = false;
  @Input() isCreating: boolean = false;
  @Output() onNewTicklerAttribute = new EventEmitter<TicklerAttributeModel>();
  @Output() onUpdateTicklerAttribute = new EventEmitter<boolean>();
  @Output() onCancelTicklerAttribute = new EventEmitter<boolean>();

  private ticklerAttributeVisibles = {};

  constructor() {
  }

  ngOnInit() {

  }


  lovName(att: TicklerAttribute){
   return this.lovTypes ? this.lovTypes.find(i=>i.lovCode == att.lovCode).lovName : null;
  }

  lovDescription(att: TicklerAttribute){
    return this.lovTypes ? this.lovTypes.find(i=>i.lovCode == att.lovCode).lovDescription : null;
  }

  //show or hide the list or the panel
  showTicklerAttributes(value: boolean) {
    this.onCancelTicklerAttribute.emit(value);
    // this.isCreating = value;
  }

  newTicklerAttribute() {
    // this.isCreating = false;
    this.ticklerAttributeVisibles = {};
    this.onNewTicklerAttribute.emit();
  }


  onCancelUpdate(ticklerAttribute: TicklerAttribute) {
    this.editTicklerAttribute(ticklerAttribute);
  }

  onUpdate() {
    this.ticklerAttributeVisibles = {};
    this.onUpdateTicklerAttribute.emit();
  }


  private editTicklerAttribute(ticklerAttribute: TicklerAttribute) {
    this.ticklerAttributeVisibles["id" + ticklerAttribute.id] = !this.ticklerAttributeVisibles["id" + ticklerAttribute.id];
  }

  private isTicklerAttributeVisible(ticklerAttribute: TicklerAttribute) {
    return this.ticklerAttributeVisibles["id" + ticklerAttribute.id];
  }


}
