import {Account} from "../../models/account";

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {CoinConstants} from "../../services/coin-constants";
import {PublicUrls} from "../../routing-constants";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TicklerProcess} from "../../models/tickler-processes";
import {Customer} from "../../models/customer";
import {ProcessCaseModel} from "../../models/process-case-model";
import {ROLE_STANDARD_CODES} from "../../models/role";
import {GlobalStateService} from "../../services/global-state.service";
import {AccountListInfo, TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {SearchAccountCriteriaParams} from "../../models/search-account-criteria-params";

@Component({
  selector: 'accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.css']
})
export class AccountsTableComponent implements OnInit {

  @Input() accounts: Account[] = null;
  @Input() customers: Customer = null;
  // The go button is not shown in the excluded account
  @Input() excluded: Account = null;
  @Input() searching: boolean;
  @Input() processes: TicklerProcess[] = null;
  @Input() hasCreateButton: boolean = false;
  @Input() hasToSaveParams: boolean = false;
  @Input() currentAccountServiceParams: AccountListInfo = new AccountListInfo();
  @Input() searchFilter: SearchAccountCriteriaParams = null;

  closeResult: string;
  constructor(private _router: Router, private modalService: NgbModal, private _globalStateService: GlobalStateService,
              private _temporalStateService: TemporalStateServiceService) { }

  ngOnInit() {
  }

  goToAccount(acc: Account) {
    if(this.hasToSaveParams){
      this._temporalStateService.accountListInfo = new AccountListInfo();
      this._temporalStateService.accountListInfo.currentCustomer = this.customers;
      this._temporalStateService.accountListInfo.currentParams = this.searchFilter;
    }

    this._router.navigate([PublicUrls.account.url, acc.accountId, acc.accountType, CoinConstants.NoCampaignRecordId]);
  }

  //open modal an close event
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //close modal reasons
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
