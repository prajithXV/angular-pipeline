import {tokenBody} from "../../../api/token";
import {custSrchBodyL11} from "../../../api/accSrch-custL11";
import {accInqBody1423L} from "../../../api/accInq-cust1423L";
import {custInqBody, custInqBodyPhLst} from "../../../api/custInq";
import {custSrchBody1Result} from "../../../api/custSrch-1result";
import {custSrchBody2Results} from "../../../api/custSrch-2results";
import {custSrchBodyResult} from "../../../api/msgsrch-custBCB6019";
import {getNextAccountBody} from "../../../api/getNextAccount";
import {ciscoGetDialogEmpty, ciscoGetDialogInboundAlerting} from "../../../api/ciscoGetCurrCall";
import {getCampaignsBody} from "../../../api/getCampaigns";
import {ciscoGetUserBodyResultNotReady, ciscoGetUserBodyResultTalking} from "../../../api/cisco_get_user";
import {callRecordsBody} from "../../../api/callRecords";
import {getUserByCodeBody, getUsersBody} from "../../../api/users";
import {accHistBody} from "../../../api/accHistory";
import {statBody} from "../../../api/stat";
import {sneakMock} from "../../../environments/common-constants";
import {collectorsProductivityBody} from "../../../api/getCollectorsProductivity";
import {campaignListRecordsBody, campaignListsBody, campaignsBody} from "../../../api/campaigns";
import {overallProductivityBody} from "../../../api/getOverallProductivity";
import {campaignListStatsBody} from "../../../api/campaignListStats";
import {getRolesBody} from "../../../api/getRoles";
import {claccountsBody} from "../../../api/clAccounts";
import {callsPerHourBody} from "../../../api/callsPersHour";
import {incomingCallsReportBody} from "../../../api/reportIncomingCalls";
import {contactPercentageReport} from "../../../api/reportCtctPctg";
import {getCancelTypesBody} from "../../../api/getCancelTypes";
import {getAccHistBody} from "../../../api/accHistoryGet";
import {
  getCasesBody,
  getCaseTicklersBody,
  getProcessesBody,
  getTicklerTypes,
  ticklerAttributeBody,
  ticklerAttributeMapBody,
  ticklerTypeMapBody
} from "../../../api/ticklers";
import {getCaseBody} from "../../../api/getCase";
import {customerConsentsBody} from "../../../api/customer-consents";
import {clOrderbyBody} from "../../../api/clOrderby";
import {getLovBody} from "../../../api/lov-types";
import {getLovTypes} from "../../../api/get-lov-types";
import {lovValuesBody} from "../../../api/lov-values";
import {lovValuesBody1} from "../../../api/lov-values1";
import {lovValuesBody2} from "../../../api/lov-values2";
import {lovValuesBody3} from "../../../api/lov-values3";
import {accInqDepBody} from "../../../api/accInq-cnDep";
import {memoNotesBody} from "../../../api/memo-notes";
import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {delay, dematerialize, materialize, mergeMap} from "rxjs/operators";

// Put sneak mock
sneakMock.mocked = true;


