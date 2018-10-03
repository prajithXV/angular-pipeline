import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CampaignListAccount} from "../../models/campign-list-accounts";
import {PublicUrls} from "../../routing-constants";
import {CoinConstants} from "../../services/coin-constants";
import {Router} from "@angular/router";
import {Pagination} from "../../models/pagination";
import {PaginatorComponent} from "../paginator/paginator.component";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TicklerProcess} from "../../models/tickler-processes";
import {ProcessCaseModel} from "../../models/process-case-model";
import {SearchAccountCriteriaParams} from "../../models/search-account-criteria-params";
import {Customer} from "../../models/customer";
import {DataService} from "../../services/data.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ROLE_STANDARD_CODES} from "../../models/role";
import {GlobalStateService} from "../../services/global-state.service";
import {SearchCampaignCriteriaParams} from "../../models/search-campaign-criteria-params";
import {CampaignListInfo, TemporalStateServiceService} from "../../services/temporal-state-service.service";

@Component({
  selector: 'campaign-list-accounts-table',
  templateUrl: './campaign-list-accounts-table.component.html',
  styleUrls: ['./campaign-list-accounts-table.component.css']
})
export class CampaignListAccountsTableComponent implements OnInit {
  @Input() campaignListAccounts: CampaignListAccount[];
  @Input() accounts: CampaignListAccount[];
  @Input() processes: TicklerProcess[] = null;
  @Input() searchingAccounts: boolean;
  @Input() isVisible: boolean;
  @Input() currentCampaign: CampaignListAccount = null;
  @Input() pagination: Pagination;
  @Input() clCurrentParams: SearchCampaignCriteriaParams = null;
  @Input() currentServiceParams: CampaignListInfo;
  @Output() onPageChange = new EventEmitter<number>();

  private currentCustomer: Customer = null;

  closeResult: string;

  constructor(private _router: Router, private modalService: NgbModal, private _globalStateService: GlobalStateService,
              private _temporalStateService: TemporalStateServiceService) {
  }

  ngOnInit() {

  }


  ngOnChanges(changes){
    if(changes.currentServiceParams && this.currentServiceParams && this.currentServiceParams.currentPagination){
      this.setCurrentPaginagion();
    }
  }

  setCurrentPaginagion(){
     this.pagination.currPage = this.currentServiceParams.currentPagination.currPage;
  }

  goToListAccount(ac: CampaignListAccount) {
    this._temporalStateService.campaignListInfo = new CampaignListInfo();

    this._temporalStateService.campaignListInfo.currentParams = this.clCurrentParams;
    this._temporalStateService.campaignListInfo.currentPagination = this.pagination;
    // this.currentServiceParams = this._temporalStateService.campaignListInfo;

    this._router.navigate([PublicUrls.account.url, ac.accountId, ac.accountType, ac.campaignRecordId]);
  }


  private incPage(increment = 1) {
    this.onPageChange.emit(increment);
  }


  //open the modal and gets the customer from the account
  open(content, ac: CampaignListAccount) {

    this.currentCustomer = new Customer(ac.campaignFId);

    //if there not a customer, gets the data
    // if(this.currentCustomer == null){
    //   this._dataService
    //     .getCustomerFromAccount(ac.accountId, ac.accountType)
    //     .subscribe(custs => {
    //
    //         // avoid that an error influences other fields
    //         try {
    //           this.currentCustomer = custs;
    //
    //         } catch (error) {
    //           console.log("Error managing account", error);
    //           this._userFeedbackService.handleError("Error dealing with account's data", error);
    //         }
    //       }
    //       ,
    //       error => console.log("error")
    //     );
    // }
    //close
    this.modalService.open(content).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  canCreateCase(){
    return this._globalStateService.loggedAgentHasRoleCode(ROLE_STANDARD_CODES.CREATE_TICKLER_CASE);
  }

}
