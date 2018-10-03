import {Component, Input, OnInit} from '@angular/core';
import {Campaign} from "../../models/campaign";
import {ContactPercentage} from "../../models/contact-percentage";

@Component({
  selector: 'contact-percentage-data',
  templateUrl: './contact-percentage-data.component.html',
  styleUrls: ['./contact-percentage-data.component.css']
})
export class ContactPercentageDataComponent implements OnInit {

  @Input() visibleTable:boolean;
  @Input() searchingData:boolean;
  @Input() campaigns: Campaign[];
  @Input() table: Array<{ name: string, campaign: ContactPercentage }> = [];
  @Input() contactPercentage: ContactPercentage[];


  constructor() { }

  ngOnInit() {
  }

}
