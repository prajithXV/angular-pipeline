import {UFNotification} from "../app/services/user-feedback.service";
import {UFSeverity} from "../app/services/ufseverity";

export const userFeedbackMock = {
  handleNotificationn: new UFNotification(1,"success",null,null),
  handleSuccces: new UFNotification(1,"success",null,null),
  handleErrorr: new UFNotification(1,"error",null,null),

  handleNotification: function () {
      return this.handleNotificationn
  },


  handleError: function () {
    return this.handleErrorr;
  },

  handleSuccess: function () {
    return this.handleSuccces;
  }

};
