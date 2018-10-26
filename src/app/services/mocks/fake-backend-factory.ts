import {MockBackend, MockConnection} from "@angular/http/testing";
import {BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions} from "@angular/http";
import {tokenBody} from "../../../api/token";
import {custSrchBodyL11} from "../../../api/accSrch-custL11";
import {accInqBody1423L} from "../../../api/accInq-cust1423L";
import {custInqBody} from "../../../api/custInq";
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

let calling = false;

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions/*, realBackend: XHRBackend*/) {
  // Put sneak mock
  sneakMock.mocked = true;

  backend.connections.subscribe((connection: MockConnection) => {
    setTimeout(() => {
      console.log("=========== FAK url: " + connection.request.url + " === Mehtod: " + connection.request.method);
      // TOKEN
      if (connection.request.url.indexOf('/token') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK token");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: tokenBody
        })));
      }

      // Campaigns get
      else if (connection.request.url.indexOf('/usercampaigns') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK usercampaigns");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: getCampaignsBody
        })));
      }

      // Assign user campaigns
      else if (connection.request.url.indexOf('/usercampaigns') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK assign usercampaigns");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      // Users
      else if (connection.request.url.indexOf('/users') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK usercampaigns");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: connection.request.url.indexOf('userCd') >= 0 ? getUserByCodeBody : getUsersBody
        })));
      }

      // NEXTACCOUNT
      else if (connection.request.url.indexOf('/accounts/next') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK account/next");
        // connection.mockError({status: 401} as any as Error);
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: getNextAccountBody
        })));
      }

      // CUSTSRCH
      else if (connection.request.url.indexOf('/custsrch') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK custsrch");
        if (connection.request.url.indexOf('taxId') >= 0) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: custSrchBody1Result
          })));
        } else {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: custSrchBody2Results
          })));
        }
      }

      // ACCTSRCH
      else if (connection.request.url.indexOf('/acctSrch') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK acctsrch");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: custSrchBodyL11
        })));
      }

      // today contact
      else if (connection.request.url.indexOf('/statistics/customer_calls_count') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK today contact");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: "2"
        })));
      }

      // account calls
      else if (connection.request.url.indexOf('/statistics/account_calls_count') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK today contact");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: "2"
        })));
      }

      // ACCTHISTORY
      else if (connection.request.url.indexOf('/acctHistSrch') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK acctHistSrch");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          // body: accHistBodyEmpty
          body: accHistBody
        })));
      }

      // ACCTINQ
      else if (connection.request.url.indexOf('/acctInq') >= 0 && connection.request.method === RequestMethod.Get) {
        if(connection.request.url.includes('accountType=L')){
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: accInqBody1423L
          })));
          console.log("FAK ACCINQ L");
        }

        if(connection.request.url.includes('accountType=D')){
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: accInqDepBody
          })));
          console.log("FAK ACCINQ D");
        }else{
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: accInqBody1423L
          })));
          console.log("FAK ACCINQ");
        }

      }

      // CUSTINQ
      else if (connection.request.url.indexOf('/custInq') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK CUSTINQ");
        // connection.mockError({status: 500} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: custInqBody
        })));
      }


      // CONSENTS
      else if (connection.request.url.indexOf('/customer/consent') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK CONSENT");
        // connection.mockError({status: 500} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: customerConsentsBody
        })));
      }


      //ADD CUSTOMER CONSENT
      else if (connection.request.url.indexOf('/customer/consent') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK customer consent added");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }


      //ADD NEW ORDER TYPE
      else if (connection.request.url.indexOf('/campaignlists/orderby') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK order type added");
        // connection.mockError({status: 401} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }


      // CUSTMSG
      else if (connection.request.url.indexOf('/custmsg') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK CUSTMSG");
        // connection.mockError({status: 500} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: custSrchBodyResult
        })));
      }

      // CALLRECORDS
      else if (connection.request.url.indexOf('/callrecords') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK callrecords");
        // connection.mockError({status: 500} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: callRecordsBody
        })));
      }

      // CALLNOTES (MEMO NOTES)
      else if (connection.request.url.indexOf('/callnotes') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK callnotes");
        // connection.mockError({status: 400} as any as Error);
        // connection.mockError({status: 500} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: memoNotesBody
        })));
      }

      // GETCOLLECTORPRODUCTIVITY
      else if (connection.request.url.indexOf('/collectors_productivity') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK stats");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: collectorsProductivityBody
        })));
      }

      // GETCOLLECTORPRODUCTIVITY
      else if (connection.request.url.indexOf('/overall_productivity') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK stats");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: overallProductivityBody
        })));
      }

      // ROLES
      else if (connection.request.url.indexOf('/roles') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK Roles");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: getRolesBody
        })));
      }

      // Assign User Roles
      else if (connection.request.url.indexOf('/userroles') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK assign user rle");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      // CAMPAIGNS
      else if (connection.request.url.indexOf('/campaigns') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK Campaigns");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: campaignsBody
        })));
      }

      // CAMPAIGNS LIST
      else if (connection.request.url.indexOf('/campaignlists') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK Campaign list");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: campaignListsBody
        })));
      }

      // CAMPAIGNS LIST STATISTICS
      else if (connection.request.url.indexOf('/statistics/cl') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK Campaign list stats");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: campaignListStatsBody
        })));
      }

      //CAMPAIGN LIST ACCOUNT
      else if(connection.request.url.indexOf('/claccounts')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK Campaign List Account");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: claccountsBody
        })));
      }

      //CALLS PERS HOUR
      else if(connection.request.url.indexOf('reports/calls_per_collector_by_hour')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK Calls Pers Hour");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: callsPerHourBody
        })))
      }

      //INCOMING CALLS
      else if(connection.request.url.indexOf('reports/calls_incoming_by_hour')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK Incoming calls Report");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: incomingCallsReportBody
        })))
      }
    //CONTACT PERCENTAGE
      else if(connection.request.url.indexOf('reports/contact_pct_by_hour')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK Contact percentage Report");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: contactPercentageReport
        })))
      }


      //CAMPAIGN RECORD HISTORY
      else if(connection.request.url.indexOf('account/history')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK Campaign record history");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: getAccHistBody
        })))
      }




      //CANCEL CAMPAIGN RECORD REASON
      else if(connection.request.url.indexOf('dictionary/cancel_types')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK cancel campaign record reason");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: getCancelTypesBody
        })))
      }



      //LOV TYPES
      else if(connection.request.url.indexOf('/lov/types')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK lov types");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: getLovTypes
        })))
      }


      //LOV VALUES
      else if(connection.request.url.indexOf('/lov/values')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK lov values");

        if(connection.request.url.indexOf('LovCd=CLOSE_CASE6')>=0){
          connection.mockRespond(new Response(new ResponseOptions({
            status:200,
            body: lovValuesBody1
          })));

        }

        if(connection.request.url.indexOf('LovCd=CLOSE_CASE3')>=0) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: lovValuesBody2
          })))

        }


        if(connection.request.url.indexOf('LovCd=CLOSE_CASE4')>=0) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: lovValuesBody3
          })))

        }

        else{
          // connection.mockError({status:400} as any Error);
          connection.mockRespond(new Response(new ResponseOptions({
            status:200,
            body: lovValuesBody
          })))
        }

      }


      //TICKLER PROCESSES
      else if(connection.request.url.indexOf('/tp/processes')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK tickler processes");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: getProcessesBody
        })))
      }


      //TICKLER TYPES
      else if(connection.request.url.indexOf('/tp/tickler_types')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK tickler types");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: getTicklerTypes
        })))
      }



      //PROCESS CASE
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

      //ADD LOV TYPE
      else if (connection.request.url.indexOf('/lov/types') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK lov type added");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      //ADD LOV VALUE
      else if (connection.request.url.indexOf('/lov/values') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK lov value added");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      //CREATE PROCESS CASE
      else if (connection.request.url.indexOf('/tp/cases') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK tickler process created");
        // connection.mockError({status:400, body: '{"message": "Error from server"}'} as any);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }



      //PROCESS CASE TICKLER
      else if(connection.request.url.indexOf('/tp/case_ticklers')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK tickler process case");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: getCaseTicklersBody
        })))
      }

      //DELETE CASE TICKLER
      else if (connection.request.url.indexOf('/tp/case_ticklers') >= 0 && connection.request.method === RequestMethod.Delete) {
        console.log("FAK case tickler removed");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      //ADD TICKLER PROCESS CASE
      else if (connection.request.url.indexOf('/tp/case_ticklers') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK tickler process added");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }


      //NEW TICKLER TYPE
      else if (connection.request.url.indexOf('/tp/tickler_types') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK new tickler type");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }


      //REMOVE TICKLER TYPE
      else if (connection.request.url.indexOf('/tp/tickler_types') >= 0 && connection.request.method === RequestMethod.Delete) {
        console.log("FAK tickler type removed");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      //DELETE LOV TYPE
      else if (connection.request.url.indexOf('/lov/types') >= 0 && connection.request.method === RequestMethod.Delete) {
        console.log("FAK lov type removed");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }


      //DELETE LOV VALUE
      else if (connection.request.url.indexOf('/lov/values') >= 0 && connection.request.method === RequestMethod.Delete) {
        console.log("FAK lov value removed");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }


      //UPDATE LOV TYPE
      else if (connection.request.url.indexOf('/lov/types') >= 0 && connection.request.method === RequestMethod.Put) {
        console.log("FAK tickler type updated");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      //UPDATE LOV VALUE
      else if (connection.request.url.indexOf('/lov/values') >= 0 && connection.request.method === RequestMethod.Put) {
        console.log("FAK tickler type updated");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }


      //UPDATE TICKLER TYPE
      else if (connection.request.url.indexOf('/tp/tickler_types') >= 0 && connection.request.method === RequestMethod.Put) {
        console.log("FAK tickler type updated");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }


      //TICKLER TYPE MAP
      else if(connection.request.url.indexOf('/tp/ticklers_map')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK tickler type map");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: ticklerTypeMapBody
        })))
      }

      //ATTRIBUTE TICKLER TYPE
      else if(connection.request.url.indexOf('/tp/tickler_attribute_types')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK attribute tickler types");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: ticklerAttributeBody
        })))
      }

      //LOV
      else if(connection.request.url.indexOf('/dictionary/lov')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK List of values");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: getLovBody
        })))
      }


      //NEW TICKLER ATTRIBUTE
      else if (connection.request.url.indexOf('/tp/tickler_attribute_types') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK new tickler attribute");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      //UPDATE TICKLER TYPE
      else if (connection.request.url.indexOf('/tp/tickler_attribute_types') >= 0 && connection.request.method === RequestMethod.Put) {
        console.log("FAK tickler attribute updated");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      //TICKLER ATTRIBUTE MAP
      else if(connection.request.url.indexOf('/tp/ticklers_atb_map')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK attribute tickler map");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: ticklerAttributeMapBody
        })))
      }


      //ADD CALLNOTES
      else if (connection.request.url.indexOf('/callnotes') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK new call notes added");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      //ADD TICKLER ATTRIBUTE MAP
      else if (connection.request.url.indexOf('/tp/ticklers_atb_map') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK new tickler attribute map");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      //REMOVE TICKLER ATTRIBUTE MAP
      else if (connection.request.url.indexOf('/tp/ticklers_atb_map') >= 0 && connection.request.method === RequestMethod.Delete) {
        console.log("FAK tickler attribute map removed");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      //ADD TICKLER TYPE MAP
      else if (connection.request.url.indexOf('/tp/ticklers_map') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK new tickler attribute map");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      //REMOVE TICKLER TYPE MAP
      else if (connection.request.url.indexOf('/tp/ticklers_map') >= 0 && connection.request.method === RequestMethod.Delete) {
        console.log("FAK tickler type map removed");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }


      //UPDATE TICKLER ATTRIBUTE MAP
      else if (connection.request.url.indexOf('/tp/ticklers_atb_map') >= 0 && connection.request.method === RequestMethod.Put) {
        console.log("FAK tickler attribute map updated");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }


      //GET CAMPAIGN LIST ORDER BY

      else if(connection.request.url.indexOf('/dictionary/cl_orderby_types')>=0 && connection.request.method === RequestMethod.Get){
        console.log("FAK campaign list order by");
        // connection.mockError({status:400} as any Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: clOrderbyBody
        })))
      }

      //UPDATE STATUS CODE
      else if (connection.request.url.indexOf('/campaignlists') >= 0 && connection.request.method === RequestMethod.Put) {
        console.log("FAK campaign lists status updated");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }


      // CAMPAIGNS LIST LAUNCHs
      else if (connection.request.url.indexOf('/campaignlists/launch') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK Campaign list Create");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
          // body: 81
        })));
      }

      // CAMPAIGNS LIST CREATE
      else if (connection.request.url.indexOf('/campaignlists') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK Campaign list Create");
        // let body = '{"Message": "List can not be created"}';
        // let opts = {type: ResponseType.Error, status:404, body: body};
        // let responseOpts = new ResponseOptions(opts);
        // connection.mockError(new Response(responseOpts) as Response & Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: 81
        })));
      }

      // CAMPAIGNS
      else if (connection.request.url.indexOf('/clrecords') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK Campaign list record");
        // connection.mockError({status: 400} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: campaignListRecordsBody
        })));
      }

      // STATS
      else if (connection.request.url.indexOf('/stat') >= 0 && connection.request.method === RequestMethod.Get) {
        console.log("FAK stats");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: statBody
        })));
      }

      // CALLRECORD
      else if (connection.request.url.indexOf('/callrecords') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("FAK CALLRECORDS");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: {result: true}
        })));
      }

      // CANCELRECORD
      else if (connection.request.url.indexOf('/clrecords') >= 0 && connection.request.method === RequestMethod.Put) {
        console.log("FAK CALLRECORDS");
        // connection.mockError({status: 500} as any as Error);
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
        })));
      }

      // CISCO MAKE CALL
      else if (connection.request.url.indexOf('/Dialogs') >= 0 && connection.request.method === RequestMethod.Post) {
        console.log("CISCO MAKE CALL");
        calling = true;
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      // CISCO GET DIALOGS
      else if (connection.request.url.indexOf('/Dialogs') >= 0 && connection.request.method === RequestMethod.Get) {
        // console.log("CISCO GET DIALOGS");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: calling ? ciscoGetDialogInboundAlerting : ciscoGetDialogEmpty
          // body: calling ? ciscoGetDialogInboundSpeaking : ciscoGetDialogEmpty
          // body: calling ? ciscoGetDialogInboundWrapUp : ciscoGetDialogEmpty

          // body: calling ? ciscoGetDialogOutboundCalling : ciscoGetDialogEmpty
          // body: calling ? ciscoGetDialogOutboundSpeaking : ciscoGetDialogEmpty
          // body: calling ? ciscoGetDialogOutboundWrapUp : ciscoGetDialogEmpty

          // body: calling ? ciscoGetDialogTelephonePickedup : ciscoGetDialogEmpty
        })));
      }

      // CISCO END CALL
      else if (connection.request.url.indexOf('/Dialog/') >= 0 && connection.request.method === RequestMethod.Put) {
        console.log("CISCO END CALL");
        calling = false;
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      // CISCO GET USER
      else if (connection.request.url.indexOf('/User') >= 0 && connection.request.method === RequestMethod.Get) {
        // console.log("CISCO GET USER");
        // connection.mockError({status: 401} as any as Error);
       connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: calling ? ciscoGetUserBodyResultTalking : ciscoGetUserBodyResultNotReady
        })));
      }

      // CISCO SET STATE
      else if (connection.request.url.indexOf('/User') >= 0 && connection.request.method === RequestMethod.Put) {
        console.log("CISCO SET STATE");
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      }

      // Not found
      else {
        console.log("FAK NOT FOUND");
        connection.mockRespond(new Response(new ResponseOptions({ status: 404 })));
      }

    }, 200);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions/*, XHRBackend*/]
};
