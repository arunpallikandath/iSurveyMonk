import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyAdminHomePageRoutingModule } from './survey-admin-home-routing.module';

import { SurveyAdminHomePage } from './survey-admin-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyAdminHomePageRoutingModule
  ],
  declarations: [SurveyAdminHomePage]
})
export class SurveyAdminHomePageModule {}
