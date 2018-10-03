import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'header-sorter',
  templateUrl: './header-sorter.component.html',
  styleUrls: ['./header-sorter.component.css']
})
export class HeaderSorterComponent implements OnInit {

  @Input() isDesc: boolean = false;
  @Input() field: string = null;
  @Input() currentSortType: string = null;

  constructor() { }

  ngOnInit() {

  }

  isCurrent(): boolean {
    return this.currentSortType == this.field;
  }

}
