import { Component, OnInit } from '@angular/core';
import {AlertController, MenuController} from '@ionic/angular';
import {GlobalsService} from '../../shared/services/globals.service';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-master-admin-home',
  templateUrl: './master-admin-home.page.html',
  styleUrls: ['./master-admin-home.page.scss'],
})
export class MasterAdminHomePage implements OnInit {

  constructor(private menuCtrl: MenuController, private globals: GlobalsService,
              private auth: AuthService, private router: Router, private alertCtrl: AlertController) {
    this.globals.menuItems = [];
    this.globals.menuItems.push({
      title: 'Home',
      url: 'master-admin-home',
      icon: 'home'
    }, {
      title: 'Company Management',
      url: 'master-admin/company_management',
      icon: 'infinite'
    });
    menuCtrl.enable(true);
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout().then((response) => {
      console.log('logout');
      this.router.navigate(['login']);
    }, error => {
      console.log(error);
    });
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

}
