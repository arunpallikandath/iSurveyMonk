import {Component, Input, OnInit} from '@angular/core';
import {FirestoreService} from "../../shared/services/firestore.service";
import {ModalController} from "@ionic/angular";
import * as _ from 'lodash';
import * as moment from 'moment';
import {assembleI18nBoundString} from "@angular/compiler/src/render3/view/i18n/util";

interface ISubscribedDomain {
  name: string;
  startDate: string;
  endDate: string;
  selected:boolean;
  status: string;
  id: string;
  domain: any;
}

@Component({
  selector: 'app-survey-assignment',
  templateUrl: './survey-assignment.component.html',
  styleUrls: ['./survey-assignment.component.scss'],
})
export class SurveyAssignmentComponent implements OnInit {
  @Input() userId: string;
  subscribedDomains: ISubscribedDomain[] = [];
  constructor(private fireStore: FirestoreService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.fireStore.getCompanySubscribedDomains().then((result: any) => {
      result.get().then((domains) => {
        console.log(domains);
        domains.docs.forEach((domain) => {
          this.subscribedDomains.push({selected: false, startDate: '', endDate: '', domain: domain.ref, ...domain.data()})
        });
        this.fireStore.getUserSubscribedDomains(this.userId).then((assignments: any) => {
          console.log(assignments);
          assignments.forEach(assignment => {
            assignment.domain.get().then((xdomains) => {
              this.subscribedDomains.forEach((eachDomain) => {
                if(eachDomain.domain.id === assignment.domain.id) {
                  _.merge(eachDomain, assignment)
                }
              })
            });
          });
        });
      })
      });


  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  saveToDocument() {
    const selectedDomains = this.subscribedDomains.filter(item => item.selected === true);
    selectedDomains.forEach((domain) => {
      domain.endDate = moment(domain.endDate).format('MM/DD/YYYY');
      domain.startDate =  moment(domain.startDate).format('MM/DD/YYYY');
      domain.status = 'notstarted';
    });
    console.log(selectedDomains);
   this.fireStore.saveSurveyAssignments(selectedDomains, this.userId);
   this.dismiss();

  }

}
