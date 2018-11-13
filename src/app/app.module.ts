import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ChartModule } from 'angular2-highcharts';
import { ChartsModule } from 'ng2-charts/ng2-charts';


// App views


// App modules/components
import { LayoutsModule } from "./components/common/layouts/layouts.module";
import {DataService} from "./services/data.service";
import {GlobalStateService} from "./services/global-state.service";
import {UserFeedbackService} from "./services/user-feedback.service";
import {BackendCommsService} from "./services/backend-comms.service";
import { LoginComponent } from './views/login/login.component';
import { MainOptionsComponent } from './views/main-options/main-options.component';
import { ManageAccountComponent } from './views/manage-account/manage-account.component';
import { SearchComponent } from './views/search/search.component';
import {AppRoutingModule} from "./app-routing.module";
import { NextCallComponent } from './views/next-call/next-call.component';
import { SearchCriteriaComponent } from './views/search-criteria/search-criteria.component';
import { CustomerSummaryComponent } from './views/customer-summary/customer-summary.component';
import { AccountsTableComponent } from './views/accounts-table/accounts-table.component';
import {DatePipe, HashLocationStrategy, LocationStrategy} from "@angular/common";
import { Location } from '@angular/common';

import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IboxtoolsModule} from "./components/common/iboxtools/iboxtools.module";
import { CustomerDetailComponent } from './views/customer-detail/customer-detail.component';
import { AccountCollectionComponent } from './views/account-collection/account-collection.component';
import { AccountLoanComponent } from './views/account-loan/account-loan.component';
import { AccountLossMitigationComponent } from './views/account-loss-mitigation/account-loss-mitigation.component';
import { AccountBakruptcyComponent } from './views/account-bakruptcy/account-bakruptcy.component';
import { AccountForeclosureComponent } from './views/account-foreclosure/account-foreclosure.component';
import { AccountAdditionalInfoComponent } from './views/account-additional-info/account-additional-info.component';
import {CiscoCommsService} from "./services/cisco-comms.service";
import {MockCiscoCommsService} from "app/services/mocks/mock-cisco-comms.service";
import {PipesModule} from "./general/pipes.module";
import { CustomerNotesComponent } from './views/customer-notes/customer-notes.component';
import {NewCallRecordComponent} from './views/new-call-record/new-call-record.component';
import { CallManagementComponent } from './views/call-management/call-management.component';
import { CoinDateInputComponent } from './views/coin-date-input/coin-date-input.component';
import { CoinNumberInputComponent } from './views/coin-number-input/coin-number-input.component';
// import {HTTP_INTERCEPTORS} from "@angular/common/http";
// import {SessionLossInterceptor} from "./general/session-loss-interceptor";
import { CustomerCallRecordsComponent } from './views/customer-call-records/customer-call-records.component';
import { StressComponent } from './views/stress/stress.component';
import { AccountHistoryComponent } from './views/account-history/account-history.component';
import { ManageUsersComponent } from './views/manage-users/manage-users.component';
import {AgentsTableComponent} from "./views/agents-table/agents-table.component";
import { SemaphoreComponent } from './views/semaphore/semaphore.component';
import { TickCrossComponent } from './views/tick-cross/tick-cross.component';
import {StatisticsComponent} from "./views/statistics/statistics.component";
import { CampaignStatsComponent } from './views/campaign-stats/campaign-stats.component';
import { CustomersTableComponent } from './views/customers-table/customers-table.component';
import { TabCounterComponent } from './views/tab-counter/tab-counter.component';
import {ModalModule, PopoverModule} from "ngx-bootstrap";
import { AgentCampaignsComponent } from './views/agent-campaigns/agent-campaigns.component';
import { UnderConstructionComponent } from './views/under-construction/under-construction.component';
import { CollectorsProductivityReportComponent } from './views/collectors-productivity-report/collectors-productivity-report.component';
import { CollectorsProductivityDataComponent } from './views/collectors-productivity-data/collectors-productivity-data.component';
import { CollectorsProductivityCriteriaComponent } from './views/collectors-productivity-criteria/collectors-productivity-criteria.component';
import { ManageCampaignsPageComponent } from './views/manage-campaigns-page/manage-campaigns-page.component';
import { ManageCampaignsComponent } from './views/manage-campaigns/manage-campaigns.component';
import { ManageCampaignListsComponent } from './views/manage-campaign-lists/manage-campaign-lists.component';
import { ManageCampaignListRecordsComponent } from './views/manage-campaigns-list-records/manage-campaigns-list-records.component';
import { OverallProductivityReportComponent } from './views/overall-productivity-report/overall-productivity-report.component';
import { OverallProductivityDataComponent } from './views/overall-productivity-data/overall-productivity-data.component';
import { CampaignAttributeEditionComponent } from './views/campaign-attribute-edition/campaign-attribute-edition.component';
import {CoinDatePipe} from "./pipes/coin-date.pipe";
import { CoinNumberInputErrorsComponent } from './views/coin-number-input-errors/coin-number-input-errors.component';
import { AgentRolesComponent } from './views/agent-roles/agent-roles.component';
import { XmppdebuggerComponent } from './views/xmppdebugger/xmppdebugger.component';
import { CampaignListAccountsTableComponent } from './views/campaign-list-accounts-table/campaign-list-accounts-table.component';
import { PaginatorComponent } from './views/paginator/paginator.component';
import { CallsPerHourReportComponent } from './views/calls-per-hour-report/calls-per-hour-report.component';
import { CallsPerHourCriteriaComponent } from './views/calls-per-hour-criteria/calls-per-hour-criteria.component';
import { CallsPerHourDataComponent } from './views/calls-per-hour-data/calls-per-hour-data.component';
import { CallsPerHourTableComponent } from './views/calls-per-hour-table/calls-per-hour-table.component';
import { CallsPerHourAverageDataComponent } from './views/calls-per-hour-average-data/calls-per-hour-average-data.component';
import {SortByPipe} from "./pipes/alphabetical-sort-name";
import { IncomingCallsReportComponent } from './views/incoming-calls-report/incoming-calls-report.component';
import { ContactPercentageReportComponent } from './views/contact-percentage-report/contact-percentage-report.component';
import { IncomingCallsDataComponent } from './views/incoming-calls-data/incoming-calls-data.component';
import { IncomingCallsTableComponent } from './views/incoming-calls-table/incoming-calls-table.component';
import { ContactPercentageTableComponent } from './views/contact-percentage-table/contact-percentage-table.component';
import { ContactPercentageDataComponent } from './views/contact-percentage-data/contact-percentage-data.component';
import { IncomingCallsNewGraphicComponent } from './views/incoming-calls-new-graphic/incoming-calls-new-graphic.component';
import { CallsPerHourNewGraphicComponent } from './views/calls-per-hour-new-graphic/calls-per-hour-new-graphic.component';
import { CallsPerHourAverageNewGraphicComponent } from './views/calls-per-hour-average-new-graphic/calls-per-hour-average-new-graphic.component';
import { ContactPercentageNewGraphicComponent } from './views/contact-percentage-new-graphic/contact-percentage-new-graphic.component';
import {CoinDateTransformPipe} from "./pipes/coin-date-transform.pipe";
import { NotificationTabComponent } from './views/notification-tab/notification-tab.component';
import {TelephonePipe, TelephoneTypePipe} from './pipes/telephone.pipe';
import { CallRecordStandardSentencesComponent } from './views/call-record-standard-sentences/call-record-standard-sentences.component';

