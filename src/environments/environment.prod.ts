
import {UFSeverity} from "../app/services/ufseverity";
import {CommonConstants} from "./common-constants";

export const environment = {
  production: true,
  serviceUrl: "https://coinprod:65026",
  ciscoDomain: "finesse.ibkc.int",
  minSeverityErrorToConsole: UFSeverity.warn,
  stateSubscriptionTimeout: 2000,
  ciscoOneExtension: false,
  ciscoExtension: "215194",
  ciscoChangeTargetNumber: false,
  ciscoTargetNumber: "4696014194",
  ciscoUser: "coinapp",
  ciscoPassword: "215194",
  ciscoDialPrefix: "91",
  version: CommonConstants.OfficialVersion,
  build: null, // CommonConstants.Build,
  evironmentCode: 'P'

};
