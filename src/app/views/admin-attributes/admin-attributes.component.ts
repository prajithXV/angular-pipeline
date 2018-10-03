import {Component, OnInit} from '@angular/core';
import {TicklerAttribute} from "../../models/tickler-attribute";
import {DataService} from "../../services/data.service";
import {Code} from "../../models/code";
import {LovType} from "../../models/lov-types";

@Component({
  selector: 'admin-attributes',
  templateUrl: './admin-attributes.component.html',
  styleUrls: ['./admin-attributes.component.css']
})
export class AdminAttributesComponent implements OnInit {

  ticklerAttributes: TicklerAttribute[] = null;
  lovTypes: LovType[] = null;
  typeCodes: Code[] = null;
  private searchingTicklerAttributes: boolean = false;
  private isCreating: boolean = false;


  constructor(private _dataService: DataService) {
  }

  ngOnInit() {
    //load attributes and codes
    this.loadTicklerAttributes();
    this.loadTicklerAttributeCodes();
    this.loadLovTypes();
  }

  //load type codes
  loadTicklerAttributeCodes() {
    this._dataService.getTicklerAttributeCodes().then(codes => this.typeCodes = codes);
  }

  //load tickler attributes
  loadTicklerAttributes() {
    this.isCreating = false;
    this.searchingTicklerAttributes = true;
    this._dataService.getTicklerAttributes().then(res => {
      this.ticklerAttributes = res;
      this.searchingTicklerAttributes = false;
    }).catch(e => {
      this.searchingTicklerAttributes = false;
      console.log("Error retrieving tickler attributes", e);
    })
  }

  loadLovTypes(){
    this._dataService.getLovTypes().then(res=>{
      this.lovTypes = res;
    }).catch(err=>{
      console.log(err);
      console.log("Error retrieving LOV types")
    })
  }


  //show or hide the list or the panel
  showTicklerAttributes(value: boolean) {
    this.isCreating = value;
  }


  //refresh
  refreshTicklerAttributes() {
    this.loadTicklerAttributes();
  }

}
