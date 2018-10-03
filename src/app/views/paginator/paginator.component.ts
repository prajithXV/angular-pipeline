import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CampaignListAccount} from "../../models/campign-list-accounts";
import {Pagination} from "../../models/pagination";

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() data: CampaignListAccount[];
  @Input() pagination: Pagination;
  @Input() disabled: boolean = false;
  @Input() hasNewSize: boolean = false;

  @Output() onPageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

//  incPage --> emit to child from parent
  private incPage(increment = 1) {
    this.onPageChange.emit(increment);
  }

}
