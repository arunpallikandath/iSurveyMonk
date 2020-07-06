import {Component, Input, OnInit} from '@angular/core';
import {FirestoreService} from '../../shared/services/firestore.service';
import * as _ from "lodash";
import {GlobalsService} from "../../shared/services/globals.service";
import {SurveyAssignmentComponent} from "../survey-assignment/survey-assignment.component";
import {ModalController} from "@ionic/angular";
import {SurveyTestComponent} from "../survey-test/survey-test.component";

interface ISubscribedDomain {
  name: string;
  startDate: string;
  endDate: string;
  selected:boolean;
  status: string;
  id: string;
}

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {
  @Input() surveyId: string;
  userId: string = window.localStorage.getItem('loginId');
  subscribedDomains: ISubscribedDomain[] = [];
  constructor(private fireStore: FirestoreService, public globals: GlobalsService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.fireStore.getUserInfo().then((result: any) => {
      this.fireStore.getUserSubscribedDomains(this.userId).then((domains: any) => {
        _.merge(this.subscribedDomains, domains);
        console.log(this.subscribedDomains);
        console.log(domains);
      });
    });
  }

  async launchSurvey_click(assignmentId) {
    const modal = await this.modalCtrl.create({
      component: SurveyTestComponent,
      cssClass: 'modal-survey-test',
      backdropDismiss: false,
      componentProps: {
        'assignmentId': assignmentId,
      }
    });
    return await modal.present();
  }

}
