import {Component, Input, OnInit} from '@angular/core';
import {ContactPercentage} from "../../models/contact-percentage";
import {Campaign} from "../../models/campaign";

@Component({
  selector: 'contact-percentage-table',
  templateUrl: './contact-percentage-table.component.html',
  styleUrls: ['./contact-percentage-table.component.css']
})
export class ContactPercentageTableComponent implements OnInit {
  @Input() visibleTable:boolean;
  @Input() searchingData:boolean;
  @Input() campaigns: Campaign[];
  @Input() table: Array<{ name: string, campaign: ContactPercentage }> = [];
  constructor() { }

  ngOnInit() {
  }

}
