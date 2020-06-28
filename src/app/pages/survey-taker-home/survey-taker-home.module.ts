import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyTakerHomePageRoutingModule } from './survey-taker-home-routing.module';

import { SurveyTakerHomePage } from './survey-taker-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyTakerHomePageRoutingModule
  ],
  declarations: [SurveyTakerHomePage]
})
export class SurveyTakerHomePageModule {}
