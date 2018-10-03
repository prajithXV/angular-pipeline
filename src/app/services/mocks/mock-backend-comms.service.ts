import { Injectable } from '@angular/core';
import {BackendCommsService} from "../backend-comms.service";
import {Agent} from "../../models/agent";
import {Account} from "../../models/account";
import {Http} from "@angular/http";

@Injectable()
export class MockBackendCommsService { //extends BackendCommsService {

  constructor(_http: Http) {
    //super(_http);
  }

  // login(acc: string, pwd: string): Promise<Agent> {
  //   // Redirect to backend
  //   return new Promise<Agent>((resolve, reject) => {
  //     if (acc == pwd) {
  //       resolve(new Agent(acc));
  //     } else {
  //       reject("Invalid user / Password");
  //     }
  //   });
  // }

  // nextAccount(agentName: string): Promise<Account> {
  //   // First getNextAccount from backend
  //   return new Promise<Account>((resolve, reject) => {
  //     let ret = new Account();
  //     ret.accountId = "5300429511";
  //     ret.accountType = "L";
  //     resolve(ret);
  //   });
  // }
}
