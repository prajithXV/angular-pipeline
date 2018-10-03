import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchTicklerCaseParams} from "../../models/search-tickler-case-params";
import {DataService} from "../../services/data.service";
import {Code} from "../../models/code";
import {TicklerProcess} from "../../models/tickler-processes";
import {CasesListInfo} from "../../services/temporal-state-service.service";

@Component({
  selector: 'search-case-criteria',
  templateUrl: './search-case-criteria.component.html',
  styleUrls: ['./search-case-criteria.component.css']
})
export class SearchCaseCriteriaComponent implements OnInit {
  @Input() searchingProcessCases: boolean = false;
  @Input() processes: TicklerProcess[] = null;
  @Output() onSearch = new EventEmitter<any>();
  @Input() currentCriteriaParams: SearchTicklerCaseParams;
  @Input() currentCasesServiceParams: CasesListInfo = new CasesListInfo();

  private isSearchButtonClicked: boolean = false;
  private isShowArrow: boolean = false;
  @Input() statuses: Code[] = null;
  @Input() followUpDues: Code[] = null;
  criteria: SearchTicklerCaseParams = new SearchTicklerCaseParams();


  constructor(private _dataService: DataService) {
  }

  ngOnChanges(changes) {
    if (changes.currentCasesServiceParams && this.currentCasesServiceParams && this.currentCasesServiceParams.currentParams!=null) {
      this.setParams()
    }

  }

  setParams(){
    this.criteria = this.currentCasesServiceParams.currentParams.clone();
    this.isSearchButtonClicked = true;
    this.isShowArrow = true;
  }



  ngOnInit() {
    //loads status and processes
    this.loadStatusCodes();
    this.loadFollowUpDueCodes();

  }

  //loads the codes to gets the tickler status name
  loadStatusCodes(){
    this._dataService.getTicklerStatusCodes().then(codes => this.statuses = codes);
  }

  loadFollowUpDueCodes(){
    this._dataService.getFollowUpDueCodes().then(codes => this.followUpDues = codes);
  }

  get hasInputNumberErrors():boolean {
    return this.criteria.Id < 0;
  }

  get hasFormErrors():boolean{
    return this.hasInputNumberErrors;
  }

  showForm(value: boolean){
    this.isSearchButtonClicked = value;
  }

  //emits the criteria to the parent
  search() {
    this.currentCasesServiceParams.currentParams = this.criteria.clone();
    this.isSearchButtonClicked = true;
    this.isShowArrow = true;
    this.onSearch.emit(this.criteria);
  }

  //reset the criteria form
  reset() {
    this.criteria.Id = null;
    this.criteria.AccountId = "";
    this.criteria.CifId = "";
    this.criteria.AssignedUser = "";
    this.criteria.ProcessCd = null;
    this.criteria.StatusCd = null;
    this.criteria.FollowUpDueCd = null;
  }

}