@Injectable()
export class FakeBackendFactory implements HttpInterceptor {
  private calling = false;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {
      console.log("=========== FAK url: " + request.urlWithParams + " === Mehtod: " + request.method);
      // TOKEN
      if (request.url.indexOf('/token') >= 0 && request.method === "POST") {
        console.log("FAK token");
        return of(new HttpResponse({
          status: 200,
          body: tokenBody
        }));
      }

      // Campaigns get
      else if (request.url.indexOf('/usercampaigns') >= 0 && request.method === "GET") {
        console.log("FAK usercampaigns");
        return of(new HttpResponse({
          status: 200,
          body: getCampaignsBody
        }));
      }

      // Assign user campaigns
      else if (request.url.indexOf('/usercampaigns') >= 0 && request.method === "POST") {
        console.log("FAK assign usercampaigns");
        return of(new HttpResponse({
          status: 200
        }));
      }

      // Users
      else if (request.url.indexOf('/users') >= 0 && request.method === "GET") {
        console.log("FAK usercampaigns");
        return of(new HttpResponse({
          status: 200,
          body: request.urlWithParams.indexOf('userCd') >= 0 ? getUserByCodeBody : getUsersBody
        }));
      }

      // NEXTACCOUNT
      else if (request.url.indexOf('/accounts/next') >= 0 && request.method === "GET") {
        console.log("FAK account/next");
        // connection.mockError({status: 401} as any as Error);
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200,
          body: getNextAccountBody
        }));
      }

      // CUSTSRCH
      else if (request.url.indexOf('/custsrch') >= 0 && request.method === "GET") {
        console.log("FAK custsrch");
        if (request.urlWithParams.indexOf('taxId') >= 0) {
          return of(new HttpResponse({
            status: 200,
            body: custSrchBody1Result
          }));
        } else {
          return of(new HttpResponse({
            status: 200,
            body: custSrchBody2Results
          }));
        }
      }

      // ACCTSRCH
      else if (request.url.indexOf('/acctSrch') >= 0 && request.method === "GET") {
        console.log("FAK acctsrch");
        return of(new HttpResponse({
          status: 200,
          body: custSrchBodyL11
        }));
      }

      // today contact
      else if (request.url.indexOf('/statistics/customer_calls_count') >= 0 && request.method === "GET") {
        console.log("FAK today contact");
        return of(new HttpResponse({
          status: 200,
          body: "2"
        }));
      }

      // account calls
      else if (request.url.indexOf('/statistics/account_calls_count') >= 0 && request.method === "GET") {
        console.log("FAK today contact");
        return of(new HttpResponse({
          status: 200,
          body: "2"
        }));
      }

      // ACCTHISTORY
      else if (request.url.indexOf('/acctHistSrch') >= 0 && request.method === "GET") {
        console.log("FAK acctHistSrch");
        return of(new HttpResponse({
          status: 200,
          // body: accHistBodyEmpty
          body: accHistBody
        }));
      }

      // ACCTINQ
      else if (request.url.indexOf('/acctInq') >= 0 && request.method === "GET") {
        if (request.urlWithParams.includes('accountType=L')) {
          console.log("FAK ACCTINQ L");
          return of(new HttpResponse({
            status: 200,
            body: accInqBody1423L
          }));

        }

        if (request.urlWithParams.includes('accountType=D')) {
          console.log("FAK ACCTINQ D");
          return of(new HttpResponse({
            status: 200,
            body: accInqDepBody
          }));

        } else {
          console.log("FAK ACCTINQ");
          return of(new HttpResponse({
            status: 200,
            body: accInqBody1423L
          }));
        }

      }

      // CUSTINQ
      else if (request.url.indexOf('/custInq') >= 0 && request.method === "GET") {
        console.log("FAK CUSTINQ");
        // connection.mockError({status: 500} as any as Error);
        return of(new HttpResponse({
          status: 200,
          // body: custInqBody
          body: custInqBodyPhLst
        }));
      }


      // CONSENTS
      else if (request.url.indexOf('/customer/consent') >= 0 && request.method === "GET") {
        console.log("FAK CONSENT");
        // connection.mockError({status: 500} as any as Error);
        return of(new HttpResponse({
          status: 200,
          body: customerConsentsBody
        }));
      }


      //ADD CUSTOMER CONSENT
      else if (request.url.indexOf('/customer/consent') >= 0 && request.method === "POST") {
        console.log("FAK customer consent added");
        return of(new HttpResponse({
          status: 200
        }));
      }


      //ADD NEW ORDER TYPE
      else if (request.url.indexOf('/campaignlists/orderby') >= 0 && request.method === "POST") {
        console.log("FAK order type added");
        // connection.mockError({status: 401} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }


      // CUSTMSG
      else if (request.url.indexOf('/custmsg') >= 0 && request.method === "GET") {
        console.log("FAK CUSTMSG");
        // connection.mockError({status: 500} as any as Error);
        return of(new HttpResponse({
          status: 200,
          body: custSrchBodyResult
        }));
      }

      // CALLRECORDS
      else if (request.url.indexOf('/callrecords') >= 0 && request.method === "GET") {
        console.log("FAK callrecords");
        // connection.mockError({status: 500} as any as Error);
        return of(new HttpResponse({
          status: 200,
          body: callRecordsBody
        }));
      }

      // CALLNOTES (MEMO NOTES)
      else if (request.url.indexOf('/callnotes') >= 0 && request.method === "GET") {
        console.log("FAK callnotes");
        // connection.mockError({status: 400} as any as Error);
        // connection.mockError({status: 500} as any as Error);
        return of(new HttpResponse({
          status: 200,
          body: memoNotesBody
        }));
      }

      // GETCOLLECTORPRODUCTIVITY
      else if (request.url.indexOf('/collectors_productivity') >= 0 && request.method === "GET") {
        console.log("FAK stats");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200,
          body: collectorsProductivityBody
        }));
      }

      // GETCOLLECTORPRODUCTIVITY
      else if (request.url.indexOf('/overall_productivity') >= 0 && request.method === "GET") {
        console.log("FAK stats");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200,
          body: overallProductivityBody
        }));
      }

      // ROLES
      else if (request.url.indexOf('/roles') >= 0 && request.method === "GET") {
        console.log("FAK Roles");
        return of(new HttpResponse({
          status: 200,
          body: getRolesBody
        }));
      }

      // Assign User Roles
      else if (request.url.indexOf('/userroles') >= 0 && request.method === "POST") {
        console.log("FAK assign user rle");
        return of(new HttpResponse({
          status: 200
        }));
      }

      // CAMPAIGNS
      else if (request.url.indexOf('/campaigns') >= 0 && request.method === "GET") {
        console.log("FAK Campaigns");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200,
          body: campaignsBody
        }));
      }

      // CAMPAIGNS LIST
      else if (request.url.indexOf('/campaignlists') >= 0 && request.method === "GET") {
        console.log("FAK Campaign list");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200,
          body: campaignListsBody
        }));
      }

      // CAMPAIGNS LIST STATISTICS
      else if (request.url.indexOf('/statistics/cl') >= 0 && request.method === "GET") {
        console.log("FAK Campaign list stats");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200,
          body: campaignListStatsBody
        }));
      }

      //CAMPAIGN LIST ACCOUNT
      else if (request.url.indexOf('/claccounts') >= 0 && request.method === "GET") {
        console.log("FAK Campaign List Account");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: claccountsBody
        }));
      }

      //CALLS PERS HOUR
      else if (request.url.indexOf('reports/calls_per_collector_by_hour') >= 0 && request.method === "GET") {
        console.log("FAK Calls Pers Hour");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: callsPerHourBody
        }));
      }

      //INCOMING CALLS
      else if (request.url.indexOf('reports/calls_incoming_by_hour') >= 0 && request.method === "GET") {
        console.log("FAK Incoming calls Report");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: incomingCallsReportBody
        }));
      }
      //CONTACT PERCENTAGE
      else if (request.url.indexOf('reports/contact_pct_by_hour') >= 0 && request.method === "GET") {
        console.log("FAK Contact percentage Report");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: contactPercentageReport
        }));
      }


      //CAMPAIGN RECORD HISTORY
      else if (request.url.indexOf('account/history') >= 0 && request.method === "GET") {
        console.log("FAK Campaign record history");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: getAccHistBody
        }));
      }


      //CANCEL CAMPAIGN RECORD REASON
      else if (request.url.indexOf('dictionary/cancel_types') >= 0 && request.method === "GET") {
        console.log("FAK cancel campaign record reason");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: getCancelTypesBody
        }));
      }



      //LOV TYPES
      else if (request.url.indexOf('/lov/types') >= 0 && request.method === "GET") {
        console.log("FAK lov types");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: getLovTypes
        }));
      }


      //LOV VALUES
      else if (request.url.indexOf('/lov/values') >= 0 && request.method === "GET") {
        console.log("FAK lov values");

        if (request.urlWithParams.indexOf('LovCd=CLOSE_CASE6') >= 0) {
          return of(new HttpResponse({
            status: 200,
            body: lovValuesBody1
          }));

        }

        if (request.urlWithParams.indexOf('LovCd=CLOSE_CASE3') >= 0) {
          return of(new HttpResponse({
            status: 200,
            body: lovValuesBody2
          }));

        }


        if (request.urlWithParams.indexOf('LovCd=CLOSE_CASE4') >= 0) {
          return of(new HttpResponse({
            status: 200,
            body: lovValuesBody3
          }));
        }

        else {
          // return throwError({ error: { message: 'Unauthorised' } });
          return of(new HttpResponse({
            status: 200,
            body: lovValuesBody
          }));
        }

      }


      //TICKLER PROCESSES
      else if (request.url.indexOf('/tp/processes') >= 0 && request.method === "GET") {
        console.log("FAK tickler processes");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: getProcessesBody
        }));
      }


      //TICKLER TYPES
      else if (request.url.indexOf('/tp/tickler_types') >= 0 && request.method === "GET") {
        console.log("FAK tickler types");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: getTicklerTypes
        }));
      }



      //PROCESS CASE
      else if (request.url.indexOf('/tp/cases') >= 0 && request.method === "GET") {
        console.log("FAK tickler process case");
        if (request.urlWithParams.indexOf('Id') >= 0) {
          return of(new HttpResponse({
            status: 200,
            body: getCaseBody
          }));
        } else {
          // connection.mockError({status:400} as any Error);
          return of(new HttpResponse({
            status: 200,
            body: getCasesBody
          }));
        }
      }
