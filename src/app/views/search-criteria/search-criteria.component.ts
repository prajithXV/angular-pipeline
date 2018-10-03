import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SearchAccountCriteriaParams} from "../../models/search-account-criteria-params";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {PublicUrls} from "../../routing-constants";
import {AccountListInfo, CampaignListInfo} from "../../services/temporal-state-service.service";
import {NgbTabset} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../services/data.service";
import {Code} from "../../models/code";

@Component({
  selector: 'search-criteria',
  templateUrl: './search-criteria.component.html',
  host: {'(window:keydown)': 'hotkeys($event)'},
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit {
  criteria: SearchAccountCriteriaParams = new SearchAccountCriteriaParams();

  @Input() searchingCustomer: boolean = false;
  @Input() currentAccountServiceParams: AccountListInfo = new AccountListInfo();
  @Output() onSearch = new EventEmitter<SearchAccountCriteriaParams>();
  @ViewChild('tab') private _tsAccount: NgbTabset;
  private isSearchButtonClicked: boolean = false;
  private isShowArrow: boolean = false;
 @Input() accountTypes: Code[] = null;


  constructor(private _dataService: DataService) {
  }



  ngOnChanges(changes){
    if(changes.currentAccountServiceParams && this.currentAccountServiceParams && this.currentAccountServiceParams.currentParams!=null){
      this.setCurrentParams();
    }else{
      this.criteria.accountType = null;
    }
  }

  ngOnInit() {

  this.loadAccountTypes();
    // this.searchButton(event);
    // Get params from url and search if param present
    // this._route.paramMap.subscribe((params: ParamMap) => {
    //   let phone = params.get(PublicUrls.main.phoneNumber);
    //   if (phone) {
    //     // this.criteria.phoneNumber = phone;
    //     this.search();
    //   }
    //
    // });

  }


  loadAccountTypes(){
    this._dataService.getAccountTypes().then(res=>{
      this.accountTypes = res;
    }).catch(err=>{
      console.log("Error retrieving account types", err);
    })
  }

  showForm(value: boolean){
    this.isSearchButtonClicked = value;
  }

  //set the saved params on the temporal state service
  setCurrentParams(){
    this.criteria = this.currentAccountServiceParams.currentParams.clone();
    this.isSearchButtonClicked = true;
    this.isShowArrow = true;
  }


  search() {
    this.currentAccountServiceParams.currentParams = this.criteria.clone();
    this.isSearchButtonClicked = true;
    this.isShowArrow = true;
    this.onSearch.emit(this.criteria);
  }

  hasAccountTypeCriteria(model: SearchAccountCriteriaParams): boolean{
    return model ? !model.accountType: false;
  }


  hasNotAccountAndTypeCriteriaValid(model: SearchAccountCriteriaParams): boolean{
    return this.criteria.accountId.trim() != "" && this.hasAccountTypeCriteria(model);
  }


  reset() {
    this.criteria.taxId = "";
    this.criteria.email = "";
    this.criteria.accountId = "";
    this.criteria.phoneNumber = "";
    this.criteria.accountType = null;
  }

  noCriteria(): boolean {
    return this.criteria.taxId.trim() == "" &&
      this.criteria.email.trim() == "" &&
      this.criteria.accountId.trim() == "" &&
      this.criteria.phoneNumber.trim() == "";
  }

  hotkeys(event){
    if (!this.noCriteria() && event.keyCode == 83 && event.altKey) {
      this.search();
    }
  }

}
