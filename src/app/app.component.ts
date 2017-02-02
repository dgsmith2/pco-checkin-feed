import {Component, OnInit} from "@angular/core";
import {AppService} from "./app.service";
import "rxjs/add/operator/map";
import * as _ from "lodash";
import {Observable} from "rxjs/Observable";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  public groups: Array<any>;
  private adultIds: Array<number>;

  constructor(private service: AppService) {
  }

  ngOnInit(): void {
    this.adultIds = [];
    this.groups = [];

    Observable.timer(0, 3000)
      .switchMap(() => this.service.getCheckIns())
      .map(response => response.json())
      .subscribe(result => {
          const adultsMap = _.keyBy(result.included, "id");

          _(result.data)
            .groupBy(child => child.relationships.checked_in_by.data.id)
            .mapValues(children => {
              return _(children).map(child => child.attributes).uniqBy(child => child.first_name + child.last_name).value();
            })
            .map((children, adultId) => {
              return {
                adult: _.extend(adultsMap[adultId].attributes, {id: adultId}),
                children: children
              };
            })
            .filter(group => {
              return !_.includes(this.adultIds, group.adult.id);
            })
            .orderBy(group => group.children[0].created_at)
            .forEach(group => {
              this.adultIds.push(group.adult.id);
              this.groups.unshift(group);
            });
        }
      );
  }

  getChildrenNames(children: Array < any >) {
    return _.map(children, child => `${child.first_name} ${child.last_name}`)
      .join(", ");
  }
}
