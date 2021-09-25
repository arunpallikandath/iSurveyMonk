import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyManagementPageRoutingModule } from './company-management-routing.module';

import { CompanyManagementPage } from './company-management.page';
import {SubscribersComponent} from "../../components/subscribers/subscribers.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyManagementPageRoutingModule
  ],
  declarations: [CompanyManagementPage, SubscribersComponent]
})
export class CompanyManagementPageModule {}
