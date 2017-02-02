import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AppService {

  private CHECK_INS = "/check_ins/v2/events/EVENT_ID/check_ins?include=checked_in_by";

  constructor(private http: Http) {
  }

  getCheckIns(): Observable<Response> {
    return this.http.get(this.CHECK_INS);
  }
}
