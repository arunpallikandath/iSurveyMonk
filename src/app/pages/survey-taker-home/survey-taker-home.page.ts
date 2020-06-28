import { Component, OnInit } from '@angular/core';
import {AlertController, MenuController} from '@ionic/angular';
import {GlobalsService} from '../../shared/services/globals.service';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-survey-taker-home',
  templateUrl: './survey-taker-home.page.html',
  styleUrls: ['./survey-taker-home.page.scss'],
})
export class SurveyTakerHomePage implements OnInit {

  constructor(private menuCtrl: MenuController, private globals: GlobalsService, private alertCtrl: AlertController,
              private router: Router, private auth: AuthService) {
    this.globals.menuItems = [];
    this.globals.menuItems.push({
      title: 'Home',
      url: 'survey-taker-home',
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
