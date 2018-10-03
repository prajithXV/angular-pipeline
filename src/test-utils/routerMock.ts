import {Observable} from "rxjs/Observable";
import {NavigationStart} from "@angular/router";

export const routerMock =  {
  events: new Observable(o=>{
    o.next(new NavigationStart(0, "app/main"));
    o.complete();
  }),
navigate: function(): Promise<boolean>{
    return new Promise<boolean>(s=> s(true));

  },

};
