import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../../shared/services/firestore.service';
import {GlobalsService} from "../../shared/services/globals.service";
import {SurveyAssignmentComponent} from "../survey-assignment/survey-assignment.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  hasError = false;
  errorText: string = '';
  allUsers = [];

  constructor(private fireStore: FirestoreService, public globals: GlobalsService, private modalCtrl: ModalController ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.loadUserList();
  }

  private loadUserList() {
    this.fireStore.getUserInfo().then((result: any) => {
      this.fireStore.getCompanyRef(result.organization).then((companySnapshot) => {
        companySnapshot.ref.collection('users')
            .where('role', '==', 'surveytaker').get().then(users => {
         users.forEach(item => {
           const docId = {docId: item.id}
           this.allUsers.push({...item.data(), ...docId});

         });
          console.log(this.allUsers);
       });
      });
    });
  }

  async setupSurvey_click(userId) {
    const modal = await this.modalCtrl.create({
      component: SurveyAssignmentComponent,
      cssClass: 'modal-contact',
      backdropDismiss: false,
      componentProps: {
        'userId': userId,
      }
    });
    return await modal.present();
  }

}
