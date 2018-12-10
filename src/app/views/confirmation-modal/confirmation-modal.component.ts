import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() title: string;
  @Input() confirmationText: string;
  @Input() buttonText: string;
  @Output() buttonFunction = new EventEmitter<any>();

  object: any = null;

  @ViewChild('confirmationModal') private _modal: ModalDirective;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(object?: any) {
    this.object = object ? object : null;
    this.modalService.open(this._modal);
  }

  callButtonFunction() {
    this.buttonFunction.emit({object: this.object});
  }
}
