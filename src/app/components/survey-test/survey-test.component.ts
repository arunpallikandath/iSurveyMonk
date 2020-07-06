import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import * as _ from "lodash";
import {FirestoreService} from "../../shared/services/firestore.service";
import * as moment from 'moment';

@Component({
  selector: 'app-survey-test',
  templateUrl: './survey-test.component.html',
  styleUrls: ['./survey-test.component.scss'],
})
export class SurveyTestComponent implements OnInit {
  @Input() assignmentId: string;
  surveyQuestions: any =  [];
  constructor(private modalCtrl: ModalController, private fireStore: FirestoreService) { }

  ngOnInit() {
    console.log(this.assignmentId);
    this.fireStore.getQuestionsAndOptionsForAssignment(this.assignmentId).then((questionsAndOptions: any) => {
      this.surveyQuestions = questionsAndOptions;
      console.log(questionsAndOptions);
    });
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
  saveSurveyAssignment() {
    console.log(this.surveyQuestions);
    this.fireStore.saveSurveyAssignmentTestDetails(this.assignmentId, this.surveyQuestions.questions);
  }

  submitSurveyAssignment(){
    console.log(this.surveyQuestions);
    this.fireStore.submitSurveyAssignmentTestDetails(this.assignmentId, this.surveyQuestions.questions);
  }
}
