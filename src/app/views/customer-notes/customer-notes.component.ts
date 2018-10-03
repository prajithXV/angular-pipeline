import {Component, Input, OnInit} from '@angular/core';
import {CustomerNote} from "../../models/customer-note";

@Component({
  selector: 'customer-notes',
  templateUrl: './customer-notes.component.html',
  styleUrls: ['./customer-notes.component.css']
})
export class CustomerNotesComponent implements OnInit {
  @Input() notes: CustomerNote[] = null;
  @Input() searching: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
