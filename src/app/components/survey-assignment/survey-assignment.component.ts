import {Component, Input, OnInit} from '@angular/core';
import {FirestoreService} from "../../shared/services/firestore.service";
import {ModalController} from "@ionic/angular";
import * as _ from 'lodash';
import * as moment from 'moment';

interface ISubscribedDomain {
  name: string;
  startDate: string;
  endDate: string;
  selected:boolean;
  status: string;
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
    this.fireStore.getCompanySubscribedDomains().then(result => {
      result.forEach((domain) => {
        domain.get().then(res => {
          console.log(res.data());
          this.subscribedDomains.push({selected: false, startDate: '', endDate: '', id: res.id, ...res.data()})
        });
      });
      this.fireStore.getUserSubscribedDomains(this.userId).then((subscribedDomains: any) => {
        subscribedDomains.forEach((domain) => {
          console.log(domain);
          _.merge(this.subscribedDomains, [domain]);
         console.log(this.subscribedDomains);
        });
      });

    })
    console.log(this.userId);
    console.log(this.subscribedDomains);

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
      domain.startDate =  moment(domain.startDate).format('MM/DD/YYYY')
      domain.status = 'NOTSTARTED'
    });
    this.fireStore.saveSurveyAssignments(selectedDomains, this.userId);
    this.dismiss();

  }

}
