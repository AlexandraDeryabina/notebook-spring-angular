import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class EventsBus {
  public forceDataUpdate: EventEmitter<void>;

  constructor() {
    this.forceDataUpdate = new EventEmitter();
  }
}
