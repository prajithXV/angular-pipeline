import {CancelCampaignCallRecordReason} from "./cancel-campaign-call-record-reason";

export class NewCallRecordModel {
  action: string;
  party: string;
  result: string;
  message: string;
  nextWorkDate: Date;
  promisedDate: Date;
  promisedAmount: number;
  callLaterDate: Date;
  quit: boolean;
  clear: (forceAllowSelectAction?) => void;
}

export class CancelRecordModel {
  reason: CancelCampaignCallRecordReason;
  message: string;
  flag: boolean;
}
