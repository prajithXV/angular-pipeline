import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ResizeEvent} from "angular-resizable-element";

@Component({
  selector: 'floating-sentences',
  templateUrl: './floating-sentences.component.html',
  styleUrls: ['./floating-sentences.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FloatingSentencesComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  // onResizeEnd(event: ResizeEvent): void {
  //   console.log('Element was resized', event);
  // }

  hide() {
    this.onClose.emit(true);
  }
}
