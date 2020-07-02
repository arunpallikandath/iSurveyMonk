import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import * as _ from "lodash";
import {FirestoreService} from "../../shared/services/firestore.service";

@Component({
  selector: 'app-survey-test',
  templateUrl: './survey-test.component.html',
  styleUrls: ['./survey-test.component.scss'],
})
export class SurveyTestComponent implements OnInit {

  questions: [];
  constructor(private modalCtrl: ModalController, private fireStore: FirestoreService) { }

  ngOnInit() {
    // this.fireStore.getUserSubscribedDomains(this.userId).then((subscribedDomains: any) => {
    //   subscribedDomains.forEach((domain) => {
    //     console.log(domain);
    //     _.merge(this.questions, [domain]);
    //     console.log(this.questions);
    //   });
    // });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
