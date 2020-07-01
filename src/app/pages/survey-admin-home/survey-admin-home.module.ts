import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyAdminHomePageRoutingModule } from './survey-admin-home-routing.module';

import { SurveyAdminHomePage } from './survey-admin-home.page';
import {UserListComponent} from "../../components/user-list/user-list.component";
import {SurveyAssignmentComponent} from "../../components/survey-assignment/survey-assignment.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyAdminHomePageRoutingModule
  ],
  declarations: [SurveyAdminHomePage, UserListComponent, SurveyAssignmentComponent]
})
export class SurveyAdminHomePageModule {}
