import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyManagerHomePage } from './survey-manager-home.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyManagerHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyManagerHomePageRoutingModule {}
