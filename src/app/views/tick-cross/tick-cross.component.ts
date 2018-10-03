import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tick-cross',
  templateUrl: './tick-cross.component.html',
  styleUrls: ['./tick-cross.component.css']
})
export class TickCrossComponent implements OnInit {
  @Input() value: boolean;

  constructor() { }

  ngOnInit() {
  }

}
