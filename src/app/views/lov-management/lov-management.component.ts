import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {LovType} from "../../models/lov-types";
import {LovValue} from "../../models/lov-values";

@Component({
  selector: 'lov-management',
  templateUrl: './lov-management.component.html',
  styleUrls: ['./lov-management.component.css']
})
export class LovManagementComponent implements OnInit {

  lovTypes: LovType[] = null;
  private searchingLovTypes: boolean = false;
  private isCreating: boolean = false;


  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.loadLovTypes();
  }


  loadLovTypes(){
    this.isCreating = false;
    this.searchingLovTypes = true;
    this._dataService.getLovTypes().then(res=>{
      this.lovTypes = res;
      this.searchingLovTypes = false;
    }).catch(err=>{
      this.searchingLovTypes = false;
      console.log(err);
      console.log("Error retrieving LOV types");
    })
  }


  showLovTypes(value: boolean) {
    this.isCreating = value;
  }



  refreshLov(){
    this.loadLovTypes();
  }


}
