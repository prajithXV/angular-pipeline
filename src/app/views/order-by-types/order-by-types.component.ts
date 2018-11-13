import {Component, Input, OnInit} from '@angular/core';
import {CampaignListOrderByType} from "../../models/cl-order-by-type";
import {CampaignList} from "../../models/campaign-list";
import {CLOrder} from "../manage-campaign-lists/manage-campaign-lists.component";

@Component({
  selector: 'order-by-types',
  templateUrl: './order-by-types.component.html',
  styleUrls: ['./order-by-types.component.css']
})
export class OrderByTypesComponent implements OnInit {
  @Input() campaignListOrderByTypes: CampaignListOrderByType[] = null;
  @Input() order: CLOrder;
  constructor() { }

  ngOnInit() {
  }

}
