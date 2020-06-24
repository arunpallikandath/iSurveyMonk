import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import {GlobalsService} from '../../shared/services/globals.service';

@Component({
  selector: 'app-master-admin-home',
  templateUrl: './master-admin-home.page.html',
  styleUrls: ['./master-admin-home.page.scss'],
})
export class MasterAdminHomePage implements OnInit {

  constructor(private menuCtrl: MenuController, private globals: GlobalsService) {
    this.globals.menuItems.push({
      title: 'Home',
      url: 'master-admin-home',
      icon: 'home'
    })
    menuCtrl.enable(true);
  }

  ngOnInit() {
  }

}