/*
      else if(connection.request.url.indexOf('/tp/cases')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK tickler process case");
        if(connection.request.url.indexOf('Id') >=0 && connection.request.url.includes('PageNr')){
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: getCaseBody
          })))
        }

        if(connection.request.url.indexOf('AccountId') >=0){
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: getCaseBody
          })))
        }

        if(connection.request.url.indexOf('Id=16') >=0){
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: getCaseBody.filter(res => res.Id === 16)
          })))
        }

        if(connection.request.url.indexOf('Id=17') >=0){
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: getCaseBody.filter(res => res.Id === 17)
          })))
        }

        if(connection.request.url.indexOf('Id=18') >=0){
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: getCaseBody.filter(res => res.Id === 18)
          })))
        }
        else{
          // connection.mockError({status:400} as any Error);
          connection.mockRespond(new Response(new ResponseOptions({
            status:200,
            body: getCasesBody
          })))
        }
      }
*/
      //ADD LOV TYPE
      else if (request.url.indexOf('/lov/types') >= 0 && request.method === "POST") {
        console.log("FAK lov type added");
        return of(new HttpResponse({
          status: 200
        }));
      }

      //ADD LOV VALUE
      else if (request.url.indexOf('/lov/values') >= 0 && request.method === "POST") {
        console.log("FAK lov value added");
        return of(new HttpResponse({
          status: 200
        }));
      }

      //CREATE PROCESS CASE
      else if (request.url.indexOf('/tp/cases') >= 0 && request.method === "POST") {
        console.log("FAK tickler process created");
        // return throwError({ error: { message: 'Unauthorised' } });
        return of(new HttpResponse({
          status: 200
        }));
      }



      //PROCESS CASE TICKLER
      else if (request.url.indexOf('/tp/case_ticklers') >= 0 && request.method === "GET") {
        console.log("FAK tickler process case");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: getCaseTicklersBody
        }));
      }

      //DELETE CASE TICKLER
      else if (request.url.indexOf('/tp/case_ticklers') >= 0 && request.method === "GET") {
        console.log("FAK case tickler removed");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }

      //ADD TICKLER PROCESS CASE
      else if (request.url.indexOf('/tp/case_ticklers') >= 0 && request.method === "POST") {
        console.log("FAK tickler process added");
        return of(new HttpResponse({
          status: 200
        }));
      }


      //NEW TICKLER TYPE
      else if (request.url.indexOf('/tp/tickler_types') >= 0 && request.method === "POST") {
        console.log("FAK new tickler type");
        return of(new HttpResponse({
          status: 200
        }));
      }


      //REMOVE TICKLER TYPE
      else if (request.url.indexOf('/tp/tickler_types') >= 0 && request.method === "DELETE") {
        console.log("FAK tickler type removed");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }

      //DELETE LOV TYPE
      else if (request.url.indexOf('/lov/types') >= 0 && request.method === "DELETE") {
        console.log("FAK lov type removed");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }


      //DELETE LOV VALUE
      else if (request.url.indexOf('/lov/values') >= 0 && request.method === "DELETE") {
        console.log("FAK lov value removed");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }


      //UPDATE LOV TYPE
      else if (request.url.indexOf('/lov/types') >= 0 && request.method === "PUT") {
        console.log("FAK tickler type updated");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }

      //UPDATE LOV VALUE
      else if (request.url.indexOf('/lov/values') >= 0 && request.method === "PUT") {
        console.log("FAK tickler type updated");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }


      //UPDATE TICKLER TYPE
      else if (request.url.indexOf('/tp/tickler_types') >= 0 && request.method === "PUT") {
        console.log("FAK tickler type updated");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }


      //TICKLER TYPE MAP
      else if (request.url.indexOf('/tp/ticklers_map') >= 0 && request.method === "GET") {
        console.log("FAK tickler type map");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: ticklerTypeMapBody
        }));
      }

      //ATTRIBUTE TICKLER TYPE
      else if (request.url.indexOf('/tp/tickler_attribute_types') >= 0 && request.method === "GET") {
        console.log("FAK attribute tickler types");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: ticklerAttributeBody
        }));
      }

      //LOV
      else if (request.url.indexOf('/dictionary/lov') >= 0 && request.method === "GET") {
        console.log("FAK List of values");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: getLovBody
        }));
      }


      //NEW TICKLER ATTRIBUTE
      else if (request.url.indexOf('/tp/tickler_attribute_types') >= 0 && request.method === "POST") {
        console.log("FAK new tickler attribute");
        return of(new HttpResponse({
          status: 200
        }));
      }

      //UPDATE TICKLER TYPE
      else if (request.url.indexOf('/tp/tickler_attribute_types') >= 0 && request.method === "PUT") {
        console.log("FAK tickler attribute updated");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }

      //TICKLER ATTRIBUTE MAP
      else if (request.url.indexOf('/tp/ticklers_atb_map') >= 0 && request.method === "GET") {
        console.log("FAK attribute tickler map");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: ticklerAttributeMapBody
        }));
      }

      //ADD CALLNOTES
      else if (request.url.indexOf('/callnotes') >= 0 && request.method === "POST") {
        console.log("FAK new call notes added");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }

      //ADD TICKLER ATTRIBUTE MAP
      else if (request.url.indexOf('/tp/ticklers_atb_map') >= 0 && request.method === "POST") {
        console.log("FAK new tickler attribute map");
        return of(new HttpResponse({
          status: 200
        }));
      }

      //REMOVE TICKLER ATTRIBUTE MAP
      else if (request.url.indexOf('/tp/ticklers_atb_map') >= 0 && request.method === "DELETE") {
        console.log("FAK tickler attribute map removed");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }

      //ADD TICKLER TYPE MAP
      else if (request.url.indexOf('/tp/ticklers_map') >= 0 && request.method === "POST") {
        console.log("FAK new tickler attribute map");
        return of(new HttpResponse({
          status: 200
        }));
      }

      //REMOVE TICKLER TYPE MAP
      else if (request.url.indexOf('/tp/ticklers_map') >= 0 && request.method === "DELETE") {
        console.log("FAK tickler type map removed");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }


      //UPDATE TICKLER ATTRIBUTE MAP
      else if (request.url.indexOf('/tp/ticklers_atb_map') >= 0 && request.method === "PUT") {
        console.log("FAK tickler attribute map updated");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }


      //UPDATE ADDRESS VERIFICATION
      else if (request.url.indexOf('/customer/address') >= 0 && request.method === "POST") {
        console.log("FAK customer address modified/verified");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }

      //UPDATE EMAIL VERIFICATION
      else if (request.url.indexOf('/customer/email') >= 0 && request.method === "POST") {
        console.log("FAK customer email modified/verified");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }

      //UPDATE PHONE VERIFICATION
      else if (request.url.indexOf('/customer/phone') >= 0 && request.method === "POST") {
        console.log("FAK customer phone modified/verified");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }

      //GET CAMPAIGN LIST ORDER BY

      else if (request.url.indexOf('/dictionary/cl_orderby_types') >= 0 && request.method === "GET") {
        console.log("FAK campaign list order by");
        // connection.mockError({status:400} as any Error);
        return of(new HttpResponse({
          status: 200,
          body: clOrderbyBody
        }));
      }

      //UPDATE STATUS CODE
      else if (request.url.indexOf('/campaignlists') >= 0 && request.method === "PUT") {
        console.log("FAK campaign lists status updated");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
        }));
      }


      // CAMPAIGNS LIST LAUNCHs
      else if (request.url.indexOf('/campaignlists/launch') >= 0 && request.method === "POST") {
        console.log("FAK Campaign list Create");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200
          // body: 81
        }));
      }

      // CAMPAIGNS LIST CREATE
      else if (request.url.indexOf('/campaignlists') >= 0 && request.method === "POST") {
        console.log("FAK Campaign list Create");
        // let body = '{"Message": "List can not be created"}';
        // let opts = {type: ResponseType.Error, status:404, body: body};
        // let responseOpts = new ResponseOptions(opts);
        // connection.mockError(new Response(responseOpts) as Response & Error);
        return of(new HttpResponse({
          status: 200,
          body: 81
        }));
      }

      // CAMPAIGNS
      else if (request.url.indexOf('/clrecords') >= 0 && request.method === "GET") {
        console.log("FAK Campaign list record");
        // connection.mockError({status: 400} as any as Error);
        return of(new HttpResponse({
          status: 200,
          body: campaignListRecordsBody
        }));
      }

      // STATS
      else if (request.url.indexOf('/stat') >= 0 && request.method === "GET") {
        console.log("FAK stats");
        return of(new HttpResponse({
          status: 200,
          body: statBody
        }));
      }

      // CALLRECORD
      else if (request.url.indexOf('/callrecords') >= 0 && request.method === "POST") {
        console.log("FAK CALLRECORDS");
        return of(new HttpResponse({
          status: 200,
          body: {result: true}
        }));
      }

      // CANCELRECORD
      else if (request.url.indexOf('/clrecords') >= 0 && request.method === "PUT") {
        console.log("FAK CALLRECORDS");
        // connection.mockError({status: 500} as any as Error);
        return of(new HttpResponse({
          status: 200,
        }));
      }

      // CISCO MAKE CALL
      else if (request.url.indexOf('/Dialogs') >= 0 && request.method === "POST") {
        console.log("CISCO MAKE CALL");
        this.calling = true;
        return of(new HttpResponse({
          status: 200
        }));
      }

      // CISCO GET DIALOGS
      else if (request.url.indexOf('/Dialogs') >= 0 && request.method === "GET") {
        // console.log("CISCO GET DIALOGS");
        return of(new HttpResponse({
          status: 200,
          body: this.calling ? ciscoGetDialogInboundAlerting : ciscoGetDialogEmpty
          // body: this.calling ? ciscoGetDialogInboundSpeaking : ciscoGetDialogEmpty
          // body: this.calling ? ciscoGetDialogInboundWrapUp : ciscoGetDialogEmpty

          // body: this.calling ? ciscoGetDialogOutboundCalling : ciscoGetDialogEmpty
          // body: this.calling ? ciscoGetDialogOutboundSpeaking : ciscoGetDialogEmpty
          // body: this.calling ? ciscoGetDialogOutboundWrapUp : ciscoGetDialogEmpty

          // body: this.calling ? ciscoGetDialogTelephonePickedup : ciscoGetDialogEmpty
        }));
      }

      // CISCO END CALL
      else if (request.url.indexOf('/Dialog/') >= 0 && request.method === "PUT") {
        console.log("CISCO END CALL");
        this.calling = false;
        return of(new HttpResponse({
          status: 200
        }));
      }

      // CISCO GET USER
      else if (request.url.indexOf('/User') >= 0 && request.method === "GET") {
        // console.log("CISCO GET USER");
        // connection.mockError({status: 401} as any as Error);
        return of(new HttpResponse({
          status: 200,
          body: this.calling ? ciscoGetUserBodyResultTalking : ciscoGetUserBodyResultNotReady
        }));
      }

      // CISCO SET STATE
      else if (request.url.indexOf('/User') >= 0 && request.method === "PUT") {
        console.log("CISCO SET STATE");
        return of(new HttpResponse({
          status: 200
        }));
      }

      // Not found
      else {
        console.log("FAK NOT FOUND");
        // pass through any requests not handled above
        return next.handle(request);
        // return of(new HttpResponse({
        //   status: 404
        // }));
      }

    }))
    // call materialize and dematerialize to ensure delay even if an error is thrown
      .pipe(materialize())
      .pipe(delay(200))
      .pipe(dematerialize());

  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendFactory,
  multi: true
};
