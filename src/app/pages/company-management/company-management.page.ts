import { Component, OnInit } from '@angular/core';
import {GlobalsService} from "../../shared/services/globals.service";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.page.html',
  styleUrls: ['./company-management.page.scss'],
})
export class CompanyManagementPage implements OnInit {

  constructor(private globals: GlobalsService, private menuCtrl: MenuController) {
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

}
