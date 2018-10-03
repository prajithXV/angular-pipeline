import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {TicklerAttribute} from "../../models/tickler-attribute";

@Component({
  selector: 'tickler-attribute',
  templateUrl: './tickler-attribute.component.html',
  styleUrls: ['./tickler-attribute.component.css']
})
export class TicklerAttributeComponent implements OnInit {

  ticklerAttributes: TicklerAttribute[] = null;
  private searchingTicklerAttributes: boolean = false;


  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.loadTicklerAttributes();
  }


  loadTicklerAttributes(){
    this.searchingTicklerAttributes = true;
    this._dataService.getTicklerAttributes().then(res => {
      this.ticklerAttributes = res;
      this.searchingTicklerAttributes = false;
    }).catch(e =>{
      this.searchingTicklerAttributes = false;
      console.log("Error retrieving tickler attributes", e);
    })
  }


  refreshTicklerAttributes(){
    this.loadTicklerAttributes();
  }

}
