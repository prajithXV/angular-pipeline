import {Component, Input, OnInit} from '@angular/core';
import {CampaignListOrderByType} from "../../models/cl-order-by-type";
import {CampaignList} from "../../models/campaign-list";

@Component({
  selector: 'order-by-types',
  templateUrl: './order-by-types.component.html',
  styleUrls: ['./order-by-types.component.css']
})
export class OrderByTypesComponent implements OnInit {

  @Input() campaignListOrderByTypes: CampaignListOrderByType[] = null;
  @Input() currentList: CampaignList = null;



  constructor() { }

  ngOnInit() {
  }

}
