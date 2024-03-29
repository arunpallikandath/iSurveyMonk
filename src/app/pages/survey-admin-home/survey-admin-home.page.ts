import { Component, OnInit } from '@angular/core';
import {GlobalsService} from '../../shared/services/globals.service';
import {AlertController, MenuController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {FirestoreService} from '../../shared/services/firestore.service';
import {ContactComponent} from "../../components/contact/contact.component";
import {SurveyAssignmentComponent} from "../../components/survey-assignment/survey-assignment.component";

@Component({
  selector: 'app-survey-admin-home',
  templateUrl: './survey-admin-home.page.html',
  styleUrls: ['./survey-admin-home.page.scss'],
})
export class SurveyAdminHomePage implements OnInit {

  constructor(private globals: GlobalsService, private menuCtrl: MenuController, private alertCtrl: AlertController,
              private router: Router, private auth: AuthService, private fireStore: FirestoreService,
              private modalCtrl: ModalController) {
    this.globals.menuItems = [];
    this.globals.menuItems.push({
      title: 'Home',
      url: 'master-admin-home',
      icon: 'home'
    })
    menuCtrl.enable(true);
  }

  ngOnInit() {

  }


  async presentLogoutConfirmation() {
    const alert = await this.alertCtrl.create({
      cssClass: 'confirmation-alert',
      header: 'Confirm',
      message: 'Are you sure you want to <strong>logout?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.auth.logout().then((response) => {
      console.log('logout');
      this.router.navigate(['login']);
    }, error => {
      console.log(error);
    });
  }


}