import { AngularDraggableModule } from 'angular2-draggable';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';

import { OwlDateTimeModule, OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';
import { DatepickerComponent } from './views/datepicker/datepicker.component';
import { CancelCallRecordComponent } from './views/cancel-call-record/cancel-call-record.component';
import { BooleanToStringPipe } from './pipes/boolean-to-string.pipe';
import {MenuStateService} from "./services/menu-state.service";
import {NewProcessCaseComponent} from "./views/new-process-case/new-process-case";
import { ManageCasesComponent } from './views/manage-cases/manage-cases.component';
import { SearchCaseCriteriaComponent } from './views/search-case-criteria/search-case-criteria.component';
import { TicklerCasesTableComponent } from './views/tickler-cases-table/tickler-cases-table.component';
import { AdminProcessesComponent } from './views/admin-processes/admin-processes.component';
import { ProcessCaseTicklerTableComponent } from './views/process-case-tickler-table/process-case-tickler-table.component';
import { TicklerProcessTableComponent } from './views/tickler-process-table/tickler-process-table.component';
import { TicklerTypesTableComponent } from './views/tickler-types-table/tickler-types-table.component';
import { NewTicklerCaseComponent } from './views/new-tickler-case/new-tickler-case.component';
import { NewTicklerTypeComponent } from './views/new-tickler-type/new-tickler-type.component';
import { TicklerAttributeComponent } from './views/tickler-attribute/tickler-attribute.component';
import { TicklerAttributeTableComponent } from './views/tickler-attribute-table/tickler-attribute-table.component';
import { NewTicklerAttributeComponent } from './views/new-tickler-attribute/new-tickler-attribute.component';
import { AdminAttributesComponent } from './views/admin-attributes/admin-attributes.component';
import { NewTicklerAttributeMapComponent } from './views/new-tickler-attribute-map/new-tickler-attribute-map.component';
import { NewTicklerTypeMapComponent } from './views/new-tickler-type-map/new-tickler-type-map.component';
import { AttributeTypeToStringPipe } from './pipes/attribute-type-to-string.pipe';
import { BooleanToMandatoryStringPipe } from './pipes/boolean-to-mandatory-string.pipe';
import { ManageCaseComponent } from './views/manage-case/manage-case.component';
import { TicklerCasesDetailComponent } from './views/tickler-cases-detail/tickler-cases-detail.component';
import {ConsentPipe, ConsentPipeCorrectConversion} from './pipes/consent.pipe';
import { CustomerConsentComponent } from './views/customer-consent/customer-consent.component';
import { HeaderSorterComponent } from './views/header-sorter/header-sorter.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import {BooleanToStringOrderPipe, BooleanToStringDuePipe} from './pipes/boolean-to-string-order.pipe';
import { OrderByTypesComponent } from './views/order-by-types/order-by-types.component';
import {TemporalStateServiceService} from "./services/temporal-state-service.service";
import { MainComponent } from './views/main/main.component';
import { FullSearchComponent } from './views/full-search/full-search.component';
import { LovManagementComponent } from './views/lov-management/lov-management.component';
import { LovTypesTableComponent } from './views/lov-types-table/lov-types-table.component';
import { LovValuesTableComponent } from './views/lov-values-table/lov-values-table.component';
import { NewLovTypeComponent } from './views/new-lov-type/new-lov-type.component';
import { NewLovValueComponent } from './views/new-lov-value/new-lov-value.component';
import { ValueEditionComponent } from './views/value-edition/value-edition.component';
import { LovTypeToStringPipe } from './pipes/lov-type-to-string.pipe';
import { FilterCodeToNamePipe } from './pipes/filter-code-to-name.pipe';
import {HttpClientModule} from "@angular/common/http";
import { CallNotesComponent } from './views/call-notes/call-notes.component';
import { NewCallNotesComponent } from './views/new-call-notes/new-call-notes.component';
import {fakeBackendProvider} from "./services/mocks/fake-backend-factory";



export const MY_MOMENT_FORMATS = {
  parseInput: 'L',
  fullPickerInput: 'MM/DD/YYYY HH:mm',
  datePickerInput: 'L',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainOptionsComponent,
    ManageAccountComponent,
    SearchComponent,
    NextCallComponent,
    SearchCriteriaComponent,
    CustomerSummaryComponent,
    AccountsTableComponent,
    CustomerDetailComponent,
    AccountCollectionComponent,
    AccountLoanComponent,
    AccountLossMitigationComponent,
    AccountBakruptcyComponent,
    AccountForeclosureComponent,
    AccountAdditionalInfoComponent,
    CustomerNotesComponent,
    NewCallRecordComponent,
    CallManagementComponent,
    CoinDateInputComponent,
    CoinNumberInputComponent,
    CustomerCallRecordsComponent,
    StressComponent,
    AccountHistoryComponent,
    ManageUsersComponent,
    AgentsTableComponent,
    SemaphoreComponent,
    TickCrossComponent,
    StatisticsComponent,
    CampaignStatsComponent,
    CustomersTableComponent,
    TabCounterComponent,
    AgentCampaignsComponent,
    UnderConstructionComponent,
    CollectorsProductivityReportComponent,
    CollectorsProductivityDataComponent,
    CollectorsProductivityCriteriaComponent,
    ManageCampaignsPageComponent,
    ManageCampaignsComponent,
    ManageCampaignListsComponent,
    ManageCampaignListRecordsComponent,
    OverallProductivityReportComponent,
    OverallProductivityDataComponent,
    CampaignAttributeEditionComponent,
    CoinNumberInputErrorsComponent,
    AgentRolesComponent,
    XmppdebuggerComponent,
    CampaignListAccountsTableComponent,
    CallsPerHourReportComponent,
    PaginatorComponent,
    CallsPerHourCriteriaComponent,
    CallsPerHourDataComponent,
    CallsPerHourTableComponent,
    CallsPerHourAverageDataComponent,
    IncomingCallsReportComponent,
    ContactPercentageReportComponent,
    IncomingCallsDataComponent,
    IncomingCallsTableComponent,
    ContactPercentageTableComponent,
    ContactPercentageDataComponent,
    IncomingCallsNewGraphicComponent,
    CallsPerHourNewGraphicComponent,
    CallsPerHourAverageNewGraphicComponent,
    ContactPercentageNewGraphicComponent,
    NotificationTabComponent,
    CallRecordStandardSentencesComponent,
    DatepickerComponent,
    CancelCallRecordComponent,
    NewProcessCaseComponent,
    ManageCasesComponent,
    SearchCaseCriteriaComponent,
    TicklerCasesTableComponent,
    AdminProcessesComponent,
    ProcessCaseTicklerTableComponent,
    TicklerProcessTableComponent,
    TicklerTypesTableComponent,
    NewTicklerCaseComponent,
    NewTicklerTypeComponent,
    TicklerAttributeComponent,
    TicklerAttributeTableComponent,
    NewTicklerAttributeComponent,
    AdminAttributesComponent,
    NewTicklerAttributeMapComponent,
    NewTicklerTypeMapComponent,
    ManageCaseComponent,
    TicklerCasesDetailComponent,
    CustomerConsentComponent,
    HeaderSorterComponent,
    OrderByTypesComponent,
    MainComponent,
    FullSearchComponent,
    LovManagementComponent,
    LovTypesTableComponent,
    LovValuesTableComponent,
    NewLovTypeComponent,
    NewLovValueComponent,
    ValueEditionComponent,
    CallNotesComponent,
    NewCallNotesComponent,
  ],
  imports: [
    BrowserModule,
    ChartModule.forRoot(require('highcharts')),
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    IboxtoolsModule,
    PipesModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    AngularDraggableModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    BrowserAnimationsModule,

    // BsDatepickerModule.forRoot()
  ],
  providers: [
    BackendCommsService,
    // { provide: BackendCommsService, useClass: MockBackendCommsService },
    { provide: CiscoCommsService, useClass: MockCiscoCommsService },
    // FakeBackendFactory,
    DataService,
    GlobalStateService,
    MenuStateService,
    UserFeedbackService,
    Location,
    TemporalStateServiceService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
    DatePipe,
    CoinDatePipe,
    CoinDateTransformPipe,
    AttributeTypeToStringPipe,
    TelephonePipe,
    TelephoneTypePipe,
    BooleanToStringPipe,
    BooleanToMandatoryStringPipe,
    SortByPipe,
    ConsentPipe,
    ConsentPipeCorrectConversion,
    OrderByPipe,
    BooleanToStringOrderPipe,
    BooleanToStringDuePipe,
    LovTypeToStringPipe,
    FilterCodeToNamePipe
    // providers used to create fake backend
    // ,fakeBackendProvider
  ],

  bootstrap: [AppComponent]
})
export class AppModule {

}
