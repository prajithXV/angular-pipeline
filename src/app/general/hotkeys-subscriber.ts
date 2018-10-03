import {GlobalStateService} from "../services/global-state.service";
import {QueryList} from "@angular/core";
import {PopoverDirective} from "ngx-bootstrap";
import {Subscription} from "rxjs/Subscription";

export class HotkeysSubscriber {
  private _hotkeysSubscription: Subscription = null;
  private _getPops: () => QueryList<PopoverDirective> = null;

  startSubscription(gss: GlobalStateService, getPopovers: () => QueryList<PopoverDirective>) {
    this._getPops = getPopovers;
    this._hotkeysSubscription = gss.hotkeyObservable.subscribe(show => this.showHotKeys(show));
  }

  endSubscritption() {
    if (this._hotkeysSubscription != null) {
      this._hotkeysSubscription.unsubscribe();
      this._hotkeysSubscription = null;
    }
  }

  private showHotKeys(show) {
    let pops : QueryList<PopoverDirective> = this._getPops();
    if (pops == null) {
      if (show) {
        setTimeout(() => this.showHotKeys(true), 200);
      }
      return;
    }
    if (show) {
      console.log("Show");
      pops.forEach(pop => pop.show());
    } else {
      console.log("Hide");
      pops.forEach(pop => pop.hide());
    }
  }

}
