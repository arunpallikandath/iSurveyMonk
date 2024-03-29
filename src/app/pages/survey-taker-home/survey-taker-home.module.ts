import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyTakerHomePageRoutingModule } from './survey-taker-home-routing.module';

import { SurveyTakerHomePage } from './survey-taker-home.page';
import {SurveyListComponent} from "../../components/survey-list/survey-list.component";
import {SurveyTestComponent} from "../../components/survey-test/survey-test.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyTakerHomePageRoutingModule
  ],
  declarations: [SurveyTakerHomePage, SurveyListComponent, SurveyTestComponent]
})
export class SurveyTakerHomePageModule {}
