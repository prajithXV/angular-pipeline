import { NgModule } from '@angular/core';
import {BlankLayoutComponent} from "./components/common/layouts/blankLayout.component";
import {LoginComponent} from "./views/login/login.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";
import {ManageAccountComponent} from "./views/manage-account/manage-account.component";
import {SearchComponent} from "./views/search/search.component";
import {RouterModule, Routes} from "@angular/router";
import {
  AdminGuard, AdminMagerGuard, AdminMagerSupervisorGuard, LoggedGuard,
  NotLoggedGuard, TicklerAgentGuard
} from "./services/logged-guard.service";
import {PublicUrls, UrlComponents} from "./routing-constants";
import {StressComponent} from "./views/stress/stress.component";
import {ManageUsersComponent} from "./views/manage-users/manage-users.component";
import {StatisticsComponent} from "./views/statistics/statistics.component";
import {UnderConstructionComponent} from "./views/under-construction/under-construction.component";
import {CollectorsProductivityReportComponent} from "./views/collectors-productivity-report/collectors-productivity-report.component";
import {ManageCampaignsPageComponent} from "./views/manage-campaigns-page/manage-campaigns-page.component";
import {OverallProductivityReportComponent} from "./views/overall-productivity-report/overall-productivity-report.component";
import {CallsPerHourReportComponent} from "./views/calls-per-hour-report/calls-per-hour-report.component";
import {IncomingCallsReportComponent} from "./views/incoming-calls-report/incoming-calls-report.component";
import {ContactPercentageReportComponent} from "./views/contact-percentage-report/contact-percentage-report.component";
import {ManageCasesComponent} from "./views/manage-cases/manage-cases.component";
import {AdminProcessesComponent} from "./views/admin-processes/admin-processes.component";
import {AdminAttributesComponent} from "./views/admin-attributes/admin-attributes.component";
import {MainComponent} from "./views/main/main.component";
import {LovManagementComponent} from "./views/lov-management/lov-management.component";

const routes: Routes = [
  // LOGIN
  {
    path: UrlComponents.appPrefix, component: BlankLayoutComponent,
    children: [
      {path: UrlComponents.login, component: LoginComponent, canActivate: [NotLoggedGuard]}
    ]
  },
  // APP
  {
    path: UrlComponents.appPrefix,
    component: BasicLayoutComponent,
    canActivate: [LoggedGuard],

    children: [
      {path: `${UrlComponents.account}/:${PublicUrls.account.accountId}/:${PublicUrls.account.accountType}/:${PublicUrls.account.campaignRecord}`, component: ManageAccountComponent},
      // {path: `${UrlComponents.main}/:${PublicUrls.main.phoneNumber}`, component: SearchComponent},
      {path: `${UrlComponents.main}/:${PublicUrls.main.phoneNumber}`, component: MainComponent},
      // {path: UrlComponents.main, component: SearchComponent},
      {path: UrlComponents.main, component: MainComponent},
      // {path: "main2", component: MainComponent}
    ]
  },
  // ADMIN
  {
    path: UrlComponents.adminPrefix,
    component: BasicLayoutComponent,
    canActivate: [AdminMagerGuard],

    children: [
      {path: UrlComponents.stress, component: StressComponent},
      {path: UrlComponents.users, component: ManageUsersComponent},
      {path: UrlComponents.campaigns, component: ManageCampaignsPageComponent},
      {path: UrlComponents.processes, component: AdminProcessesComponent},
      {path: UrlComponents.attributes, component: AdminAttributesComponent},
      {path: UrlComponents.lovs, component: LovManagementComponent}
    ]
  },
  // REPORTS
  {
    path: UrlComponents.reportsPrefix,
    component: BasicLayoutComponent,
    canActivate: [AdminMagerSupervisorGuard],

    children: [
      {path: UrlComponents.campaigns_accomplishment, component: StatisticsComponent},
      {path: UrlComponents.overall_prod, component: OverallProductivityReportComponent},
      {path: UrlComponents.collectors_prod, component: CollectorsProductivityReportComponent},
      {path: UrlComponents.calls_per_hour, component: CallsPerHourReportComponent},
      {path: UrlComponents.incoming_calls, component: IncomingCallsReportComponent},
      {path: UrlComponents.contact_pctg, component: ContactPercentageReportComponent}
    ]
  },

  // Handle all other routes
  {path: '**', redirectTo: PublicUrls.login.url}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  declarations: [
  ],
  exports: [RouterModule],
  providers: [LoggedGuard, NotLoggedGuard, AdminGuard, AdminMagerGuard, AdminMagerSupervisorGuard, TicklerAgentGuard]
})
export class AppRoutingModule { }
