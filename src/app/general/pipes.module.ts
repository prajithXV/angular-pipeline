import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddressPipe} from "../pipes/address.pipe";
import {AgentStatePipe} from "../pipes/agent-state.pipe";
import {WaitingBackendComponent} from "../views/waiting-backend/waiting-backend.component";
import {DateValueAccessor} from "./date-value-accessor";
import {CoinCurrencyPipe} from "../pipes/coin-currency.pipe";
import {CoinDatePipe} from "../pipes/coin-date.pipe";
import {CoinFixedNumber, CoinPercentagePipe} from "../pipes/coin-percentage-pipe.pipe";
import {CoinDateTransformPipe} from "../pipes/coin-date-transform.pipe";
import {TelephonePipe, TelephoneTypePipe} from "../pipes/telephone.pipe";
import {BooleanToStringPipe} from "../pipes/boolean-to-string.pipe";
import {AttributeTypeToStringPipe} from "../pipes/attribute-type-to-string.pipe";
import {BooleanToMandatoryStringPipe} from "../pipes/boolean-to-mandatory-string.pipe";
import {ConsentPipe, ConsentPipeCorrectConversion} from "../pipes/consent.pipe";
import {OrderByPipe} from "../pipes/order-by.pipe";
import {BooleanToStringOrderPipe} from "../pipes/boolean-to-string-order.pipe";
import {LovTypeToStringPipe} from "../pipes/lov-type-to-string.pipe";
import {FilterCodeToNamePipe} from "../pipes/filter-code-to-name.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AddressPipe,
    AgentStatePipe,
    WaitingBackendComponent,
    DateValueAccessor,
    CoinCurrencyPipe,
    CoinDatePipe,
    TelephonePipe,
    TelephoneTypePipe,
    CoinDateTransformPipe,
    AttributeTypeToStringPipe,
    BooleanToStringPipe,
    CoinPercentagePipe,
    CoinFixedNumber,
    BooleanToMandatoryStringPipe,
    ConsentPipe,
    OrderByPipe,
    BooleanToStringOrderPipe,
    LovTypeToStringPipe,
    FilterCodeToNamePipe
  ],
  exports: [
    AddressPipe,
    AgentStatePipe,
    WaitingBackendComponent,
    DateValueAccessor,
    CoinCurrencyPipe,
    CoinDatePipe,
    CoinDateTransformPipe,
    AttributeTypeToStringPipe,
    BooleanToStringPipe,
    BooleanToMandatoryStringPipe,
    TelephonePipe,
    TelephoneTypePipe,
    CoinPercentagePipe,
    CoinFixedNumber,
    ConsentPipe,
    OrderByPipe,
    BooleanToStringOrderPipe,
    LovTypeToStringPipe,
    FilterCodeToNamePipe
  ]
})
export class PipesModule { }
