import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterAdminHomePageRoutingModule } from './master-admin-home-routing.module';

import { MasterAdminHomePage } from './master-admin-home.page';
import {EnquiryListComponent} from '../../components/enquiry-list/enquiry-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterAdminHomePageRoutingModule
  ],
    declarations: [MasterAdminHomePage, EnquiryListComponent]
})
export class MasterAdminHomePageModule {}
