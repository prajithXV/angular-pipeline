import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {PublicUrls} from "../../routing-constants";
import {ProcessCase} from "../../models/process-case";
import {Pagination} from "../../models/pagination";
import {TicklerProcess} from "../../models/tickler-processes";
import {ProcessCaseTickler} from "../../models/process-case-tickler";
import {TicklerType} from "../../models/tickler-types";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {Account} from "../../models/account";
import {CoinConstants} from "../../services/coin-constants";
import {Agent} from "../../models/agent";
import { Location } from '@angular/common';
import {Router} from "@angular/router";
import {IboxtoolsComponent} from "../../components/common/iboxtools/iboxtools.component";

@Component({
  selector: 'manage-case',
  templateUrl: './manage-case.component.html',
  styleUrls: ['./manage-case.component.css']
})
export class ManageCaseComponent implements OnInit {
  @Input() isCreating: boolean = false;

  @ViewChild('notes') private _notesCalliBox: IboxtoolsComponent;

  processCase: ProcessCase = null;
  currentProcessCase: ProcessCase = null;
  processes: TicklerProcess[] = null;
  ticklerTypes: TicklerType[] = null;
  processCaseTicklers: ProcessCaseTickler[] = null;
  pagination: Pagination = new Pagination(null, null);
  account: Account = null;
  currentAgent: Agent = null;
  currentAgentCreatedBy: Agent = null;
  private searchingProcessCase: boolean = false;
  private searchingCaseTicklers: boolean = false;
  private searchingAccountInfo: boolean = false;
  private searchingAccountAdditionalInfo: boolean = false;
  private searchingAccountLoanInfo: boolean = false;
  private searchingUsers: boolean = false;
  private filterProcesses: TicklerProcess = null;
  private searchingProcesses: boolean = false;
  private searchingCalls: boolean = false;


  constructor(private _dataService: DataService,private _route: ActivatedRoute, private _userFeedbackService: UserFeedbackService) {

    // this._router.events.subscribe((val)=>{
    //   let currentRoute = this._location.path();
    //   if(currentRoute == "/process/case/15"){
    //
    //   }else{
    //     this._temporalStateService.casesListInfo = null;
    //   }
    // })

  }

  onNewTickler() {
    this.isCreating = true;
  }

  onCancel(){
    this.isCreating = false;
  }

  isNotesBoxOpen() {
    return this._notesCalliBox && this._notesCalliBox.isOpen;
  }

  ngOnInit() {
    this.loadCases();
    this.loadProcesses();
  }

  //load cases with id -> gets this from url
  loadCases() {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.searchingProcessCase = true;
      let caseId = params.get(PublicUrls.process_case.caseId);
      this.processCase = new ProcessCase(parseInt(caseId));

      this._dataService.getCaseById(this.processCase).then(res => {
        this.currentProcessCase = res[0];
          //load users
          this.loadUserAgents(this.currentProcessCase);
          //load information of account
          this.loadCompleteInformationAccount(this.currentProcessCase);
          //load case ticklers (second component)
          this.loadCaseTicklers(this.currentProcessCase);

        this.searchingProcessCase = false;
      }).catch(err=>{
        this.searchingProcessCase = false;
        console.log("Error retrieving process case");
        console.log(err);
      })
    })
  }


  //loads all the necessary account information
  loadCompleteInformationAccount(processCase: ProcessCase){
    // Load the operational data
    this.searchingAccountInfo = true;
    this.searchingCalls = true;
    this.account = null;

    this._dataService
      .getCompleteInfoForAccount(processCase? processCase.accountId: null, CoinConstants.defaultAccountType, CoinConstants.NoCampaignRecordId, null, false)
      .subscribe(account => {
          // avoid that an error influences other fields
          try {
            this.account = account;

            if (this.account.collection) {
              this.searchingAccountInfo = false;
            }
            if (this.account.additionalInfo) {
              this.searchingAccountAdditionalInfo = false;
            }
            if (this.account.loan) {
              this.searchingAccountLoanInfo = false;
            }
            if (this.account.customer && this.account.customer.callRecords) {
              this.searchingCalls = false;
            }

          } catch (error) {
            console.log("Error managing account", error);
            this._userFeedbackService.handleError("Error dealing with account's data", error);
            this.searchingAccountLoanInfo = false;
            this.searchingAccountAdditionalInfo = false;
            this.searchingAccountInfo = false;
            this.searchingCalls = false;
          }
        }
        ,
        error => console.log("error"),
      );
  }


  //load processes to can get the tickler types
  loadProcesses(){
    //load processes
    this._dataService.getProcesses().then((processes) => {
      this.processes = processes;
    }).catch((err) => {
      console.log("Error retrieving processes");
      console.log(err);
    });
  }


  //load users and find with his userCode to can has the FN + LN
  loadUserAgents(processCase: ProcessCase){
    let agents: Agent[] = null;
    this.searchingUsers = true;
    this._dataService.getAgents().then(res=>{
      agents = res;
      if(processCase!= null){
        this.currentAgent = agents.find(a=>a.account == processCase.assignedUser);
        this.currentAgentCreatedBy = agents.find(a=>a.account == processCase.createdBy);
      }

     this.searchingUsers = false;

    }).catch(err=>{
      this.searchingUsers = false;
      console.log("Error retrieving users");
      console.log(err);
    })
  }

  //load case ticklers (second component)
  loadCaseTicklers(processCase: ProcessCase){
    this.searchingCaseTicklers = true;
    this.searchingProcesses = true;
    this._dataService.getProcessCaseTicklers(processCase).then(res => {
      this.processCaseTicklers = res;
      this.searchingCaseTicklers = false;
      this.processCaseTicklers.sort((d1,d2)=> new Date(d2.createdDate).getTime() - new Date(d1.createdDate).getTime());
      //tickler types combo
      if(processCase!=null){
        this.filterProcesses = this.processes.find(p=> p.processCode === processCase.processCode);
      }
      this.searchingProcesses = false;
      this._dataService.getTicklerTypes(this.filterProcesses).then(res => {
        this.ticklerTypes = res;
      }).catch(err =>{
        this.searchingCaseTicklers = false;
        console.log("Error retrieving tickler types");
        console.log(err);
      })
    }).catch(err=>{
      console.log("Error retrieving case ticklers");
      console.log(err);
      this.searchingCaseTicklers = false;
    })
  }

  //refresh when click on add: this function has inside the other functions (refresh all)
  refreshCaseTicklers(){
    this.isCreating = false;
    this.loadCases();
  }

}
