import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tab-counter',
  templateUrl: './tab-counter.component.html',
  styleUrls: ['./tab-counter.component.css']
})
export class TabCounterComponent implements OnInit {
  @Input() data: any[];
  @Input() searching:boolean;

  constructor() { }

  ngOnInit() {
  }

}
