import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Customer} from "../../models/customer";
import {DataService} from "../../services/data.service";
import {Phone} from "../../models/phone";
import {MakeCallEvent} from "../manage-account/manage-account.component";
import {CampaignListRecord} from "../../models/campaign-list-record";
import {Role} from "../../models/role";

@Component({
  selector: 'customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.css']
})
export class CustomersTableComponent implements OnInit {
  @Input() customers: Customer[];
  @Input() searching: boolean;
  @Output() onCall = new EventEmitter<MakeCallEvent>();
  private searchingPhoneNumbers: string[] = [];


  constructor(private _dataService: DataService) { }
  ngOnInit() {

  }





  //we pass a Customer to can print the custom information (telephone)
  getPhone(cust:Customer ){
      this.searchingPhoneNumbers.push(cust.id);
      this._dataService.getInfoCustomer(cust).then(info =>{
        if(info){
          let index = this.searchingPhoneNumbers.indexOf(info.id);
          this.searchingPhoneNumbers.splice(index, 1);
        }


      }).catch(e => console.log(e));



  }



  private searchNumbers(customer: Customer) {
    return this.searchingPhoneNumbers.indexOf(customer.id) > -1;
  }

  call(phone: Phone) {
    let event = new MakeCallEvent();
    event.phone = phone;
    event.isCoBorrower = true;
    this.onCall.emit(event);
  }


}
