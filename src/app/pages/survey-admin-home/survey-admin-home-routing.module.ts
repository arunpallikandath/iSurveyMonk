import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyAdminHomePage } from './survey-admin-home.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyAdminHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyAdminHomePageRoutingModule {}
