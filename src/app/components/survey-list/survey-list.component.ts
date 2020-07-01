import {Component, Input, OnInit} from '@angular/core';
import {FirestoreService} from '../../shared/services/firestore.service';
import * as _ from "lodash";
import {GlobalsService} from "../../shared/services/globals.service";

interface ISubscribedDomain {
  name: string;
  startDate: string;
  endDate: string;
  selected:boolean;
  status: string;
}

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {
  userId: string = window.localStorage.getItem('loginId');
  subscribedDomains: ISubscribedDomain[] = [];
  constructor(private fireStore: FirestoreService, public globals: GlobalsService) { }

  ngOnInit() {
    this.fireStore.getUserInfo().then((result: any) => {
      this.fireStore.getUserSubscribedDomains(this.userId).then((subscribedDomains: any) => {
        subscribedDomains.forEach((domain) => {
          console.log(domain);
          _.merge(this.subscribedDomains, [domain]);
          console.log(this.subscribedDomains);
        });
      });
    });
  }

}
